import React from 'react';
import { theme, Form, Input, Select } from 'antd';
import { Roles } from '../../utilities/Roles.utilities';

export const FormEdit = ({ form, error }, prompt) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Form
      {...prompt}
      form={form}
      name="login"
      initialValues={{
        remember: true,
      }}
      style={{
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        marginTop: "1rem",
        marginRight: "24px"
      }}
    >
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
        name={"rol"}
        rules={[
          {
            required: true,
            message: 'Por favor selecciona el rol!',
          },
        ]}
      >
        <Select placeholder={"Rol"}>
          {Roles.map(item => (
            <Select.Option key={item.value} disabled={item.disabled} value={item.value}>{item.label}</Select.Option>
          ))}
        </Select>
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
    </Form>
  )
}
