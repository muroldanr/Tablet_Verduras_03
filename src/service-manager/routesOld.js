//const BASE_URL = "https://rtorresapp.com/avanti-back/web/app_dev.php"
//const BASE_URL = "https://rtorresapp.com/app_dev.php"
//const BASE_URL = "http://192.168.15.15:8080/app_dev.php"
const BASE_URL = "http://198.251.68.141:8080/"


const endpoints = Object.freeze({


        login: 			                "api/login?database=TEB",
        set_avanzar_pedido:             "sp/execute/tecso/spWebGenerarVentaPedido",
       
        
        

        
});

const routes = {


    SET_AVANZAR_PEDIDO:             BASE_URL + endpoints.set_avanzar_pedido,
	LOGIN: 			                BASE_URL + endpoints.login, 
 
}

export default routes


