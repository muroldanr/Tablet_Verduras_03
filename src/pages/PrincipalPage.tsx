import 'antd/dist/antd.min.css';
import { Outlet } from 'react-router-dom';
import { MenuLateral } from '../components/MenuLateral';
import { Layout } from 'antd';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';


interface PrincipalPageProps {
  change(): void,

}

export const PrincipalPage: React.FC<PrincipalPageProps> = ({ change }) => {
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExit = () => {
    localStorage.clear();
    navigate('../Login');

  }

  const styles = {
    Paper: {
      background: '#f0f2f5'
    }
  }

  const useStyles = makeStyles((theme) => ({
    menuItem: {
      padding: theme.spacing(1.5),
    },
  }));

  const classes = useStyles();


  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/*<MenuLateral />*/}
      <Layout className="site-layout" style={styles.Paper}>
        <Outlet />
      </Layout>
      <div style={{ position: 'absolute', marginLeft: '90%', marginTop: '23px' }}>
        <Box sx={{ display: 'flex' }}>
          <Tooltip title={localStorage.getItem("usuario") ?? ''}>
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32, backgroundColor: '#ff906b' }}>{localStorage.getItem("usuario")?.substring(0, 1)}</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(255, 144, 107,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: '#ff906b',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem className={classes.menuItem} onClick={handleClose}>
            <Avatar sx={{ backgroundColor: '#ff906b' }} /> {localStorage.getItem("usuario") ?? ''}
          </MenuItem>
          <Divider />
          <MenuItem className={classes.menuItem} onClick={handleExit}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Cerrar Sesión
          </MenuItem>
        </Menu>
      </div>
      {/*
      <DrawerSettings          
          mostrar={mostrar}
          onHide={handleClose}/>
      <div style={{position:'absolute', marginLeft:'95%',marginTop:'45px'}}>
          <SettingsIcon onClick={handleSetting} sx={{cursor:'pointer', fontSize:'30px',color:'white',marginRight:'50%'}}/>
      </div>  
       */}
    </Layout>
  );
}
