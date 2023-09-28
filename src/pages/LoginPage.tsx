import { Layout } from 'antd';
import 'antd/dist/antd.min.css';
import '../App.css';
import { Content } from 'antd/lib/layout/layout';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../images/logoParas.png';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import manager from '../../src/service-manager/api.js';
import routes from '../../src/service-manager/routes.js';
import InputLabel from '@mui/material/InputLabel';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';


interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}


export const LoginPage = () => {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [valueUser, setValueUser] = useState('');
  const [values, setValues] = useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChangePassword =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueUser(event.target.value);
  };

  function callToLogin(e: any) {
    if (e.key === 'Enter') {
      onSubmitLogin();
    }
  }


  const onSubmitLogin = () => {
    //manager.loginUser(routes.LOGIN,{"username": valueUser.toLocaleUpperCase(), "password": values.password})
    manager.loginUser(routes.LOGIN, { "username": valueUser, "password": values.password, "Proveedor": 0 })
      .then(response => {
        if (response.AuthToken !== '') {
          localStorage.setItem("token", response.AuthToken);
          localStorage.setItem("refreshToken", response.RefreshToken);
          localStorage.setItem("refreshTokenExpiry", response.RefreshTokenExpiry);
          validarUsuario()
        }
        else {
          swal(response.Error, response.Mensaje, "error");
        }

      })
      .catch(error => {
        swal(error.data.Error, error.data.Mensaje, "error");
      });
  };

  const validarUsuario = () => {
    manager.loginUser(routes.USUARIO_VALIDAR, { "Usuario": valueUser, "Contrasena": values.password, "Proveedor": 0 })
      .then(response => {
        if (response.AuthToken !== '') {

          getRol()

        }
        else {
          swal(response.Error, response.Mensaje, "error");
        }

      })
      .catch(error => {
        swal(error.data.Error, error.data.Mensaje, "error");
      });

  }

  const getRol = () => {
    setLoading(true)
    manager.postData(routes.GET_ROL, { "WebUsuario": valueUser, "Proveedor": 0 })
      .then(response => {
        console.log(response)
        console.log(response[0])
        if (response.length > 0) {
          localStorage.setItem("usuario", valueUser);
          navigate('../Existencias')

        } else {
          alert("Verifique su request");
          setLoading(false)
        }

      })
      .catch(error => {
        alert("Error : " + error);
        setLoading(false)
      });


  }

  const theme = createTheme({
    typography: {
      subtitle1: {
        fontSize: 16,
      },
    },
  });

  const CardCustom = styled(Card)<CardProps>(({ theme }) => ({
    borderRadius: '20px',
    backgroundImage: 'linear-gradient(310deg,  rgb(218, 28, 54),rgb(255,255,255))'

  }));




  return (
    <Layout style={{ padding: '0%' }}>
      {loading && <LoadingComponent />}

        <Grid container spacing={0} alignItems="start" justifyContent="start" className="grid-container">
          <Grid item xs={12} md={12} lg={6}>
            <Box sx={{ my: '5%', mx: '10%', margin: 'auto' }}>
              <CardCustom style={{ borderRadius: '0px', height: '100vh' }}>
                <CardContent style={{ paddingLeft: '0px' }}>
                  <Grid container spacing={2} direction="column" alignItems="flex-start" justifyContent={"flex-start"}>
                    <Container fixed>
                      <Box
                        sx={{
                          my: '5%',
                          mx: '15%',
                          width: '70%',

                        }}>
                        <CardMedia
                          component="img"
                          image={Logo}
                          alt="image"
                        />
                      </Box>
                    </Container>
                  </Grid>
                </CardContent>
              </CardCustom>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Box sx={{  margin: 'auto', textAlign:'center', marginTop:'5%' }}>
              <Typography variant="h3">
                Bienvenido !
              </Typography>
              <Typography variant="h3">
                Tablet Frutas y Verduras.
              </Typography>
              <ThemeProvider theme={theme}>
                <Typography variant="subtitle1">
                  Ingresa tu usuario y contraseña para comenzar
                </Typography>
              </ThemeProvider>
            </Box>
            <Box
              sx={{
                my: '10%',
                mx: '27%',
                width: '330px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'initial',
              }}>
              <Typography component="h1" variant="h5">
                Iniciar sesión
              </Typography>
              <Paper elevation={3} sx={{
                padding: 3,
                margin: 2,
                marginTop: 2,
                width: 'auto',
                borderRadius: 3,
                backgroundColor: '#f0f2f5'

              }}>
                <TextField
                  id="user"
                  label="Usuario"
                  multiline
                  sx={{ width: '100%' }}
                  maxRows={4}
                  value={valueUser}
                  onChange={handleChange}
                />
              </Paper>
              <Paper elevation={3} sx={{
                padding: 3,
                margin: 1,
                marginTop: 0,
                width: 'auto',
                borderRadius: 3,

                backgroundColor: '#f0f2f5'
              }}>
                <FormControl variant="standard" onKeyDown={callToLogin}>
                  <InputLabel htmlFor="password">Contraseña</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    sx={{ width: '100%' }}
                    label="Contraseña"
                    onChange={handleChangePassword('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Paper>
              <Button variant="outlined" size="large" style={{ marginTop: '30px' }} onClick={onSubmitLogin}>Ingresar</Button>
            </Box>
          </Grid>
        </Grid>
    </Layout >

  );
}
