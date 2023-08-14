import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const style = {
    fullpageLoader : {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: "1000000", 
        display: "block",
        position: "fixed",
        top:0,
        left:0,
    },

    notVisible : {
      width: "0%",
      height: "0%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: "10000000", 
      display: "block",
      position: "fixed",
      top:0,
      left:0,
  },
    
    loadingPosition: {
        top: "50%",
        left: "50%",
        position: "absolute",
    }
};


const LoadingComponent = ({active}) => {




  return (
        <div style={active ? style.fullpageLoader : style.notVisible}>
           {active ?   <CircularProgress color="primary"  style={style.loadingPosition} />  : <></>}
        </div>
  );
}

export default LoadingComponent;

