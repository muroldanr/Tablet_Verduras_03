import React, { useEffect, useState } from 'react';
import { forwardRef } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { Check, Edit, Cancel, Search, CloseOutlined } from '@material-ui/icons';
import MaterialTable, { MTableToolbar, Column } from 'material-table';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { dateForView } from '../../../utils/utils';
import { Button, Chip, Dialog, DialogTitle, Fab, TextareaAutosize } from '@mui/material';
import moment from 'moment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FolderIcon from '@mui/icons-material/Folder';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import manager from '../../../service-manager/api';
import routes from '../../../service-manager/routes';
import swal from 'sweetalert';
import Articulo from '../../../interfaces/Articulo';
import NumberFormat from 'react-number-format';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Proveedor from '../../../interfaces/Proveedor';
import tableLocalization from './TableLocalizations';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { TreeView, TreeItem } from '@mui/lab';
import { ExpandMore, ChevronRight } from '@material-ui/icons';
import { TagsOutlined } from '@ant-design/icons';
import { groupBy } from 'lodash';



type JSONData = {
  [key: string]:
  {
    CodigoBarras: string;
    Articulo: string;
    Descripcion: string;
    Descripcion1: string;
    UnidadCompra: string;
    CantidadBodega: number;
    Rama: string;
    RamaDesc: string;
    Costo: number;
    Condiciones: string;
  }
};

type UserInput = {
  CodigoBarras: string;
  Articulo: string;
  Descripcion: string;
  Descripcion1: string;
  UnidadCompra: string;
  CantidadBodega: number;
  Rama: string;
  RamaDesc: string;
  Costo: number;
  Condiciones: string;
};

interface TablePlaneadorProps {
  data: any,
  dataPass: any,
}





