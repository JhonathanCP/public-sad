import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import ReCaptcha from 'react-google-recaptcha';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Card, Col, Form, FormGroup, FormControl, FormLabel, Button, Container, Image } from 'react-bootstrap';
import FondoSvg from '../assets/fondo.svg'
import Logo from '../assets/logo-essalud.svg'

export function LoginPage() {
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

    const handleLogin = async (e) => {
        e.preventDefault();
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
            toast.success("Sesión iniciada correctamente.");
            navigate("/menu");
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
        <Container style={{ background: `url(${FondoSvg}) center fixed`, backgroundSize: 'cover', minHeight: '100vh' }} fluid className="d-flex align-items-center justify-content-center">
            <Row>
            <Col lg={7} md={6} xs={12} className="d-flex justify-content-center align-items-center p-5">
                <div className='text-white'>
                    <h1>Sistema de analítica de datos</h1>
                    <p className='d-none d-sm-block'>Sistema institucional de EsSalud que pone a disposición los tableros de mando y control desarrollados con business intelligence y business analytics para la toma de decisiones en el marco del gobierno de datos.</p>
                </div>
            </Col>
            <Col lg={5} md={6} xs={12} className="d-flex justify-content-center align-items-center">
                <Card className='p-4'>
                    <Form onSubmit={handleLogin}>
                        <div className="text-center mb-4">
                            <Image src={Logo} alt="Logo" />
                        </div>

                        <FormGroup controlId="username" className="mb-3">
                            <FormLabel>Usuario</FormLabel>
                            <FormControl
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup controlId="password" className="mb-3">
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <ReCaptcha
                            sitekey='6LdUDUUpAAAAAIE8lacUmssT1j4DCmY0PzVSTKGB'
                            onChange={(val) => setCapVal(val)}
                        />

                        <Button variant="primary" type="submit" onClick={handleLogin} className="w-100 mt-3">
                            Entrar
                        </Button>
                    </Form>
                </Card>
            </Col>
            </Row>
        </Container>
    );
};