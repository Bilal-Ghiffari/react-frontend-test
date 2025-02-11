import React from "react";
import { Modal } from "antd";

interface ICustomDeleteModalProps {
  title: string;
  content: string;
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const CustomDeleteModal: React.FC<ICustomDeleteModalProps> = ({
  title,
  content,
  isVisible,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      centered
      title={title.toUpperCase()}
      open={isVisible}
      okText="Yes, delete it"
      cancelText="Cancelled"
      okButtonProps={{ danger: true }}
      onCancel={onCancel}
      onOk={onOk}
    >
      <p>{content}</p>
    </Modal>
  );
};

export default CustomDeleteModal;
