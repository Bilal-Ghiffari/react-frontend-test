import React from "react";
import { Form } from "antd";
import { ICoffee } from "../type";
import {
  addIngredients,
  getListOfIngredients,
  updateIngredients,
} from "../services/localStorage";
import useAlert from "./useAlert";

const useIngredientsModal = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { alerts, addAlert, removeAlert } = useAlert();
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [currentIngredientsId, setCurrentIngredientsId] = React.useState<
    number | null
  >(null);

  const [form] = Form.useForm();

  const showModal = (coffeeId: number | null = null) => {
    setIsModalOpen(true);
    if (coffeeId) {
      setIsEditMode(true);
      setCurrentIngredientsId(coffeeId);
      const coffee = getListOfIngredients().find(
        (item: ICoffee) => item.id === coffeeId
      );
      if (coffee) {
        form.setFieldsValue(coffee);
      }
    } else {
      setIsEditMode(false);
      setCurrentIngredientsId(null);
      form.resetFields();
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentIngredientsId(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentIngredientsId(null);
  };

  const handleSubmit = (values: ICoffee) => {
    if (isEditMode && currentIngredientsId !== null) {
      updateIngredients(currentIngredientsId, values);
    } else {
      addIngredients(values);
    }
    form.resetFields();
    handleOk();
    addAlert(
      `Success ${isEditMode ? "Edit" : "Create"} Ingredients ${values?.name}`,
      "success"
    );
  };

  return {
    alerts,
    addAlert,
    removeAlert,
    isModalOpen,
    showModal,
    handleOk,
    handleCancel,
    handleSubmit,
    form,
    isEditMode,
    currentIngredientsId,
  };
};

export default useIngredientsModal;
