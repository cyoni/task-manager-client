import { fetchTasks } from "@/actions/tasks.actions";
import { NotificationContext } from "@/context/NotificationProvider";
import { BASE_URL } from "@/consts/general.consts";
import { E_Priority, E_TaskStatus } from "@/enums/general.enums";
import { taskByIdSelector } from "@/selectors/tasks.selector";
import {
  Button,
  Input,
  Modal,
  DatePicker,
  Form,
  FormProps,
  Select,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  taskId?: number;
}

function NewTaskModal({ taskId, isModalOpen, onClose }: IProps) {
  const { toast } = useContext(NotificationContext);
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const taskById = useSelector((state) => taskByIdSelector(taskId, state));
  const [loading, setLoading] = useState(false);

  const [tags, setTags] = useState<Tag[]>(null);
  const { action } = useParams();

  const fetchTags = async () => {
    const response = await fetch(`${BASE_URL}/tags`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();
    const convertedTags = json.map((tag) => ({
      ...tag,
      label: tag.name,
      value: tag.id,
    }));

    setTags(convertedTags);
  };

  const [newTags, setNewTags] = useState([]);

  const tagMap = useMemo(() => {
    if (!tags) return null;

    return [...newTags, ...tags].reduce((acc, curr) => {
      return { ...acc, [curr.name]: curr };
    }, {});
  }, [tags, newTags]);
  useEffect(() => {
    fetchTags();
  }, []);

  const prepareForm = (form) => {
    const [plannedStartDate, plannedEndDate] = form.dates;
    delete form.dates;

    const body = {
      ...form,
      plannedStartDate,
      plannedEndDate,
      tags: form.tags?.map((tag) =>
        typeof tag === "number" ? tag : tagMap[tag]?.id
      ),
    };
    return body;
  };

  const onFinish: FormProps["onFinish"] = async (task) => {
    console.log("Success:", task);
    const body = prepareForm(task);

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/tasks/${taskById ? taskById.id : ""}`,
        {
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },

          method: taskById ? "PUT" : "POST",
        }
      );

      if (response.ok) {
        toast(
          "Success!",
          `The task was ${taskById ? "updated" : "added"} successfully.`,
          "success"
        );
        dispatch(fetchTasks(String(action)));
        onClose();
      } else {
        throw new Error("server error");
      }
    } catch (e) {
      toast("Error", "There was an error with the request.", "error");
    }
    setLoading(false);
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {};

  const initialTags = useMemo(() => {
    return tags && tagMap && taskById?.tags
      ? taskById.tags.map((tag: Tag) => tag.name)
      : null;
  }, [taskById, tags]);

  const createNewTagIfNeeded = async (label: string) => {
    if (typeof label === "number" || !tags) return;
    const tag = tags.find((tag) => tag.label === label);
    if (!tag) {
      const tag = { Name: label };
      const response = await fetch(`${BASE_URL}/tags`, {
        body: JSON.stringify(tag),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const newTag = await response.json();
        setNewTags((prev) => [...prev, newTag]);
      }
    }
  };

  return (
    <Modal
      title={taskById ? "Update Task" : "Add New Task"}
      open={isModalOpen}
      onCancel={onClose}
      closeIcon
      closable
      footer={null}
    >
      <Form
        name="basic"
        layout={"vertical"}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        key={initialTags?.length || 0}
      >
        <Form.Item
          label="Title"
          name="Title"
          initialValue={taskById?.title}
          rules={[
            { max: 100 },
            { required: true, message: "This field is mandatory" },
          ]}
        >
          <Input placeholder={"Title"} />
        </Form.Item>

        {taskById && (
          <Form.Item
            label="Status"
            name="Status"
            initialValue={taskById?.status}
            rules={[{ required: true, message: "This field is mandatory" }]}
          >
            <Select
              style={{ width: "100%" }}
              options={[
                { value: E_TaskStatus.ToDo, label: "To do" },
                { value: E_TaskStatus.InProgress, label: "In progress" },
                { value: E_TaskStatus.Done, label: "Done" },
                { value: E_TaskStatus.Cancelled, label: "Cancelled" },
              ]}
            />
          </Form.Item>
        )}

        <Form.Item
          label="Dates"
          name="dates"
          initialValue={
            taskById
              ? [
                  dayjs(new Date(taskById.plannedStartDate)),
                  dayjs(new Date(taskById.plannedEndDate)),
                ]
              : [null, null]
          }
          rules={[
            {
              required: true,
              message: "This field is mandatory",
            },
          ]}
        >
          <RangePicker style={{ width: "100%" }} showTime />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="Priority"
          initialValue={taskById?.priority}
          rules={[{ required: true, message: "This field is mandatory" }]}
        >
          <Select
            style={{ width: "100%" }}
            options={[
              { value: E_Priority.LOW, label: "Low" },
              { value: E_Priority.MEDIUM, label: "Medium" },
              { value: E_Priority.HIGH, label: "High" },
            ]}
          />
        </Form.Item>

        <Form.Item
          rules={[{ max: 500 }]}
          label="Description"
          name="Description"
          initialValue={taskById?.description}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          key={tags?.length || 0}
          label="Tags"
          name="tags"
          initialValue={initialTags}
        >
          <Select
            mode="tags"
            key={tags?.length || 0}
            allowClear
            style={{ width: "100%" }}
            placeholder="Select tags (optional)"
            options={tags}
            onSelect={createNewTagIfNeeded}
          />
        </Form.Item>

        <div className="flex justify-end">
          <Button onClick={onClose} className="mr-2">
            Cancel
          </Button>

          <Button type="primary" loading={loading} htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default NewTaskModal;
