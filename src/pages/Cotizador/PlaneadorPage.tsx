import { Button, Layout } from 'antd';
import 'antd/dist/antd.min.css';
import React, { Component, useState, useEffect } from 'react';
import HeaderSimple from '../../components/HeaderSimple';
import manager from '../../service-manager/api';
import routes from '../../service-manager/routes'
import Loading from './components/Loading';
import swal from 'sweetalert';
import { TablePlaneador } from './components/TablePlaneador';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination, History } from "swiper";
import '../../css/swiper.css'
import { TableAgregados } from './components/TableAgregados';
import Articulo from '../../interfaces/Articulo';
interface PlaneadorPageProps {

}



export const PlaneadorPage: React.FC<PlaneadorPageProps> = () => {

  const [loading, setLoading] = useState(false);
  const [dataSugeridos, setDataSugeridos] = useState([]);
  const [dataPlaneador, setDataPlaneador] = useState([]);
  const [proveedor, setProveedor] = useState('');
  const [receivedData, setReceivedData] = useState<Articulo[]>([]);

  const styles = {
    Paper: {
      background: '#f0f2f5',
    },
    Card: {
      background: '#f0f2f5',
      color: '#f0f2f5',
      width: '98%',
      borderRadius: 5,
      elevation: '3',
      margin: '10px',
      alignContent: 'center',
      alignItems: 'center'
    }

  }

  useEffect(() => {

    getPlaneador()
  }, [])

  const getPlaneador = () => {
    setLoading(true)
    manager.postData(routes.EJEC_PLANEADOR, { "Empresa": "CP" })
      .then(response => {
        if (response.length > 0) {
          setDataPlaneador(response)
          setProveedor(response[0].Nombre)
          setLoading(false)
          console.log("RESPONSE: " + dataPlaneador)
        }
        else {
          //swal("Verifique su request");
          setLoading(false)
          setDataPlaneador(response)
        }
      })
      .catch(error => {
        swal(error.data.Mensaje, '', "error");
      });
  }

  const handleDataPass = (data: any) => {
    console.log("data pass");
    console.log(data);
    setReceivedData(data)

  }

  return (
    <Layout style={styles.Paper}>
      <Loading active={loading} />
      <HeaderSimple title='Sugeridos de Bodega' />

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation={true}
        pagination={false}
        history={{
          key: "slide",
        }}
        modules={[Navigation, Pagination, History]}
        className="mySwiperCustom"
      >

        <SwiperSlide key={1} data-history="1" style={{ marginTop: '30px' }}>
          <TablePlaneador data={dataPlaneador} dataPass={handleDataPass} />
        </SwiperSlide>
        <SwiperSlide key={2} data-history="2" style={{ marginTop: '30px' }}>
          <TableAgregados dataPass={receivedData} />
        </SwiperSlide>
      </Swiper>
    </Layout>
  );
}