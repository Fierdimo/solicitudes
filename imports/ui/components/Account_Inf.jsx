import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Dropdown, Divider, Space } from 'antd';
import { Tracker } from 'meteor/tracker';
import {
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { handleLogout } from '../utilities/Account.utilities';



export const Account_Inf = ({ itemsDropdown }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userTracker = Tracker.autorun(() => {
      const userData = Meteor.user();
      setUser(userData);
    });

    // Limpieza del efecto
    return () => {
      userTracker.stop();
    };
  }, []);


  return (
    <Dropdown menu={{
      items: itemsDropdown
    }} dropdownRender={(menu) => (
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "5px",
        boxShadow: "0 0 10px #00000041",
      }}>
        {React.cloneElement(menu, {
          style: {
            boxShadow: 'none',
          }
        })}
        <Divider style={{ margin: 0 }}></Divider>
        <Space style={{ padding: "10px", display: "flex", justifyContent: "center" }}>
          <Button onClick={handleLogout} icon={<LogoutOutlined />} class="link" danger>Cerrar sesión</Button>
        </Space>
      </div>
    )} placement="bottomLeft" arrow>
      <Button style={{ padding: "3px 8px" }} icon={<UserOutlined />}>
        {user ? `${user.profile.name.split(" ")[0]} ${user.profile.lastname.split(" ")[0]}` : "Cargando..."}
      </Button>
    </Dropdown>
  )
}
