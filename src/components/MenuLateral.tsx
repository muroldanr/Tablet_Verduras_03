import { Layout, Menu } from 'antd';
import 'antd/dist/antd.min.css';
import logo from '../images/logoParas.png'
import background from '../images/background_3.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  TagsOutlined,

} from '@ant-design/icons';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';


const { Sider } = Layout;


interface MenuLateralProps {

}

export const MenuLateral: React.FC<MenuLateralProps> = () => {

  //const dispatch = useDispatch();
  const [collapsed, onCollapse] = useState(false);
  return (
    <Sider theme={'light'} collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '100%',
            height: "auto",
          },
        }}
      >
        <Paper elevation={3} style={{ border: '5px solid #F04521', borderRadius: 20, backgroundSize: 'contain' }}>
          <img style={{ width: "100%", padding: 10 }} key={"logo"} src={logo} alt="TEB" />
        </Paper>
      </Box>
      <Menu theme={"light"} defaultSelectedKeys={['/Planeador']} mode="inline">
        <Menu.Item key={"/Existencias"} icon={<TagsOutlined />}>
          <Link to="/Existencias">Existencias</Link>
        </Menu.Item>
        {/*
         <Menu.Item key={"/Planeador2"} icon={<TagsOutlined />}>
          <Link to="/Planeador2">PLANEADOR 2</Link>
        </Menu.Item>
      
        <Menu.Item key={"/OrdenCompra"} icon={<TagsOutlined />}>
          <Link to="/OrdenCompra" style={{ fontSize: '13px' }}>ORDENES COMPRA</Link>
      </Menu.Item>

        <Menu.Item key={"/Planeador"} icon={<TagsOutlined />}>
          <Link to="/Planeador" style={{ fontSize: '13px' }}>Planeador</Link>
        </Menu.Item>*/}
      </Menu>
    </Sider>

  );

}
