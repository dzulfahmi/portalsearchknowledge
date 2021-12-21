import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';

import { Form, Input, Button, message } from 'antd';
import { login } from '../../store/actions/AuthAction';
// import user from '../../core/user';
// import { ModalError } from '../../components/ModalAlert';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const {info, isLoading, isAuthenticated} = useSelector((state: any) => ({
    info: state.info,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
  }));

  useEffect(() => {
    if (info.id === 'LOGIN_SUCCESS' && isAuthenticated) {
      message.success('Login berhasil');
    }
    if (info.id === 'LOGIN_FAIL' && !isAuthenticated) {
      message.error('Login belum berhasil')
    }
  }, [info]);

  // setTimeout(function(){window.location.reload();},10);

  function authCallback() {
    navigate("/admin/dashboard");
    setTimeout(function(){window.location.reload();},10);
  }

  const onFinish = async (values: any) => {
    // navigate('/admin/dashboard')
    dispatch(login(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      style={{
        width: 330,
        margin: 'auto',
        marginTop: '10%'
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1
          style={{
            textAlign: 'center',
          }}
        >
          {/* <img
            style={{
              height: '44px',
              marginRight: 16,
            }}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          /> */}
          Portal Search Knowledge
        </h1>
        <div
          style={{
            marginTop: 12,
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          Login
        </div>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;