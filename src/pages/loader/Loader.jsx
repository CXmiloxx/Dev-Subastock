import React from 'react';
import loader from '../loader/img/sp.gif'; 

export default function SPLoader() {
    return (
        <div style={styles.loaderContainer}>
            <img src={loader} alt="Cargando..." style={styles.loaderImg} />
            <h3>Cargando...</h3> 
        </div>
    );
}

const styles = {
    loaderContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', 
    },
    loaderImg: {
        width: '100px', 
        height: '100px',
    },
};
