
//const BD = "CPARRAS"
const BD = "PRODUCCION"
//const BASE_URL = "http://b3903.online-server.cloud:8080/"
const BASE_URL = "http://192.168.0.184:8001/"
//const BASE_URL = "http://187.156.19.160:8001/"


const endpoints = Object.freeze({

    login: "api/" + BD + "/loginUsuario",
    spAppUsuarioValidar: "api/" + BD + "/sp/spAppUsuarioValidar",
    spAppProvValidar: "api/" + BD + "/sp/spAppProvValidar",
    spWebUsuarioRol: "api/" + BD + "/sp/spWebUsuarioRol",
    spWebCompraRequisiciones: "api/" + BD + "/sp/spWebCompraRequisiciones",
    spWebCompraRequisicionDetalle: "api/" + BD + "/sp/spWebCompraRequisicionDetalle",
    spWebCompraReqActSugerido: "api/" + BD + "/sp/spWebCompraReqActSugerido",
    spWebRequisicionCompraD: "api/" + BD + "/sp/spWebRequisicionCompraD",
    spWebRequisicionProvD: "api/" + BD + "/sp/spWebRequisicionProvD",
    spPortalArtProv: "api/" + BD + "/sp/spPortalArtProv",
    spWebProvLista: "api/" + BD + "/sp/spWebProvLista",
    spWebPlaneadorTabl: "api/" + BD + "/sp/spWebPlaneadorTabl",
    spWebBodegaSugeridoLista: "api/" + BD + "/sp/spWebBodegaSugeridoLista",
    spWebGenerarCompraSugerido: "api/" + BD + "/sp/spWebGenerarCompraSugerido",
    spWebCamaraSugeridoPedido: "api/" + BD + "/sp/spWebCamaraSugeridoPedido",
    spWebAvanzarSituacion: "api/" + BD + "/sp/spWebAvanzarSituacion",
    spWebCamaraPedidoCantidad: "api/" + BD + "/sp/spWebCamaraPedidoCantidad",
    spWebLocalizacionLista: "api/" + BD + "/sp/spWebLocalizacionLista",

});

const routes = {


    LOGIN: BASE_URL + endpoints.login,
    USUARIO_VALIDAR: BASE_URL + endpoints.spAppUsuarioValidar,
    PROV_VALIDAR: BASE_URL + endpoints.spAppProvValidar,
    GET_ROL: BASE_URL + endpoints.spWebUsuarioRol,
    GET_REQUISICIONES: BASE_URL + endpoints.spWebCompraRequisiciones,
    GET_REQUISICIONES_DETALLE: BASE_URL + endpoints.spWebCompraRequisicionDetalle,
    SEND_REQUISICIONES_DETALLE: BASE_URL + endpoints.spWebCompraReqActSugerido,
    GET_REQUISICION_COMPRA_D: BASE_URL + endpoints.spWebRequisicionCompraD,
    GET_REQUISICION_PROV_D: BASE_URL + endpoints.spWebRequisicionProvD,
    GET_ART_PROV: BASE_URL + endpoints.spPortalArtProv,
    GET_PROV_LISTA: BASE_URL + endpoints.spWebProvLista,
    EJEC_PLANEADOR: BASE_URL + endpoints.spWebPlaneadorTabl,
    EJEC_PLANEADOR_SUGERIDO: BASE_URL + endpoints.spWebBodegaSugeridoLista,
    CAMARA_SUGERIDO_GENERAL: BASE_URL + endpoints.spWebCamaraSugeridoPedido,
    SEND_EXISTENCIAS: BASE_URL + endpoints.spWebGenerarCompraSugerido,
    AVANZAR_SITIACION: BASE_URL + endpoints.spWebAvanzarSituacion,
    SEND_PEDIDO: BASE_URL + endpoints.spWebCamaraPedidoCantidad,
    GET_CUARTOS_FRIOS: BASE_URL + endpoints.spWebLocalizacionLista,







}

export default routes
