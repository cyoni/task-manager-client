import { DELETE_TASK, UPDATE_TASK } from "@/consts/general.consts";
import { NotificationContext } from "@/context/NotificationProvider";
import { BASE_URL } from "@/consts/general.consts";
import { useContext } from "react";
import { useDispatch } from "react-redux";

export default function useMenu() {
  const dispatch = useDispatch();
  const { toast } = useContext(NotificationContext);

  const handleUpdate = (id: number) => {
    dispatch({ type: UPDATE_TASK, payload: id });
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast("Success!", "The task was deleted successfully.", "success");
        dispatch({ type: DELETE_TASK, payload: id });
        return;
      }
    } catch (err) {}
    toast("Erorr", "There was an error in the server.", "error");
  };

  return { handleDelete, handleUpdate };
}
