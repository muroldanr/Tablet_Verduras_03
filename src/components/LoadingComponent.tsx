import React from 'react';
import {  Spin } from 'antd';

const style: { [key: string]: React.CSSProperties } = {
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
    
    loadingPosition: {
        top: "50%",
        left: "50%",
        position: "absolute",
    }
};


const LoadingComponent = () => {

    return (
        <div style={style.fullpageLoader}>
            <Spin style={style.loadingPosition} size="large" />
        </div>
    );
}

export default LoadingComponent;



