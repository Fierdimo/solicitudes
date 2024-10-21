import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { Menu, Layout, Divider } from 'antd';
import {
  SettingOutlined,
} from '@ant-design/icons';

import { Account_Inf } from '../Account_Inf';
import { routes } from '../../utilities/Routes.utilities';
import { Tracker } from 'meteor/tracker';

const { Header } = Layout;

export const HeaderP = ({ children }, prompt) => {
  const [linkMenu, setLinkMenu] = useState([]);
  const [user, setUser] = useState({
    profile: {
      membreship: [
        ['', '']
      ]
    }
  });


  useEffect(() => {
    const userTracker = Tracker.autorun(() => {
      setLinkMenu(routes.map(route => {
        if (route.roles.some(role => Meteor.user()?.profile?.membreship?.some(userRol => userRol.includes(role))) && route.path !== window.location.pathname) {
          return {
            key: route.path, label: <a href={route.path}>{route.name}</a>
          }
        }

      }));
      setUser(Meteor.user())
    });

    // Limpieza del efecto
    return () => {
      userTracker.stop();
    };
  }, []);


  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: ".2rem"
      }}
      {...prompt}
    >
      <h2 style={{ color: "#ffffff" }}>Web<span style={{ color: "#1677ff" }}>C</span>hat</h2>
      <Menu
        theme="dark"
        mode="horizontal"
        items={linkMenu}
        style={{
          minWidth: 0,
          flex: 1,
          justifyContent: "center"
        }}
      />
      <Account_Inf itemsDropdown={[{
        key: '1',
        label: (
          <>
            <Divider><span style={{ color: "", }}>{user?.profile?.membreship[0]?.map(i => `${i} `)}</span></Divider>
          </>
        ),
      }, {
        key: '2',
        label: (
          <a> <SettingOutlined /> Configuraciones</a>
        ),
      }]}></Account_Inf>
    </Header>
  )
}