export const TablePlaneador: React.FC<TablePlaneadorProps> = ({ data, dataPass }) => {
  const groupedData = groupBy(data, (item) => item.Nombre);
  const [ramas, setRamas] = useState<any[]>([]);
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [selectedRama, setSelectedRama] = useState<string>('');
  const [selectedRamaIndex, setSelectedRamaIndex] = useState<number>(-1);

  const [articulosFilter, setArticulosFilter] = useState<Articulo[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState<string>('');
  const [selectedProveedorClave, setSelectedProveedorClave] = useState<string>('');

  const [arregloAgregado, setArregloAgregado] = useState<Articulo[]>([]);
  const [userInput, setUserInput] = useState<UserInput[]>([]);
  const [jsonData, setJsonData] = useState<JSONData>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  //const [jsonData, setJsonData] = useState<Articulo[]>([]);


  const navigate = useNavigate()

  useEffect(() => {
    console.log("groupedData");
    console.log(groupedData);
  }, [])

  //LOGICA

  useEffect(() => {
    setArticulos([]);
    setRamas([]);
    setSelectedRama('');
    setSelectedRamaIndex(-1);
    setArticulosFilter([]);
  }, [selectedProveedorClave])




  const handleRamaClick = (rama: string, index: number) => {
    const filteredArticulos = articulos.filter(
      (articulo) => articulo.Rama === rama
    );
    console.log(filteredArticulos);
    setSelectedRama(rama);
    setArticulosFilter(filteredArticulos);
    setSelectedRamaIndex(index);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // STYLES

  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'blue',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  });

  const styles = {

    Card: {
      borderRadius: 5,
      elevation: '3',
      margin: '10px',
      alignContent: 'center',
      alignItems: 'center',
      td: 'center',
      width: '98%',
    }

  }

  const handleClick = (item: any) => {
    console.log('Elemento seleccionado:', item);
    setArticulosFilter(item)
    // aquí puedes agregar la lógica para manejar la selección del elemento
  };

  // Abrir Drawer
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  return (
    <>
      <MaterialTable
        title={
          <>
            <Fab size='small' onClick={toggleDrawer(true)} style={{ backgroundColor: '#F04521', boxShadow: "none" }}>
              <MenuIcon style={{ color: 'FFFFFF' }} />
            </Fab>
            <span style={{ fontSize: "1.2rem", fontWeight: "bold", marginLeft: 15, marginTop: 10 }}>
              SUGERIDOS DEL PLANEADOR
            </span>
          </>
        }
        style={styles.Card}
        //onRowClick={handleRowClick}
        options={{
          //padding: "dense",

          rowStyle: {
            fontSize: 13,
            textAlign: 'left',
          },

          headerStyle: {
            backgroundColor: "#F04521",
            fontWeight: "bold",
            textAlign: 'left',
            fontSize: '18px',
            color: '#FFF'

          },

          actionsCellStyle: {
            textAlign: 'left'
          },

          filtering: true,
          showTitle: true,
          search: false,
          actionsColumnIndex: -1,

        }}

        localization={tableLocalization}
        icons={{
          NextPage: forwardRef((props, ref) => <NavigateNextIcon {...props} ref={ref} />),
          PreviousPage: forwardRef((props, ref) => <ArrowBackIosNewIcon {...props} ref={ref} />),
          LastPage: forwardRef((props, ref) => <SkipNextIcon {...props} ref={ref} />),
          FirstPage: forwardRef((props, ref) => <SkipPreviousIcon {...props} ref={ref} />),
          Filter: forwardRef((props, ref) => <FilterListIcon {...props} ref={ref} />),
          SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
          Edit: forwardRef((props, ref) =>
            (articulosFilter.length > 0) ?
              <Fab size='small' style={{ boxShadow: '0px 0px 5px 3px rgba(0,141,241, 0.8)' }} >
                <Edit {...props} ref={ref} />
              </Fab> :
              <Fab style={{ boxShadow: '0px 0px 5px 3px rgba(0,141,241, 0.8)', position: 'absolute', display: 'none' }} >
                <Edit {...props} ref={ref} />
              </Fab>

          ),
          Check: forwardRef((props, ref) =>
            <Fab size="medium" style={{ boxShadow: '0px 0px 5px 3px rgba(0,141,241, 0.8)', marginLeft: '30px' }} >
              <Check {...props} ref={ref} />
            </Fab>),

          Clear: forwardRef((props, ref) => <Cancel {...props} ref={ref} />),
          Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
          ResetSearch: forwardRef((props, ref) => <CloseOutlined {...props} ref={ref} />)
        }}
        data={articulosFilter}
        columns={[
          {
            title: 'Proveedor',
            field: 'Nombre',
            width: '1%',
            editable: 'never',
            cellStyle: { textAlign: 'center', width: '1%', },

          },

          { title: 'Código de barras', field: 'CodigoBarras', editable: 'never', width: '10%', cellStyle: { width: '10%', textAlign: 'center' } },
          { title: 'Articulo', field: 'Descripcion1', editable: 'never', width: '30%', cellStyle: { width: '30%', textAlign: 'left' } },

          { title: 'Unidad', field: 'UnidadCompra', editable: 'never', width: '5%', cellStyle: { textAlign: 'center', width: '5%', } },
          {
            title: 'Disponible',
            field: 'Disponible',
            editable: 'never',
            cellStyle: { textAlign: 'left' },
            render: (rowData: any) => <NumberFormat value={rowData.Disponible} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} className="spamprecio" />,

          },
          {
            title: 'Sugerido Planeador',
            field: 'Cantidad',
            editable: 'never',
            cellStyle: { textAlign: 'left' },
            render: (rowData: any) => <NumberFormat value={rowData.Cantidad} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} className="spamprecio" />,

          },
          {
            title: 'Sugerido Bodega',
            field: 'Cantidad',
            editable: 'always',
            width: '5%',
            cellStyle: { textAlign: 'left', width: '5%' },
            initialEditValue: 0 || '0',
            editComponent: props => (
              <>
                <div style={{ backgroundColor: '#fff', width: 'auto', marginTop: '50px !import', position: 'absolute' }}>
                  <label style={{ color: 'red', padding: '0px 3px 0px 3px' }}>Sugerido</label>
                </div>
                <input
                  type="text"
                  placeholder='0'
                  value={props.value}
                  onChange={e => props.onChange(e.target.value)}
                  onFocus={(event) => event.target.style.border = "2px solid blue"}
                  onBlur={(event) => event.target.style.border = "1px solid #ccc"}
                  style={{
                    border: "1px solid #FF938D",
                    fontSize: '17px',
                    borderRadius: '4px',
                    width: "80%",
                    height: '30px',
                    display: 'inline-block',
                    margin: '8px 0',
                    boxSizing: 'content-box',
                    padding: '10px',

                  }}
                />
              </>
            ),

          },

        ]}
        editable={{
          onBulkUpdate: changes =>
            new Promise<void>((resolve, reject) => {
              setTimeout(() => {
                try {
                  setUserInput((prevState) => {
                    const newJsonData = { ...jsonData };

                    Object.entries(changes).forEach(([id, data]) => {
                      const Articulo = data.newData.Articulo;
                      const updatedData = {
                        Articulo,
                        CodigoBarras: data.newData.CodigoBarras,
                        Descripcion: data.newData.Descripcion,
                        Descripcion1: data.newData.Descripcion1,
                        UnidadCompra: data.newData.UnidadCompra,
                        Rama: data.newData.Rama,
                        CantidadBodega: data.newData.CantidadBodega,
                        Costo: data.newData.Costo,
                        Condiciones: data.newData.Condiciones,
                        RamaDesc: data.newData.RamaDesc

                      };
                      newJsonData[Articulo] = updatedData;
                      // suma el nuevo valor de "Costo" a la variable totalCost
                    });

                    const newUserInput = Object.values(newJsonData);
                    setJsonData(newJsonData);
                    dataPass(newJsonData);
                    return newUserInput;

                  });
                  resolve();
                } catch (error) {
                  reject(error);
                }

              }, 100);
            })

        }}
        components={{
          Toolbar: props => (
            <Grid container>
              <Grid item sm={12} md={12} lg={12}>
                <MTableToolbar {...props} />
                <div style={{ padding: '0px 10px' }}>
                  <nav aria-label="main mailbox folders">
                    <List style={{ display: 'flex', overflowX: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {ramas.map((rama, index) => (
                        <ListItem
                          onClick={() => {
                            setArticulosFilter([])
                            handleRamaClick(rama, index)
                          }

                          }
                          key={rama}
                          sx={{
                            '&:hover': { backgroundColor: '#ff906b' },
                            backgroundColor: selectedRamaIndex === index ? '#ff906b' : 'inherit',
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar style={{ backgroundColor: '#F04521' }}>
                              <FolderIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText>
                            <span style={{ fontSize: '12px' }}>{rama}</span>
                          </ListItemText>
                          <Divider />
                        </ListItem>
                      ))}
                    </List>
                  </nav>
                </div>
              </Grid>
              {/*
                (articulosFilter.length > 0) ?
                  <Grid item sm={1} md={1} lg={1} textAlign={'center'}>
                    <Fab size='small' style={{ marginTop: '75px', }} title='Confirmar'>
                      <Check onClick={getValues} />
                    </Fab>
                  </Grid> :
                  <Grid item sm={1} md={1} lg={1} textAlign={'center'}>

                  </Grid>
                        */}

            </Grid>


          ),
        }}
      />
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}>
        <DrawerHeader>
          <Typography variant="h5" style={{ marginRight: '25%' }}>
            PROVEEDORES
          </Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div style={{ width: 500, marginTop: '10px' }}>
          <ul>
            {Object.keys(groupedData).map((key) => {
              const items = groupedData[key];
              const ramaGroupedData = groupBy(items, (item) => item.RamaDesc);
              const nodeKey = `${key}-node`;

              return (
                <li>
                  <details style={{ padding: 5, paddingRight: 0 }}>
                    <summary style={{ fontSize: 20, }}>{key}</summary>
                    <ul >
                      {Object.keys(ramaGroupedData).map((ramaKey) => {
                        const ramaItems = ramaGroupedData[ramaKey];
                        const ramaNodeKey = `${key}-${ramaKey}-node`;

                        return (
                          <li onClick={() => handleClick(ramaItems)}>
                            <details>
                              <summary>{ramaKey}</summary>
                              {/* <ul>
                                {ramaItems.map((item) => (
                                  <li>{item.Descripcion}</li>
                                ))}
                              </ul>*/}
                            </details>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                </li>
              );
            })}
          </ul>

        </div>
      </Drawer >
    </>
  );
}

