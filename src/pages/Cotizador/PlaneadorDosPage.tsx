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
import Articulo from '../../interfaces/Articulo';
import { TablePlaneadorDos } from './components/TablePlaneadorDos';

interface PlaneadorDosPageProps {

}



export const PlaneadorDosPage: React.FC<PlaneadorDosPageProps> = () => {

    const [loading, setLoading] = useState(false);



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



    const handleDataPass = (data: any) => {
        console.log("data pass");
        console.log(data);
      

    }

    return (
        <Layout style={styles.Paper}>
            <Loading active={loading} />
            <HeaderSimple title='COMPRA FRUTAS Y VERDURAS'/>
            <TablePlaneadorDos dataPass={handleDataPass} />
        </Layout>
    );
}