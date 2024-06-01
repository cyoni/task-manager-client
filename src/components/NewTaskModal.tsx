import { fetchTasks } from "@/actions/tasks.actions";
import { NotificationContext } from "@/app/context/NotificationProvider";
import { BASE_URL } from "@/consts/general.consts";
import { E_Priority, E_TaskStatus } from "@/enums/general.enums";
import {
  taskByIdSelector,
  taskOnEditSelector,
} from "@/selectors/tasks.selector";
import {
  Button,
  Input,
  Modal,
  DatePicker,
  Form,
  Checkbox,
  FormProps,
  Select,
  Space,
  SelectProps,
  ColorPicker,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
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

  const [tags, setTags] = useState([]);
  const { action } = useParams();

  console.log("tags", tags);

  const fetchTags = async () => {
    const response = await fetch(`${BASE_URL}/tags`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();
    const convertedTags = json.map((tag) => ({
      label: tag.name,
      value: tag.id,
    }));

    setTags(convertedTags);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const prepareForm = (form) => {
    const [plannedStartDate, plannedEndDate] = form.dates;
    delete form.dates;
    const tagSet = new Set();

    const body = {
      ...form,
      plannedStartDate,
      plannedEndDate,
      status: E_TaskStatus.ToDo,
      tags: form.tags,
    };
    return body;
  };

  const onFinish: FormProps["onFinish"] = async (task) => {
    console.log("Success:", task);
    const body = prepareForm(task);
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/tasks`, {
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },

        method: "POST",
      });

      if (response.ok) {
        toast("Success!", "The task was added successfully.", "success");
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

  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const createNewTagIfNeeded = async (label: string) => {
    if (!tags.find((tag) => tag.label === label)) {
      const tag = { Name: label };

      const response = await fetch(`${BASE_URL}/tags`, {
        body: JSON.stringify(tag),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        await fetchTags();
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
      <div>
        <Form
          name="basic"
          layout={"vertical"}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="Title"
            rules={[
              { max: 100 },
              { required: true, message: "This field is mandatory" },
            ]}
          >
            <Input placeholder={"Title"} defaultValue={taskById?.title} />
          </Form.Item>

          <Form.Item
            label="Dates"
            name="dates"
            rules={[{ required: true, message: "This field is mandatory" }]}
          >
            <RangePicker
              style={{ width: "100%" }}
              showTime
              // defaultPickerValue={
              //   taskById
              //     ? [
              //         new Date(taskById.plannedStartDate),
              //         new Date(taskById.plannedEndDate),
              //       ]
              //     : null
              // }
            />
          </Form.Item>

          <Form.Item
            label="Priority"
            name="Priority"
            rules={[{ required: true, message: "This field is mandatory" }]}
          >
            <Select
              style={{ width: "100%" }}
              options={[
                { value: E_Priority.LOW, label: "Low" },
                { value: E_Priority.MEDIUM, label: "Medium" },
                { value: E_Priority.HIGH, label: "High" },
              ]}
              defaultValue={taskById?.priority}
            />
          </Form.Item>

          <Form.Item
            rules={[{ max: 500 }]}
            label="Description"
            name="Description"
          >
            <TextArea rows={4} defaultValue={taskById?.description} />
          </Form.Item>

          <Form.Item label="Tags" name="tags">
            <Select
              mode="tags"
              key={tags.length}
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select tags (optional)"
              defaultValue={[]}
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
      </div>
    </Modal>
  );
}

export default NewTaskModal;
