import React, { useEffect, useState } from 'react';
import { getInfo } from '../api/groups.api';
import { jwtDecode } from "jwt-decode";
import { Link, Route, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../assets/logo-essalud-blanco.svg';
import Img from '../assets/hero-img.svg';
import { Container, Navbar, Nav, NavDropdown, Row, Col, Card } from 'react-bootstrap';
import 'aos/dist/aos.css';
import AOS from 'aos';

export function MenuPage() {
    const [grupos, setGrupos] = useState([]);
    const [reportes, setReportes] = useState([]);
    const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
    const [grupoExpandido, setGrupoExpandido] = useState(null);
    const [usuario, setUsuario] = useState('');
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        AOS.init();
        const expirationTime = localStorage.getItem('expirationTime');
        if (expirationTime) {
            const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

            if (currentTime > expirationTime) {
                toast('Sesión expirada', {
                    icon: '👏',
                });
                // El token ha expirado, cierra sesión
                handleLogout();
            }
        }
        const fetchInfo = async () => {
            try {
                const response = await getInfo();
                setGrupos(response.data.groups);
                setReportes(response.data.reports);
            } catch (error) {
                console.error('Error al obtener la información:', error);
            }
        };

        fetchInfo();
        const token = localStorage.getItem('access');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsuario(decodedToken.username);
        }
    }, []);

    const toggleGrupo = (grupoId) => {
        setGrupoExpandido(grupoId === grupoExpandido ? null : grupoId);
        setReporteSeleccionado(null);
    };
    const handleLogout = () => {
        // Lógica para cerrar sesión, por ejemplo, eliminar el token y redirigir al inicio de sesión
        localStorage.removeItem('access');
        localStorage.removeItem('expirationTime');
        // Redirige al inicio de sesión u otra página
        toast.success("Sesión terminada");
        navigate("/login");
    };

    return (
        <Container fluid className='p-0'>
            <Container fluid className='p-0'>
                <Navbar fixed="true" style={{ backgroundColor: "#0064AF", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }} data-bs-theme="dark">
                    <Container fluid className='mx-5 px-5 py-2'>
                        <Col className='col-auto me-auto'>
                            <Navbar.Brand href="#home">
                                <img
                                    src={Logo}

                                    className="d-inline-block align-top img-fluid"
                                    alt="React Bootstrap logo"
                                />
                            </Navbar.Brand>
                        </Col>
                        <Col className='col-auto'>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav>
                                    <NavDropdown title="User" id="basic-nav-dropdown" className="text-white">
                                        <NavDropdown.Item href="#action/3.1">Cerrar sesión</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Col>
                    </Container>
                </Navbar>
            </Container>
            <Container fluid fixed="true" style={{ backgroundColor: "#0064AF" }}>
                <Row className='px-5 py-2 d-flex align-items-center justify-content-center'>
                    <Col xs={12} md={8} className='p-5 text-white' data-aos="fade-in">
                        <h2>Sistema de Analítica <span>de Datos</span></h2>
                        <p className='d-none d-sm-block'>Sistema institucional de ESSALUD que pone a disposición los tableros de mando y control desarrollados con business inteligence y business analytics para la toma de decisiones en el marco del gobierno de datos.</p>
                    </Col>
                    <Col xs={12} md={4} className='px-5 py-2'>
                        <img src={Img} className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="100" />
                    </Col>
                </Row>
            </Container>
            <Container fluid fixed style={{ backgroundColor: "#f0f0f0" }}>
                <Row className='d-flex align-items-center justify-content-center py-3'>
                    <Col xs={12} data-aos="fade-up">
                        <h2 style={{ position: "relative", textAlign: "center" }}>
                            Nuestros Dashboards
                            <span
                                style={{
                                    content: "",
                                    position: "absolute",
                                    display: "block",
                                    width: "100px",
                                    height: "3px",
                                    background: "#0064AF",
                                    left: 0,
                                    right: 0,
                                    bottom: "-15px",
                                    margin: "auto",
                                }}
                            ></span>
                        </h2>
                    </Col>
                </Row>
                <Row className='d-flex align-items-center justify-content-center py-3 px-5' data-aos="fade-up" data-aos-delay="100">
                <Col xs={6} md={3}>
  <Card
    border="light"
    className="p-2 m-3 custom-card"
  >
    <div className="icon-container">
      <div className="icon">
        <i className="bi bi-easel"></i>
        <div className="hover-circle"></div>
      </div>
    </div>

    <Card.Body className="d-flex flex-column align-items-center">
      <Card.Title className="card-title">Card Title</Card.Title>
      <Card.Link href="#">Ir al reporte</Card.Link>
    </Card.Body>
  </Card>
</Col>

<style>{`
  .custom-card .icon-container:hover .icon i {
    color: #0064AF !important;
  }

  .custom-card .icon-container:hover .icon .hover-circle {
    background: #0064AF !important;
  }

  .custom-card .icon-container:hover .card-title {
    border-bottom: 2px solid #0064AF !important;
  }
  `}
</style>

                    
                </Row>
            </Container>

        </Container>
    );
}
