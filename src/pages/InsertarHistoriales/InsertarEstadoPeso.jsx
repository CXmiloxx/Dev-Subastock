import { useState, useEffect } from 'react';
import styles from './styles/insertarAlimentos.module.css';
import Swal from 'sweetalert2';

export default function InsertarEstadoPeso() {
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
        peso: '',
        estado: ''
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
        fetch(`${API_URL}/estadoSalud/Insertar`, {
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
                        peso: '',
                        estado: ''
                    });
                } else {
                    Swal.fire({ title: data.message, icon: 'error' });
                    setValores({
                        idAnimal: idAnimal,
                        peso: '',
                        estado: ''
                    });
                }
            })
            .catch(error => {
                console.error('Error al insertar alimento:', error);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div className={styles.formContainerDiv}>
                    <h1 className={styles.title}>INSERTAR PESO Y SALUD</h1>
                    <div className={styles.cowContainerImg}>
                        <p>Marca del Animal: {marca ? marca : "No disponible"}</p>
                    </div>
                    <div className={styles.inputContainerAlimento}>
                        <label htmlFor="peso" className={styles.label}>Ingrese el peso del animal:</label>
                        <input
                            type="text"
                            id="peso"
                            name="peso"
                            onChange={handleChange}
                            placeholder="Ingrese el peso del animal"
                            className={styles.textInput}
                            required
                        />
                        <label htmlFor="estado" className={styles.label}>Estado:</label>
                        <select
                            id="estado"
                            name="estado"
                            onChange={handleChange}
                            className={styles.selectInput}
                            required
                        >
                            <option value="">Seleccione el estado de salud del animal</option>
                            <option value="Normal">Normal</option>
                            <option value="Desnutricion">Desnutrición</option>
                            <option value="Excelente">Excelente</option>
                            <option value="buena">Buena</option>
                            <option value="regular">Regular</option>
                            <option value="mala">Mala</option>
                            <option value="muy-mala">Muy mala</option>
                        </select>
                    </div>
                    <button className={styles.submitButton} type='submit'>
                        INSERTAR PESO Y SALUD
                    </button>
                </div>
            </form>
        </div>
    );
}
