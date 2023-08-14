import swal from 'sweetalert';
import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';

interface SwalComponentProps {
        cliente?:any,
        nombre?:any,
        noTurnos?:any,
        diasLaborables?: any
    }
    
export const SwalComponent: React.FC<SwalComponentProps> = ({cliente,nombre,noTurnos,diasLaborables}) => {
    const dispatch = useDispatch();
    useEffect(() => {
      console.log(cliente)
      console.log(nombre)
      console.log(noTurnos)
      console.log(diasLaborables)

      dispatch(rutaActions.rutaSaveClienteSelectedID(cliente))
      dispatch(rutaActions.rutaSaveClienteSelectedNombre(nombre))
      dispatch(rutaActions.rutaSaveNoTurnos(noTurnos))
      dispatch(rutaActions.rutaSaveDiasLaborables(diasLaborables))
    
    }, [])


    

   return (swal({
        title: "Correcto !",
        text: "El cliente fue agregado correctamente!",
        icon: "success",
        button: this.handleChangeSwal(),
      }))
}
