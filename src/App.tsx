import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.min.css';
import './index.css';
import { Layout } from 'antd';
import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PrincipalPage } from './pages/PrincipalPage';
import { LoginPage } from './pages/LoginPage';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { es } from 'date-fns/locale';
import { PlaneadorPage } from './pages/Cotizador/PlaneadorPage';
import { PlaneadorDosPage } from './pages/Cotizador/PlaneadorDosPage';




function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');
  const [themeMode, setThemeMode] = useState(prefersDarkMode);

  const theme = React.useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: 'Raleway, Arial',
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: `
              @font-face {
                font-family: 'Raleway';
                font-style: normal;
                font-display: swap;
                font-weight: 400;
                
              }
            `,
          },
        },
        palette: {
          mode: themeMode ? 'light' : 'light',
          /*
          primary:{main:'#FB8987'},
          secondary:{main:'#b08320'},
          */
          primary: {
            main: '#DA1C36',
          },
          secondary: {
            main: '#ffffff',
          },
        },
      }),
    [themeMode],
  );

  function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = sessionStorage.getItem("token") !== null ? true : false;
    let location = useLocation();
    if (auth) {
      return <Navigate to="/Login" state={{ from: location }} />;
    }
    return children;
  }


  return (
    <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
      <Layout style={{ minHeight: '100vh' }}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Routes>
              <Route path="/" element={<Navigate to="/Login" />} /> {/* Redirige a la página de inicio de sesión */}
              <Route path="/Login" element={<LoginPage />} />
              <Route path="/" element={<RequireAuth><PrincipalPage change={() => setThemeMode(!themeMode)} /></RequireAuth>}>
                <Route path="/Existencias" element={<RequireAuth><PlaneadorDosPage /></RequireAuth>} />
                {/*<Route path="/Planeador2" element={<RequireAuth><PlaneadorDosPage /></RequireAuth>} />*/}
              </Route>
            </Routes>
          </CssBaseline>
        </ThemeProvider>
      </Layout>
    </LocalizationProvider>
  );
}

export default App;
