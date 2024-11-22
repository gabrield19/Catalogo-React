import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './css/style_login.css';

function Login() {

    const [usuario, setusuario] = useState('');
    const [contraseña, setcontraseña] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {

        event.preventDefault();

        clearErrors();


        function clearErrors() {
            let errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(function (el) {
                el.innerText = '';
            });
        }


        alert('Inicio de sesión exitoso');
        navigate('/catalogo');
    };



    return (
        <div className="formulario" id="root">
            <h1>Inicio de Sesion</h1>
            <form onSubmit={handleSubmit} id="registrationForm">
                <div class="username">
                    <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    value={usuario}
                    onChange={(e) => setusuario(e.target.value)}
                    required
                    
                    />
                        <label htmlFor='usuario'>Nombre de Usuario</label>
                </div>

                
                <div class="username">
                    <input 
                     type="password"
                     id="contraseña"
                     name="contraseña"
                     value={contraseña}
                     onChange={(e) => setcontraseña(e.target.value)}
                     required
                      
                    />
                        <label htmlFor='contraseña'>Contraseña</label>
                </div>



                <button type="submit" class="boton-iniciar">
                    Iniciar
                </button>

            </form>
            <div class="registrarse">
                ¿No tienes cuenta? <Link to ="register">Registrate!</Link>
            </div>
        </div>

    )

}

export default Login;