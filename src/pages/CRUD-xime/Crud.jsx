import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import styles from './styles/Crud.module.css';
import HistorialAliemto from '../Historiales/HistorialAlimento';
import HistorialVacunacion from '../Historiales/HistorialVacunacion';
import HistorialPesoSalud from '../Historiales/HistorialPesoSalud';
import InsertarAlimento from '../InsertarHistoriales/InsertarAlimento';
import InsertarEstadoPeso from '../InsertarHistoriales/InsertarEstadoPeso';
import InsertarMedicamentos from '../InsertarHistoriales/InsertarMedicamentos';
import BotonVolver from '../../components/UI/BotonVolver';
import Modal from '../../components/UI/Modal';
import SPLoader from '../loader/Loader';

function Crud() {
    const [showAlimentacion, setShowAlimentacion] = useState(false);
    const [showVacunacion, setShowVacunacion] = useState(false);
    const [showPesoSalud, setShowPesoSalud] = useState(false);
    const [insertarAlimentacion, setInsertarAlimentacion] = useState(false);
    const [insertarVacunacion, setInsertarVacunacion] = useState(false);
    const [insertarPesoSalud, setInsertarPesoSalud] = useState(false);
    const [marca, setMarca] = useState('');
    const [idAnimal, setIdAnimal] = useState();
    const [raza, setRaza] = useState('');
    const [especie, setEspecie] = useState('');
    const [btnActived, setBtnActived] = useState(false);
    const [selectedOption, setSelectedOption] = useState(''); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedMarca = localStorage.getItem('marcaAnimal');
        const storedRaza = localStorage.getItem('razaAnimal');
        const storedEspecie = localStorage.getItem('especieAnimal');
        const storedIdAnimal = localStorage.getItem('idAnimal');

        if (storedMarca) setMarca(storedMarca);
        if (storedRaza) setRaza(storedRaza);
        if (storedEspecie) setEspecie(storedEspecie);
        if (storedIdAnimal) setIdAnimal(storedIdAnimal);
    }, []);

    useEffect(() => {
        const fetchAnimalData = async () => {
            if (!idAnimal) return;

            try {
                const response = await fetch(import.meta.env.VITE_API_URL+ `/subasta/AnimalSubastado/${idAnimal}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const data = await response.json();
                setBtnActived(data.status);
            } catch (error) {
                console.error('Error al obtener la información:', error);
            }
        };

        fetchAnimalData();
    }, [idAnimal]);

    const insertar = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);

        switch (selectedValue) {
            case '1':
                setInsertarAlimentacion(true);
                break;
            case '2':
                setInsertarVacunacion(true);
                break;
            case '3':
                setInsertarPesoSalud(true);
                break;
            default:
                break;
        }

        setSelectedOption('');
    };

    const eliminarAnimal = async (idAnimal) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro de eliminar el animal?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });

            if (result.isConfirmed) {
                setLoading(true);
                const response = await fetch(import.meta.env.VITE_API_URL+`/animal/Eliminar/${idAnimal}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setLoading(false);

                if (data.status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'El animal ha sido eliminado correctamente.',
                    }).then(() => {
                        navigate('/sesion-iniciada');
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message,
                    });
                }
            }
        } catch (error) {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al eliminar el animal.',
            });
        }
    };

    return (
        <div className={styles.crudApp}>
            {loading ? (
                <SPLoader />
            ) : (
                <div className={styles.content}>
                    <div className={styles.headerCrud}>
                        <div className={styles.dropdown}>
                            <label>Insertar</label>
                            <br />
                            <select onChange={insertar} value={selectedOption}>
                                <option value="">Seleccione una opción</option>
                                <option value="1">Insertar alimentación</option>
                                <option value="2">Insertar medicamentos</option>
                                <option value="3">Insertar peso y salud</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.table}>
                        <div className={styles.row}>
                            <div className={styles.cell}>Especie</div>
                            <div className={styles.cell}>Raza</div>
                            <div className={styles.cell}>Marca</div>
                            <div className={styles.cell}>Estado</div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.cell2}>{especie}</div>
                            <div className={styles.cell2}>{raza}</div>
                            <div className={styles.cell2}>{marca || 'No disponible'}</div>
                            <div className={styles.cell2}>
                                {btnActived ? (
                                    <span>Animal ya subastado</span>
                                ) : (
                                    <Link to={`/subastar/${idAnimal}`}>
                                        <button className={styles.buttonInicioCrud}>
                                            Iniciar Subasta
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.menuCrud}>
                        <button onClick={() => setShowVacunacion(true)} className={styles.menuCrudButton}>
                            VER VACUNACIÓN
                        </button>
                        <Modal show={showVacunacion} onClose={() => setShowVacunacion(false)}>
                            <HistorialVacunacion />
                        </Modal>

                        <button onClick={() => setShowAlimentacion(true)} className={styles.menuCrudButton}>
                            VER ALIMENTACIÓN
                        </button>
                        <Modal show={showAlimentacion} onClose={() => setShowAlimentacion(false)}>
                            <HistorialAliemto />
                        </Modal>

                        <button onClick={() => setShowPesoSalud(true)} className={styles.menuCrudButton}>
                            VER PESO Y SALUD
                        </button>
                        <Modal show={showPesoSalud} onClose={() => setShowPesoSalud(false)}>
                            <HistorialPesoSalud />
                        </Modal>
                    </div>
                    <br />
                    <div className={styles.footerButtons}>
                        <BotonVolver ruta={`/visualizar/${especie}`} />
                        <button onClick={() => eliminarAnimal(idAnimal)} className={styles.deleteButton}>
                            ELIMINAR ANIMAL
                        </button>
                    </div>
                    <Modal show={insertarAlimentacion} onClose={() => setInsertarAlimentacion(false)}>
                        <InsertarAlimento />
                    </Modal>
                    <Modal show={insertarVacunacion} onClose={() => setInsertarVacunacion(false)}>
                        <InsertarMedicamentos />
                    </Modal>
                    <Modal show={insertarPesoSalud} onClose={() => setInsertarPesoSalud(false)}>
                        <InsertarEstadoPeso />
                    </Modal>
                </div>
            )}
        </div>
    );
}

export default Crud;
