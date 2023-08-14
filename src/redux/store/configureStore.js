
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

type Person = {
  isLoading: false,
  users: Array,
  errorMessage: null,
};

type Ruta = {
  themeCurrent: boolean,
  distance: string,
  duration: string,
  kmsMuertos: string,
  origen: string,
  destino: string,
  noTurnos: string,
  isOpenClientes: boolean,
  selectedID: string,
  selectedNombre: string,
  selectedColonia: string,
  plantasMap: [],
  rutasList: [],
  isNuevas: boolean,
  plantaSelected: string,
  checkTurnos: boolean,
  checkNuevas:boolean,
  checkLaborables: boolean,
  diasLaborables: string,
  saveResponseAddCliente: [],
  activeAddCliente: boolean,
  activeAddPlanta: boolean,
  checkPosturero: boolean,
  cotizacionesCarrito: [],
  cotizacionSelected: string,
  carritoDetalle: [],
  checkCamaras: boolean,
  checkWifi: boolean,
  checkAire: boolean,
  checkGuardia: boolean,
  checkSupervisor: boolean,
  idCliente: string,
  responseID: string,
  currentMarkup: string,
  currentPrecioVent: string,
  currentUtilidad: string,
  currentPrecioSer: string,
  currentPresupuesto: string,
  listaRutas: [],
  validadorRutas: boolean,
  tableroIdDetalle: string,
  removeActive:boolean,
  sumarUtilidad:number,
  recargarTabla:boolean,
  clearCabecero:boolean,
  habilitarBotones:boolean,
  limpiarTabla:boolean,
  activarUtilidad:boolean,
  facSupervisor:boolean,
  facCoordinador:boolean,
  facEjecutivo:boolean,
  facAdmin:boolean,
  sendToIntelisis:boolean,
  total:number
};




type RutaLista = {
  rutaLista: Array<Cotizacion> 
};

type CabeceroLista = {
  cabeceroLista: Array<Cabecero> 
};




type RegistrarCliente = {
  registroClienteNombre: string,
  registroClienteTelefonos: string,
  registroClienteEmail: string,
  registroClienteRFC: string,
  registroClienteDireccion: string,
  registroClienteDireccionNumero: string,
  registroClienteDireccionNumeroInt: string,
  registroClienteColonia: boolean,
  registroClientePoblacion: string,
  registroClienteEstado: string,
  registroClienteCodigoPostal: string,
  registroClienteDiasLaborables: string,
  registroClienteTurnosPorDia: string,
  registroClienteHorarioLaboral: string,
  registroClienteNoPaxTurno: string,
  registroClientePeriodoEstimado: string,
  registroClienteServicioGuardia: boolean,
  registroClienteUnidadesServicio: string,
};
type RegistrarPlanta = {
  registroPlantaNombre: string,
  registroPlantaTelefonos: string,
  registroPlantaEmail: string,
  registroPlantaDireccion: string,
  registroPlantaDireccionNumero: string,
  registroPlantaDireccionNumeroInt: string,
  registroPlantaColonia: boolean,
  registroPlantaPoblacion: string,
  registroPlantaEstado: string,
  registroPlantaCodigoPostal: string,
  registroPlantaDiasLaborables: string,
  registroPlantaTurnosPorDia: string,

};

type Mapa = {
  addStop: [],
  removeStop: [],

};




export type AppState = {
  rutas: Ruta,
  users: Person,
  registrarCliente: RegistrarCliente,
  registrarPlanta: RegistrarPlanta,
  mapa: Mapa,
  rutaLista: RutaLista,
  cabeceroLista: CabeceroLista,
};

const configureStore = () => {
  const middlewares = [thunk];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancers = composeEnhancers(applyMiddleware(...middlewares));
  const store = createStore(rootReducer(), enhancers);

  return store;
};

export default configureStore;

