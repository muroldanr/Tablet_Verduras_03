import React, { useEffect, useState } from 'react';

import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import RequisicionDetalle from '../../../interfaces/RequisicionDetalle'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Check, Edit, Cancel, Search, CloseOutlined, Delete, ShoppingCart } from '@material-ui/icons';
import NumberFormat from 'react-number-format';
import { Fab, Grid, IconButton, Typography } from '@mui/material';
import Articulo from '../../../interfaces/Articulo';



interface TableAgregadosProps {
    dataPass: any,
}

export const TableAgregados: React.FC<TableAgregadosProps> = ({ dataPass }) => {
    const [data, setData] = useState<Articulo[]>([]);
    useEffect(() => {
        console.log("data received")
        console.log(dataPass)
        setData(dataPass);
    }, [dataPass])

    const theme = createMuiTheme({
        overrides: {
            MuiTablePagination: {
                toolbar: {
                    '& .MuiIconButton-root': {
                        color: '#FB8987', // color personalizado para los iconos
                    },
                },
            },
            MuiTableSortLabel: {
                icon: {
                    color: '#FB8987', // color personalizado para los iconos
                },
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
            td: 'center'
        }

    }

    return (

        <MaterialTable
            title={
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography variant="h6" style={{ marginTop: '2%' }}>
                            ARTICULOS AGREGADOS
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton style={{ backgroundColor: '#F04521' }} aria-label="add to shopping cart">
                            <ShoppingCart style={{ color: '#FFF' }} />
                        </IconButton>
                    </Grid>
                </Grid>
            }
            icons={{
                NextPage: forwardRef((props, ref) => <NavigateNextIcon {...props} ref={ref} />),
                PreviousPage: forwardRef((props, ref) => <ArrowBackIosNewIcon {...props} ref={ref} />),
                LastPage: forwardRef((props, ref) => <SkipNextIcon {...props} ref={ref} />),
                FirstPage: forwardRef((props, ref) => <SkipPreviousIcon {...props} ref={ref} />),
                Filter: forwardRef((props, ref) => <FilterListIcon {...props} ref={ref} />),
                SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
                Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
                Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
                Clear: forwardRef((props, ref) => <Cancel {...props} ref={ref} />),
                Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
                ResetSearch: forwardRef((props, ref) => <CloseOutlined {...props} ref={ref} />),
                Delete: forwardRef((props, ref) =>
                    <Fab size='small' style={{ boxShadow: '0px 0px 5px 3px rgba(236,49,55,0.8)', backgroundColor: 'white' }}>
                        <Delete style={{ 'color': 'red' }} {...props} ref={ref} />
                    </Fab>),
            }}


            columns={[
                {
                    title: 'Código de barras',
                    field: 'CodigoBarras',
                    editable: 'never',
                    width: '10%',
                    cellStyle: { width: '10%' },
                },
                {
                    title: 'Articulo',
                    field: 'Descripcion1',
                    editable: 'never',
                    width: '30%',
                    cellStyle: { width: '30%' },
                },
                { title: 'Rama', field: 'RamaDesc', editable: 'never' },
                {
                    title: 'Unidad',
                    field: 'UnidadCompra',
                    editable: 'never',
                    width: '10%',
                    cellStyle: { width: '10%' },
                },
                {
                    title: 'Disponible',
                    field: 'Disponible',
                    type: 'numeric',
                    editable: 'onUpdate',
                    width: '10%',
                    cellStyle: { width: '10%' },
                    render: (rowData: any) => <NumberFormat value={rowData.Disponible} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} className="spamprecio" />,

                },
                {
                    title: 'Sugerido Bodega',
                    field: 'CantidadBodega',
                    type: 'numeric',
                    editable: 'onUpdate',
                    cellStyle: { textAlign: 'center' },
                    render: (rowData: any) => <NumberFormat value={rowData.CantidadBodega} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} className="spamprecio" />,

                },

            ]}
            data={Object.values(data)}
            style={styles.Card}
            editable={{
                onRowDelete: (oldData: any) =>
                    new Promise<void>((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = { ...data };
                            delete dataDelete[oldData.Articulo];
                            setData(dataDelete);
                            resolve();
                        }, 1000)
                    })
            }}
            options={{
                pageSize: 5,
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
            localization={{
                header: {
                    actions: ''
                },

                toolbar: {
                    searchTooltip: 'Buscar',
                    searchPlaceholder: 'Buscar...'
                },

                body: {
                    emptyDataSourceMessage: 'Sin resultados para mostrar',
                    addTooltip: 'Agregar',
                    deleteTooltip: 'Eliminar',
                    editTooltip: 'Editar',
                    filterRow: {
                        filterTooltip: 'Filtrar'
                    },
                    editRow: {
                        saveTooltip: 'Guardar',
                        cancelTooltip: 'Cancelar',
                        deleteText: '¿Está seguro que desea eliminar esta fila?'
                    }
                },

                pagination: {
                    labelRowsSelect: 'Filas',
                    labelDisplayedRows: '{from}-{to} de {count}',
                    firstTooltip: 'Primera página',
                    previousTooltip: 'Página anterior',
                    nextTooltip: 'Siguiente página',
                    lastTooltip: 'Última página'

                },

            }}

        />
    );
}
