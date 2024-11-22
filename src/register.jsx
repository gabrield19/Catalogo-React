import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './css/style_register.css';

function RegistrationForm() {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        nombrecompleto: '',
        cedula: '',
        email: '',
        celular: '',
        usuario: '',
        contraseña: '',
        contraseñaconfirmacion: '',
    });

    const [errors, setErrors] = useState({});
    const [contraseñaStrength, setcontraseñaStrength] = useState('');
    const [contraseñaStatusMessage, setContraseñaStatusMessage] = useState(''); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'contraseña') {  
            calculatePasswordStrength(value);  
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        clearErrors();

        let isValid = validateForm();

        if (isValid) {
            try {
                
                localStorage.setItem('user', JSON.stringify(formData));
    
               
                alert('Registro completado exitosamente.');
                document.getElementById('registrationForm').reset();
                resetStrengthBar();
                navigate('/');
            } catch (error) {
                console.error('Error:', error);
                alert('Ocurrió un error al registrar el usuario, intente de nuevo.');
            }
        }
    };

    const showError = (field, message) => {
        setErrors(prevErrors => ({
            ...prevErrors,
            [field]: message
        }));
    };

const calculatePasswordStrength = (contraseña) => {
    
    let strength = 'strength-weak';
    let message = ''
    if (contraseña.length >= 8) {
        const hasUpperCase = /[A-Z]/.test(contraseña);
        const hasNumber = /\d/.test(contraseña);
        const hasSpecialChar = /[@$!%*?&.,:;]/.test(contraseña);

        if (hasUpperCase && hasNumber && hasSpecialChar) {
            if (contraseña.length >= 12) {
                strength = 'strength-strong';
                message = 'La contraseña es muy segura.';
            } else if (contraseña.length >= 10) {
                strength = 'strength-good';
                message = 'La contraseña es segura.';
            }  else if (contraseña.length >= 8) {
                strength = 'strength-fair';
                message = 'La contraseña es débil.';
            }
        } else {
            strength = 'strength-weak';
            message = 'La contraseña es débil. Debe incluir al menos una mayúscula, un número y un carácter especial.';
        }
    }

    setcontraseñaStrength(strength); 
    setContraseñaStatusMessage(message); 
};

    const validateForm = () => {
        let valid = true;
        const errors = {};

        if (!validatenombrecompleto(formData.nombrecompleto)) {
            errors.nombrecompleto = 'El nombre completo no debe contener caracteres especiales no permitidos.';
            valid = false;
        }

        if (!validatecedula(formData.cedula)) {
            errors.cedula = 'El número de documento debe ser estrictamente un número.';
            valid = false;
        }

        if (!validateEmail(formData.email)) {
            errors.email = 'Ingrese un correo electrónico válido.';
            valid = false;
        }

        if (!validatecelular(formData.celular)) {
            errors.celular = 'Ingrese un número de teléfono válido.';
            valid = false;
        }

        if (!validateusuario(formData.usuario)) {
            errors.usuario = 'El nombre de usuario no debe contener caracteres especiales.';
            valid = false;
        }

        if (!validatecontraseña(formData.contraseña)) {
            errors.contraseña = 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un carácter especial.';
            valid = false;
        }

        if (formData.contraseña !== formData.contraseñaconfirmacion) {
            errors.contraseñaconfirmacion = 'Las contraseñas no coinciden.';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const clearErrors = () => setErrors({});

    const validatenombrecompleto = (nombre) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
    const validatecedula = (cedula) => /^[0-9]+$/.test(cedula);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatecelular = (celular) => /^[0-9]{10}$/.test(celular);
    const validateusuario = (usuario) => /^[a-zA-Z0-9_.-]+$/.test(usuario);
    const validatecontraseña = (contraseña) => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(contraseña);

    const resetStrengthBar = () => {
        setcontraseñaStrength('');
        setContraseñaStatusMessage(''); 
    };

    return (
        <div className="formulario2">
            <h1>Registro</h1>
            <form onSubmit={handleSubmit} id="registrationForm">
              
                <label htmlFor="nombrecompleto">Nombre Completo</label>
                <input
                    required
                    type="text"
                    id="nombrecompleto"
                    name="nombrecompleto"
                    value={formData.nombrecompleto}
                    onChange={handleChange}
                    placeholder="Nombre Completo"                    
                />
                {errors.nombrecompleto && <div className="error-message">{errors.nombrecompleto}</div>}

                
                <label htmlFor="cedula">Cédula</label>
                <input
                    required
                    type="number"
                    id="cedula"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleChange}
                    placeholder="Cédula"
                    
                />
                {errors.cedula && <div className="error-message">{errors.cedula}</div>}

               
                <label htmlFor="email">Correo Electrónico</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Correo Electrónico"
                    required
                />
                {errors.email && <div className="error-message">{errors.email}</div>}

                
                <label htmlFor="usuario">Usuario</label>
                <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                    placeholder="Usuario"
                    required
                />
                {errors.usuario && <div className="error-message">{errors.usuario}</div>}

                
                <label htmlFor="contraseña">Contraseña</label>
                <input
                    type="password"
                    id="contraseña"
                    name="contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    required
                />
                {errors.contraseña && <div className="error-message">{errors.contraseña}</div>}
                
                <div className="contraseña-status-message">{contraseñaStatusMessage}</div>
                <div id="contraseñaStrength" className={`contraseña-strength ${contraseñaStrength}`}></div>
                <div className="error-message" id="contraseñaError"></div>
                
               
                <label htmlFor="contraseñaconfirmacion">Confirme la Contraseña</label>
                <input
                    type="password"
                    id="contraseñaconfirmacion"
                    name="contraseñaconfirmacion"
                    value={formData.contraseñaconfirmacion}
                    onChange={handleChange}
                    placeholder="Confirme la Contraseña"
                    required
                />
                {errors.contraseñaconfirmacion && <div className="error-message">{errors.contraseñaconfirmacion}</div>}

                
                <label htmlFor="celular">Celular</label>
                <input
                    type="number"
                    id="celular"
                    name="celular"
                    value={formData.celular}
                    onChange={handleChange}
                    placeholder="Celular"
                    required
                />
                {errors.celular && <div className="error-message">{errors.celular}</div>}

                <button type="submit" id="registrarse">Registrarse</button>
            </form>
                <br />
            <Link to="/">
                <button type="button" id="Regresar">Regresar</button>
            </Link>
        </div>
    );
}

export default RegistrationForm;
