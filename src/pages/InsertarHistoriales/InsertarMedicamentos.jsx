import { useState, useEffect } from "react";
import styles from './styles/insertarAlimentos.module.css';
import Swal from 'sweetalert2';

export default function Informacion() {
    const [marca, setMarca] = useState('');
    const [idAnimal, setIdAnimal] = useState('');
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const storedMarca = localStorage.getItem('marcaAnimal');
        if (storedMarca) {
            setMarca(storedMarca);
        }
        const storedIdAnimal = localStorage.getItem('idAnimal');
        if (storedIdAnimal) {
            setIdAnimal(storedIdAnimal);
        }
    }, []);

    const [valores, setValores] = useState({
        nombre: '',
        dosis: ''
    });

    useEffect(() => {
        setValores((prevValores) => ({
            ...prevValores,
            idAnimal: idAnimal,
        }));
    }, [idAnimal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValores({ ...valores, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_URL}/medicamento/Insertar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(valores)
        })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then((data) => {
                if (data.status) {
                    Swal.fire({ title: data.message, icon: 'success' });
                    setValores({
                        idAnimal: idAnimal,
                        nombre: '',
                        dosis: ''
                    });
                } else {
                    Swal.fire({ title: data.message, icon: 'error' });
                    setValores({
                        idAnimal: idAnimal,
                        nombre: '',
                        dosis: ''
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message
                });
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.formContainerDiv}>
                    <h3 className={styles.title}>INSERTAR MEDICAMENTOS</h3>
                    <div className={styles.cowContainerImg}>
                        <p>Marca del Animal: {marca ? marca : "No disponible"}</p>
                    </div>
                    <div className={styles.inputContainerAlimento}>
                        <label className={styles.label}>Nombre:</label>
                        <input
                            type="text"
                            id='nombre'
                            name='nombre'
                            required
                            className={styles.textInput}
                            placeholder="Ingrese el nombre del medicamento"
                            onChange={handleChange}
                        />
                        <label className={styles.label}>Dosis:</label>
                        <input
                            type="number"
                            id='dosis'
                            name='dosis'
                            required
                            className={styles.selectInput}
                            placeholder="Ingrese la dosis aplicada"
                            onChange={handleChange}
                        />
                    </div>
                    <button type='submit' className={styles.submitButton}>
                        INSERTAR MEDICAMENTO
                    </button>
                </div>
            </form>
        </div>
    );
}
