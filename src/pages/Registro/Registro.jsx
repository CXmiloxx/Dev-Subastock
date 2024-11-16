import styles from './registro.module.css';
import { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Registro() {
    const form = useRef();
    const [valores, setValores] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        contraseña: '',
        telefono: '',
        saldo: '0'
    });

    const [validaciones, setValidaciones] = useState({
        nombresValido: false,
        apellidosValido: false,
        correoValido: false,
        telefonoValido: false,
        contraseñaValida: false,
        repetirContraseñaValida: false
    });

    const validarCorreo = (email) => /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,7}$/.test(email);
    const validarContraseña = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValores({ ...valores, [name]: value });

        switch (name) {
            case "nombres":
                setValidaciones((prev) => ({ ...prev, nombresValido: value.length >= 3 }));
                break;
            case "apellidos":
                setValidaciones((prev) => ({ ...prev, apellidosValido: value.length >= 3 }));
                break;
            case "correo":
                setValidaciones((prev) => ({ ...prev, correoValido: validarCorreo(value) }));
                break;
            case "telefono":
                setValidaciones((prev) => ({ ...prev, telefonoValido: /^[0-9]{10}$/.test(value) }));
                break;
            case "contraseña":
                setValidaciones((prev) => ({ ...prev, contraseñaValida: validarContraseña(value) }));
                break;
            case "repetirContraseña":
                setValidaciones((prev) => ({ ...prev, repetirContraseñaValida: value === valores.contraseña }));
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validations = [
            { campo: "nombres", min: 3, message: "El nombre debe contener mínimo 3 caracteres" },
            { campo: "apellidos", min: 3, message: "El apellido debe contener mínimo 3 caracteres" },
            { campo: "correo", validacion: validarCorreo, message: "Debe introducir una dirección de correo electrónico válida" },
            { campo: "telefono", min: 10, max: 10, message: "El teléfono debe ser de 10 números" },
            { campo: "contraseña", validacion: validarContraseña, message: "La contraseña no cumple con los requisitos mínimos" },
            { campo: "repetirContraseña", validacion: value => value !== "", message: "Este campo no puede quedar vacío" },
            { campo: "contraseña", validacion: (value) => value === valores.repetirContraseña, message: "Las contraseñas ingresadas no coinciden" }
        ];

        for (const { campo, min, max, validacion, message } of validations) {
            const value = valores[campo];
            if ((min && value.length < min) || (max && value.length > max) || (validacion && !validacion(value))) {
                Swal.fire({ title: message, icon: "error" });
                return;
            }
        }

        fetch(import.meta.env.VITE_API_URL + '/usuario/Insertar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(valores)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return response.json();
            })
            .then((data) => {
                console.log(data);
                console.log(valores);
                if (data.status) {
                    Swal.fire({ title: data.message, icon: 'success' });
                    form.current.reset();
                    setValores({
                        nombres: '',
                        apellidos: '',
                        correo: '',
                        contraseña: '',
                        saldo: '',
                        telefono: '',
                        repetirContraseña: ''
                    });
                    window.location.hash = "/login";
                } else {
                    Swal.fire({ title: data.message, icon: 'error' });
                }
            })
            .catch((error) => {
                Swal.fire({ title: `Error al registrar: ${error.message}`, icon: 'error' });
            });
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.contentRegister}>
                <form onSubmit={handleSubmit} ref={form} className={styles.registroForm}>
                    <section className={styles.containerRegistro}>
                        <h1 className={styles.titulo}>Registro</h1>

                        <div className={styles.formRow}>
                            <div className={styles.inputContainer}>
                                <label>Nombres</label>
                                <input type="text" name="nombres" onChange={handleChange} required />
                                <div className={styles.checkboxContainer}>
                                    <span className={validaciones.nombresValido ? styles.valid : styles.invalid}>
                                        {validaciones.nombresValido ? "Válido" : "3+ caracteres"}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.inputContainer}>
                                <label>Apellidos</label>
                                <input type="text" name="apellidos" onChange={handleChange} required />
                                <div className={styles.checkboxContainer}>
                                    <span className={validaciones.apellidosValido ? styles.valid : styles.invalid}>
                                        {validaciones.apellidosValido ? "Válido" : "3+ caracteres"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.inputContainer}>
                                <label>Teléfono</label>
                                <input type="tel" name="telefono" pattern="[0-9]{10}" onChange={handleChange} required />
                                <div className={styles.checkboxContainer}>
                                    <span className={validaciones.telefonoValido ? styles.valid : styles.invalid}>
                                        {validaciones.telefonoValido ? "Válido" : "10 dígitos"}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.inputContainer}>
                                <label>Correo Electrónico</label>
                                <input type="email" name="correo" onChange={handleChange} required />
                                <div className={styles.checkboxContainer}>
                                    <span className={validaciones.correoValido ? styles.valid : styles.invalid}>
                                        {validaciones.correoValido ? "Válido" : "Email válido"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.inputContainer}>
                                <label>Contraseña</label>
                                <input type="password" name="contraseña" onChange={handleChange} required />
                                <div className={styles.checkboxContainer}>
                                    <span className={validaciones.contraseñaValida ? styles.valid : styles.invalid}>
                                        {validaciones.contraseñaValida ? "Válido" : "6+ caracteres, 1 letra, 1 número"}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.inputContainer}>
                                <label>Confirmar Contraseña</label>
                                <input type="password" name="repetirContraseña" onChange={handleChange} required />
                                <div className={styles.checkboxContainer}>
                                    <span className={validaciones.repetirContraseñaValida ? styles.valid : styles.invalid}>
                                        {validaciones.repetirContraseñaValida ? "Coincide" : "No coincide"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className={styles.btn}>Registrarse</button>
                        <Link to="/login" className={styles.textLogin}>¿Ya tienes una cuenta? Inicia sesión</Link>
                    </section>
                </form>
            </div>
        </div>
    );
}
