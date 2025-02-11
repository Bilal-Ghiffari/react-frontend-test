import { Alert, Button, Form, Input } from "antd";
import * as React from "react";
import { useAuth } from "../../context/AuthContext";
import useAlert from "../../hooks/useAlert";

interface ILogInPageProps {}

const LogInPage: React.FunctionComponent<ILogInPageProps> = () => {
  const { login } = useAuth();
  const [form] = Form.useForm();
  const { alerts, addAlert, removeAlert } = useAlert();
  const handleSubmit = (dataUser: any) => {
    if (dataUser) {
      login();
      addAlert("Authentication successful!", "success");
    }
  };

  return (
    <section className="py-[50px] flex flex-col items-center justify-center px-4">
      <img src="../assets/svgs/logo-type.svg" alt="" />
      <div className="text-[32px] font-semibold text-dark mt-[70px]">
        Sign In
      </div>
      <p className="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
        get the experience of making your own coffee
      </p>
      <div className="max-w-[500px] mb-5">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            message={alert.message}
            type={alert.type}
            closable
            onClose={() => removeAlert(alert.id)}
            className="w-[500px]"
          />
        ))}
      </div>
      <Form form={form} onFinish={handleSubmit} className="card w-full">
        <Form.Item
          name="email"
          //   label="Email"
          className="form-group"
          rules={[{ required: true, message: "email must be filled" }]}
        >
          <Input
            type="email"
            size="large"
            placeholder="Enter your email"
            className="input-field"
          />
        </Form.Item>
        <Form.Item
          name="password"
          //   label="Password"
          className="form-group"
          rules={[{ required: true, message: "password must be filled" }]}
        >
          <Input
            type="password"
            size="large"
            placeholder="Enter your password"
            className="input-field"
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="btn btn-primary mt-[10px] w-full py-6! rounded-xl!"
            htmlType="submit"
            type="primary"
            size="large"
            //   loading={isPending}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default LogInPage;
