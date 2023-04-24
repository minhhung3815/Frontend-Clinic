import { Layout } from 'antd';
import React from 'react';
import { headerStyle } from './handler';
import Logo from 'Static/Images/Logo.svg'
const Header = () => {
  return (
    <Layout.Header style={headerStyle}>
      <img src={Logo} alt='logo' />
    </Layout.Header>
  )
}

export default Header