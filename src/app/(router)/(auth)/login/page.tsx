"use client";
import React from "react";
import { Button, Form, Input, message } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";



type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginForm = () => {
    const router = useRouter()
    const onFinish = async (values: any) => {
        console.log("Success:", values);
        const signInData = await signIn("credentials", {
          username: values.username,
          password: values.password,
          redirect: false,
        });
        console.log({signInData});
        
        if (signInData?.error) {
            message.error("Oops! Something when wrong!")
          } else {
            router.push("/dashboard");
          }
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
      };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, marginTop: "50px" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
