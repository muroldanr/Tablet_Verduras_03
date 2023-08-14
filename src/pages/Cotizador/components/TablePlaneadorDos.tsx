import React, { useEffect, useState } from 'react';
import { forwardRef } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { Check, Edit, Cancel, Search, CloseOutlined, ViewColumn } from '@material-ui/icons';
import MaterialTable, { MTableToolbar } from 'material-table';
import Avatar from '@mui/material/Avatar';
import { Button, Fab } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
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
import Typography from '@mui/material/Typography';
import tableLocalization from './TableLocalizations';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Intel from '../../../images/intel.png';
import '../../../css/intelisisImage.css';
import Loading from '../components/Loading';
import PrintIcon from '@mui/icons-material/Print';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'



interface TablePlaneadorDosProps {

  dataPass: any,
}

export const TablePlaneadorDos: React.FC<TablePlaneadorDosProps> = ({ dataPass }) => {
  const [loading, setLoading] = useState(false);
  const [dataPlaneador, setDataPlaneador] = useState<Articulo[]>([]);
  const [selectedLocalizacion, setSelectedLocalizacion] = useState<string>('');
  const [cuartorFrios, setCuartosFrios] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState(null);



  useEffect(() => {
    setLoading(true)
    manager.postData(routes.GET_CUARTOS_FRIOS, { "WebUsuario": localStorage.getItem("usuario") })
      .then(response => {
        if (response.length > 0) {
          setCuartosFrios(response);
          getPlaneador();
          setLoading(false);
        }
        else {
          //swal("Verifique su request");

          setCuartosFrios(response)
          getPlaneador();
          setLoading(false)
        }
      })
      .catch(error => {
        swal(error.data.Mensaje, '', "error");
      });
  }, [])


  //LOGICA



  const getPlaneador = () => {
    setLoading(true);
    manager
      .postData(routes.CAMARA_SUGERIDO_GENERAL, { WebUsuario: localStorage.getItem("usuario") })
      .then((response) => {
        if (response.length > 0) {
          setDataPlaneador(response);
          setLoading(false);
        } else {
          setLoading(false);
          setDataPlaneador(response);
        }
      })
      .catch((error) => {
        swal(error.data.Mensaje, '', "error");
      });
  };






  const clearArray = () => {
    // Filtrar y mapear el arreglo dataPlaneador
    const newDataPlaneador = dataPlaneador.map((item: any) => {
      return {
        Articulo: item.Articulo,
        Cantidad: item.Pedido
      };
    });

    // Imprimir la versión limpia en la consola
    console.log(newDataPlaneador);
    sendIntelisis(newDataPlaneador);
  };

  function sendIntelisis(jsonCleanData: any) {
    manager
      .postData(routes.SEND_PEDIDO, {
        WebUsuario: localStorage.getItem("usuario"),
        json: JSON.stringify(jsonCleanData)
      })
      .then((response: any) => {
        console.log(response[0].OkRef);
        if (response[0].OkRef == null) {
          swal("Pedido", "Enviado correctamente" || "", "success").then(() => {
            window.location.reload();
          });
        } else if (response[0].error !== null) {
          //alert("Verifique su solicitud");
          swal(response[0].OkRef, "", "error");
        }
      })
      .catch((error: any) => {
        alert("Error: " + error);
      });
  }


  const handleLocalizacionClick = (location: string) => {
    console.log(location);
    setSelectedLocalizacion(location);
  }

  // STYLES

  const styles = {

    Card: {
      borderRadius: 5,
      elevation: '3',
      margin: '10px',
      alignContent: 'center',
      alignItems: 'center',
      td: 'center',
      width: '97%',
    }

  }


  const TitleWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
  });

  const TitleText = styled('div')({
    marginRight: '10px',
    color: '#FFF'
  });


  const handlePrint = () => {
    const doc = new jsPDF();

    const tableData = dataPlaneador.map((item) => [
      item.Descripcion,
      item.Cantidad,
      item.Unidad,
      ""
    ]);

    autoTable(doc, {
      head: [['Artículo', 'Existencia', 'Unidad', 'Pedido']],
      body: tableData,
      theme: 'grid', // Esta opción aplicará el estilo de cuadrícula
      styles: {
        lineColor: [0, 0, 0], // Color de las líneas de la cuadrícula (negro)
        lineWidth: 0.5, // Ancho de las líneas de la cuadrícula
      },
      headStyles: {
        fillColor: [240, 69, 33], // Color de fondo de la fila de encabezado en RGB (240, 69, 33)
        textColor: [255, 255, 255], // Color del texto en la fila de encabezado en blanco
      },
      bodyStyles: {
        textColor: [0, 0, 0], // Color del texto en el cuerpo de la tabla en negro
      },
      columnStyles: {
        3: { fillColor: [255, 255, 255] }, // Establece el color de fondo para la columna de "Pedido" en blanco
      },
    });

    doc.save('reporte.pdf');
  };


  return (
    <>
      <Loading active={loading} />
      <MaterialTable
        title={''}
        style={styles.Card}
        onRowClick={((evt, selectedRow: any) => setSelectedRow(selectedRow.tableData.id))}
        options={{
          //padding: "dense",
          grouping: false,

          rowStyle: rowData => ({
            fontSize: 13,
            textAlign: 'left',
            backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
          }),

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
          Edit: forwardRef((props, ref) => <Edit style={{ marginTop: '270px', position: 'absolute', color: '#FFF', zIndex: 100 }}{...props} ref={ref} />),
          Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
          Clear: forwardRef((props, ref) => <Cancel {...props} ref={ref} />),
          Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
          ResetSearch: forwardRef((props, ref) => <CloseOutlined {...props} ref={ref} />),
          ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
          DetailPanel: forwardRef((props, ref) => <ExpandMoreIcon {...props} ref={ref} />)

        }}
        data={dataPlaneador}
        columns={[
          {
            title: 'Artículo',
            field: 'Articulo',
            editable: 'never',
            sorting: false,
            width: '10%',
            cellStyle: { width: '10%', textAlign: 'left', fontSize: '25px' },
            headerStyle: { fontSize: '25px' },
            hidden: true,
          },

          {
            title: 'Artículo',
            field: 'Descripcion',
            editable: 'never',
            sorting: false,
            width: '80%',
            cellStyle: { width: '80%', textAlign: 'left', fontSize: '25px' },
            headerStyle: { fontSize: '25px' },
          },
          {
            title: 'Localizacion',
            field: 'Localizacion',
            editable: 'never',
            sorting: false,
            width: '10%',
            cellStyle: { width: '10%', textAlign: 'left', fontSize: '25px' },
            headerStyle: { fontSize: '25px' },
            hidden: true,
            defaultFilter: selectedLocalizacion
          },
          {
            title: (
              <TitleWrapper>
                <TitleText>Existencia</TitleText>
                <Fab
                  onClick={getPlaneador}
                  sx={{
                    backgroundColor: "#F04521",
                    '&:hover': {
                      backgroundColor: "#F04521",
                    },
                    boxShadow: "none",
                    padding: "5px",
                    width: "30px",
                    height: "30px",
                  }}
                  size='small'
                >
                  <AutorenewIcon
                    sx={{ color: '#FFFFFF', ':hover': { color: '#000000' } }}
                  />
                </Fab>
              </TitleWrapper>
            ),
            sorting: true,
            field: 'Cantidad',
            editable: 'never',
            filtering: false,
            render: rowData => (
              <NumberFormat
                value={rowData.Cantidad}
                displayType={'text'}
                style={{ fontSize: '25px' }}
                thousandSeparator={true}
                decimalScale={rowData.Decimales}
                fixedDecimalScale={true}
                className="spamprecio"
              />
            ),
            headerStyle: {
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: '25px',
              color: 'blue',
            },
          },
          {
            title: 'Unidad',
            field: 'Unidad',
            editable: 'never',
            sorting: false,
            width: '10%',
            cellStyle: { width: '10%', textAlign: 'left', fontSize: '25px' },
            headerStyle: { fontSize: '25px' },
          },
          {
            title: 'Pedido',
            field: 'Pedido',
            editable: 'always',
            filtering: false,
            sorting: false,
            width: '10%',
            cellStyle: { width: '10%', textAlign: 'left', fontSize: '25px' },
            headerStyle: { fontSize: '25px' },
            editComponent: props => (
              <input
                type="number"
                id="custom-css-outlined-input"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                onFocus={() => setSelectedRow(props.rowData.tableData.id)}
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '1px solid red',
                  fontSize: '25px',
                  borderRadius: '5px',
                }}
              />
            ),
          },





        ]}
        components={{
          Toolbar: props => (
            <div>
              <Button onClick={handlePrint} style={{ backgroundColor: '#F04521', color: 'white', float: 'left', marginTop: '15px', marginLeft: '15px' }}>
                <PrintIcon style={{ color: 'white', marginRight: '8px', fontSize: 35 }} />
                <span style={{ marginLeft: '8px', fontSize: 18 }}>Imprimir</span>
              </Button>
              <MTableToolbar {...props} />
              <div style={{ padding: '0px 10px' }}>
                <nav aria-label="main mailbox folders">
                  <List style={{ display: 'flex', overflowX: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {cuartorFrios.map((item, index) => (
                      <ListItem
                        onClick={() => handleLocalizacionClick(item.Localizacion.toString())}
                        key={index}
                        sx={{
                          '&:hover': {
                            backgroundColor: '#ff906b'

                          },
                          backgroundColor: selectedLocalizacion === item.Localizacion ? '#ff906b' : 'inherit',
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar style={{ backgroundColor: '#F04521' }}>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                          <span style={{ fontSize: '12px' }}>{item.Localizacion}</span>
                        </ListItemText>
                        <Divider />
                      </ListItem>
                    ))}
                  </List>
                </nav>
              </div>

            </div>
          ),
        }}
        editable={{
          onBulkUpdate: changes =>
            new Promise<void>((resolve, reject) => {
              setTimeout(() => {
                try {
                  // Actualizar los datos en dataPlaneador según los cambios
                  const updatedData = dataPlaneador.map((row, index) => {
                    const change = changes[index];
                    if (change) {
                      return { ...row, ...change.newData };
                    }
                    return row;
                  });

                  // Actualizar el estado de dataPlaneador
                  setDataPlaneador(updatedData);

                  resolve();
                } catch (error) {
                  reject(error);
                }

              }, 100);
            })

        }}
      />
      <div className="sphere" style={{ marginTop: '0%' }} onClick={clearArray}>
        <img src={Intel} alt="Logo Intelisis" width='50px' style={{ marginLeft: '25px', marginTop: '20px' }} />
      </div>
      <Typography variant="h4" component="h4" style={{ textAlign: 'center' }}>
        Enviar Pedido
      </Typography>
    </>
  );
}

