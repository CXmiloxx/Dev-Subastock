import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
export default function BotonVolver({ ruta }) {
    return (
        <div>
            <Link to={ruta}>
                <button style={styles.btnVolver}>Volver</button>
            </Link>
        </div>
    )
}

const styles = {
    btnVolver: {
        backgroundColor: '#5cb85c',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        border: 'none',
        cursor: 'pointer',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
};
