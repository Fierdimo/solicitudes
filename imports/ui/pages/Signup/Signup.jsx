import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Button, Form, Input, InputNumber } from 'antd';

export const Signup = () => {
  const [error, setError] = useState('');
  useEffect(() => {

  }, [])

  const onFinish = async (values) => {

    Accounts.createUser({
      email: String(values.email).trim(),
      password: String(values.password).trim(),
      username: "",
      profile: {
        name: String(values.name).trim(),
        lastname: String(values.lastname).trim(),
        roles: [4]
      }
    }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        window.location.href = "/";
      }
    });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          width: "99vw",
          maxWidth: 400,
          margin: "auto",
          backgroundColor: "#E6E6E6FF",
          borderRadius: "8px",
          boxShadow: "0 0 10px #0000001C",
          padding: "10px 15px"
        }}
        onFinish={onFinish}
      >
        <h2 style={{ width: "100%", textAlign: "center" }}>Registro de usuario</h2>
        <br />
        <Form.Item
          name="name"

          rules={[
            {
              required: true,
              message: 'Por favor ingrese tu nombre!',
            },
          ]}
        >
          <Input placeholder="Nombre" />
        </Form.Item>
        <Form.Item
          name="lastname"

          rules={[
            {
              required: true,
              message: 'Por favor ingrese tu apellidos!',
            },
          ]}
        >
          <Input placeholder="Apellidos" />
        </Form.Item>
        <Form.Item
          name="email"

          rules={[
            {
              required: true,
              message: 'Por favor ingrese tu correo!',
            },
          ]}
        >
          <Input placeholder="Correo" type='email' />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese tu contraseña!',
            },
          ]}
        >
          <Input type="password" placeholder="Contraseña" />
        </Form.Item>
        {error && <p>{error}</p>}
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Crear
          </Button>
          o <a href="/">Ingresar!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
