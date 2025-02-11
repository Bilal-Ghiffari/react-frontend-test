import React from "react";

type AlertType = {
  id: number;
  message: string;
  type: "success" | "warning" | "error" | "info";
};

export default function useAlert() {
  const [alerts, setAlerts] = React.useState<AlertType[]>([]);
  const addAlert = (
    message: string,
    type: AlertType["type"],
    timeout: number = 3000
  ) => {
    const id = Date.now();

    setAlerts((prevAlerts) => [...prevAlerts, { id, message, type }]);
    setTimeout(() => {
      removeAlert(id);
    }, timeout);
  };

  const removeAlert = (id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return { addAlert, alerts, removeAlert };
}
