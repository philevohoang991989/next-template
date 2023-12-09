'use client';
import React from 'react';
import Image from 'next/image';
import {Button, Form, Input, message} from 'antd';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Logo from '@/app/assets/icons/logo.svg';
import styles from '../styles.module.scss';
import showPassWord from '@/app/assets/icons/ic_eye.svg';
import hidePassWord from '@/app/assets/icons/ic_eye_slash.svg';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginForm = () => {
  const router = useRouter();
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const signInData = await signIn('credentials', {
      username: values.username,
      password: values.password,
      redirect: false,
    });
    console.log({signInData});

    if (signInData?.error) {
      message.error('Oops! Something when wrong!');
    } else {
      router.push('/users');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.wapperPage}>
      <div className={styles.formAuth}>
        <div className={styles.headerForm}>
          <h2>Sign in to your account</h2>
        </div>
        <Form
          className={styles.wapperForm}
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            name="username"
            className="formInput"
            rules={[{required: true, message: 'Please input your username!'}]}
          >
            <Input className="inputField" />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            className="formInput"
            rules={[{required: true, message: 'Please input your password!'}]}
          >
            <Input.Password
              className="inputField"
              iconRender={(visible) => (
                <Image
                  src={visible ? showPassWord : hidePassWord}
                  width={20}
                  height={20}
                  alt='Image password'
                  priority={true}
                />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
