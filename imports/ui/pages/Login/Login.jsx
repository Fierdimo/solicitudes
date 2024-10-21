import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';


export const Login = () => {
  const [error, setError] = useState('');//Variable para manejar el estado errores al iniciar sesión

//Función para inciciar sesión
  const onFinish = (values) => {
    Meteor.loginWithPassword(values.email, values.password, (err) => {
      if (err) {
        setError("Credenciales incorrecta. ¡Por favor verificar!");
      } else {
        setError('');
        //Se valida el rol del usuario
        if (Meteor.user().profile.membreship.some(f => f[0] === 'admin')) {
          window.location.href = "/dashboard" // Redirigir al usuario después de iniciar sesión

        } else {
          window.location.href = "/requests";
        }
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
        <h2 style={{ width: "100%", textAlign: "center" }}>Inicio de sesión</h2>
        <br />
        <Form.Item
          name="email"

          rules={[
            {
              required: true,
              message: 'Por favor ingrese tu correo!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Correo" type='email' />
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
          <Input prefix={<LockOutlined />} type="password" placeholder="Contraseña" />
        </Form.Item>
        {error && <p>{error}</p>}
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Ingresar
          </Button>
          {/* o <a href="/signup">Registrarse ahora!</a> */}
        </Form.Item>
      </Form>
    </div>
  );
};
