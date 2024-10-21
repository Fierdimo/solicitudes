import React from 'react';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;
export const FooterP = () => {
  return (
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      ©{new Date().getFullYear()} Created by Jorge Moreno L.
    </Footer>
  )
}
