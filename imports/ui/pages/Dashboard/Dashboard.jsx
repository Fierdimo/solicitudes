
import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';

import { Button, Layout, theme, Table, Space, Popconfirm, Modal, Tag, } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { withTracker } from 'meteor/react-meteor-data'; // Importar withTracker
import { FooterP } from '../../components/layouts/Footer';
import { HeaderP } from '../../components/layouts/Header';
import { FormRegister } from '../../components/forms/FormRegister';
import { FormEdit } from '../../components/forms/FormEdit';
import { deleteUser, getUsers } from '../../services/private/users.services';
import { convertRolToString } from '../../adapters/users.adapters';

const { Content } = Layout;
//Componente
const Dashboard = () => {
  const [form] = useForm();
  const [errorRegister, setErorRegister] = useState('');

  const [formEdit] = useForm();
  const [errorEdit, setErrorEdit] = useState('');

  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(true);

  //Columnas de la tabla usuario
  const columns = [
    {
      title: 'Identificación',
      dataIndex: 'profile',
      key: 'id',
      width: 130,
      render: (item) => {
        return (item.id || "")
      },
    },
    {
      title: 'Nombre',
      dataIndex: 'profile',
      key: 'name',
      width: 120,
      render: (item) => {
        return (item.name)
      },
    },
    {
      title: 'Apellidos',
      dataIndex: 'profile',
      key: 'lastname',
      width: 120,
      render: (item) => {
        return (item.lastname)
      },
    },
    {
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    {
      title: 'Rol',
      dataIndex: 'profile',
      key: 'Rol',
      width: 120,
      render: (item) => {
        var v = item.membreship.some(f => f[0] !== 'admin') ?
          <Tag color="lime">{`${item.membreship[0][0]} ${item.membreship[0][1]}`}</Tag> :
          <Tag color="gold">{`${item.membreship[0][0]} ${item.membreship[0][1]}`}</Tag>
        return (v)
      }
    },
    {
      title: 'Correo',
      dataIndex: 'emails',
      key: 'emails',
      width: 220,
      render: (item) => {
        return (item[0].address)
      }
    },
    {
      title: 'Acciones',
      dataIndex: '',
      key: 'actions',
      width: 120,
      render: (_, item) => (
        /* Botón para mostrar el fomulario de ediccion de usuario */
        <Space size="middle">
          <Button color="primary" variant="text" onClick={async () => {
            //Agregar valores en el formulario
            formEdit.setFieldsValue({
              name: item.profile.name,
              lastname: item.profile.lastname,
              email: item.emails[0].address,
              rol: item.profile.roles[0]
            })
            //Variable para el menejo de confirmacion de la edicion
            const confirmed = await modal.confirm({
              title: 'Edición de usuario',
              okText: 'Guardar',
              content: (
                //Formulario
                <>
                  <FormEdit form={formEdit} error={errorEdit}></FormEdit>
                </>
              ),
            });
            //Verificación de la la edición
            if (confirmed) {
              let data = formEdit.getFieldsValue(); //Se alamacena los valores del formulario
              data.oldEmail = item.email;//Se agregar la clave oldEmail con el valor

              //Se realiza una solicitud al servidor para actualizar los datos del usuario
              Meteor.call('updateUser', item._id, data, (error, result) => {
                if (error) {
                  setErrorEdit(error);
                } else {
                  //Realiza la solicitud al servidor y actualiza la tabla de los usuario
                  getUsers(setUsers, setUserLoading);
                }
              })
            }
          }}>
            Editar
          </Button>
          {/* Botón para elitar ususario */}
          <Popconfirm title={`Seguro de eliminar a ${item.profile.name}?`} onConfirm={async () => {
            deleteUser(item._id);
            setUsers(users.filter(u => u._id !== item._id))
          }}>
            <Button color="danger" variant="link">
              Eliminar
            </Button>
          </Popconfirm>
        </Space >
      ),
    },

  ];

  const onFinish = async (values) => {

    Meteor.call('registerUser', values, async (error, result) => {
      if (error) {
        setErorRegister(error.reason);
      } else {
        form.resetFields();
        getUsers(setUsers, setUserLoading);
      }
    })
  };
  useEffect(() => {
    getUsers(setUsers, setUserLoading);
  }, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [modal, contextHolder] = Modal.useModal();
  return (
    <Layout >
      <HeaderP></HeaderP>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <br />
        <div
          style={{
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Table
            style={{ minHeight: "400px" }}
            columns={columns}
            loading={userLoading}
            pagination={{
              position: ["topLeft"],
            }}
            dataSource={users}
            scroll={{
              y: 55 * 5,
            }}
          />
        </div>
        <FormRegister onFinish={onFinish} form={form} error={errorRegister}></FormRegister>
      </Content>
      <FooterP></FooterP>
      {contextHolder}
    </Layout>
  );
};


export default Dashboard;