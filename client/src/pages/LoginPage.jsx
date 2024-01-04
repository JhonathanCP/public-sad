import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import { toast } from "react-hot-toast";
import '../assets/css/estilos.css';
import '../assets/css/estilos-responsive.css';
import logo from '../assets/img/logo-essalud.svg';
import { jwtDecode } from "jwt-decode";
import ReCaptcha from 'react-google-recaptcha';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    });
    const [capVal, setCapVal] = useState(null)

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        return () => {
          // Cleanup: remove the script when the component unmounts
            document.head.removeChild(script);
        };
    }, []);

    const handleLogin = async () => {

        if (!capVal) {
            toast.error("Por favor, completa la validación reCAPTCHA.");
            return;
        }

        try {
            const response = await login(credentials);
            const accessToken = response.data.token;
            const expirationTime = jwtDecode(accessToken).exp;
            localStorage.setItem("access", accessToken);
            localStorage.setItem("expirationTime", expirationTime);
            console.log(accessToken);
            toast.success("Sesión iniciada correctamente.");
            navigate("/panel");
        } catch (error) {
            setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
            console.log("Credenciales incorrectas. Por favor, inténtalo de nuevo.")
            toast.error("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        }
    }

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <section className="login ">
            <div className="section-flex">
                <article className=" w-60" >
                    <div className="t-l descripcion">
                        <h1 className="titulo1">Plataforma de análisis de datos</h1>
                        <p>Sistema institucional de ESSALUD que pone a disposición los tableros de mando y control desarrollados con business inteligence y business analytics para la toma de decisiones en el marco del gobierno de datos.</p>
                    </div>

                </article>
                <article className=" w-40">
                    <div className="t-c">
                        <form name="login" className="cuadro-blanco-2 ">
                            <img src={logo} />
                            <label>Usuario</label>
                            <input
                                name="username"
                                type="text"
                                className="input"
                                value={credentials.username}
                                onChange={handleChange}
                                size="20"
                            />
                            <label>Contraseña</label>
                            <input
                                name="password"
                                type="password"
                                className="input"
                                value={credentials.password}
                                onChange={handleChange}
                                size="20"
                            />
                            <ReCaptcha
                            sitekey='6LdUDUUpAAAAAIE8lacUmssT1j4DCmY0PzVSTKGB'
                            onChange={(val) => setCapVal(val)}></ReCaptcha>
                            <input
                                value="Entrar"
                                type="button"
                                className="estilo1"
                                onClick={handleLogin}
                            />
                        </form>
                        {/* <a href="#">¿Olvidaste tu nombre de usuario o contraseña?</a> */}
                    </div>
                </article>
            </div>
        </section>
    );
};

export default LoginPage;