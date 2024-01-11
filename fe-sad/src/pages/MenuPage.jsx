import React, { useEffect, useState } from 'react';
import { getInfo } from '../api/groups.api';
import { jwtDecode } from "jwt-decode";
import { Link, Route, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../assets/logo-essalud-blanco.svg';
import LogoA from '../assets/logo-essalud.svg';
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

    const handleMouseEnter = (id) => {
        const newHoverState = [...isHovered];
        newHoverState[id] = true;
        setIsHovered(newHoverState);
    };

    const handleMouseLeave = (id) => {
        const newHoverState = [...isHovered];
        newHoverState[id] = false;
        setIsHovered(newHoverState);
    };

    useEffect(() => {
        AOS.init();
        const expirationTime = localStorage.getItem('expirationTime');
        if (expirationTime) {
            const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
            console.log(currentTime)
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
        console.log(expirationTime)
        
        fetchInfo();


        const token = localStorage.getItem('access');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsuario(decodedToken.username);
        }
    }, []);
    
    const [isHovered, setIsHovered] = useState(Array(grupos.length).fill(false));
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
                <Navbar fixed="true" style={{ backgroundColor: "#0064AF", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }} data-bs-theme="dark" className='p-0'>
                    <Container fluid className='mx-5 px-5 py-0'>
                        <Col className='col-auto me-auto'>
                            <Navbar.Brand href="#home">
                                <img
                                    src={Logo}
                                    style={{width: "140.5px", height: "29.98px"}}
                                    className="d-inline-block align-top img-fluid"
                                    alt="React Bootstrap logo"
                                />
                            </Navbar.Brand>
                        </Col>
                        <Col className='col-auto ms-auto'>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav>
                                    <NavDropdown className="text-white" title={usuario} id="basic-nav-dropdown" >
                                        <NavDropdown.Item style={{ position: "relative", textAlign: "center", width: "10px" }} onClick={() => handleLogout()}>Cerrar sesión</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Col>
                    </Container>
                </Navbar>
            </Container>
            <Container fluid fixed="true" style={{ backgroundColor: '#0064AF' }}>

                <Row className='px-5 py-5 d-flex align-items-center justify-content-center'>
                    <Col xs={12} md={12} xl={7} className='p-5 text-white ' data-aos="fade-in" data-aos-delay="250">
                        <h2 className='d-xl-none text-center'>Sistema de Analítica <span>de Datos</span></h2>
                        <h2 className='d-none d-xl-block'>Sistema de Analítica <span>de Datos</span></h2>
                        <p className='d-none d-md-block d-xl-none text-center'>Sistema institucional de ESSALUD que pone a disposición los tableros de mando y control desarrollados con business intelligence y business analytics para la toma de decisiones en el marco del gobierno de datos.</p>
                        <p className='d-none d-xl-block'>Sistema institucional de ESSALUD que pone a disposición los tableros de mando y control desarrollados con business intelligence y business analytics para la toma de decisiones en el marco del gobierno de datos.</p>

                    </Col>
                    <Col xs={12} md={12} xl={5} className='px-5 py-0 d-flex align-items-center justify-content-center'>
                        <img src={Img} className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="250" />
                    </Col>
                </Row>
            </Container>

            <Container fluid fixed="true" style={{ backgroundColor: "#f0f0f0" }}>
                {/* <Row className='d-flex align-items-center justify-content-center py-2' style={{ minHeight: '15vh' }}>
                    <Col xs={12} data-aos="fade-up" data-aos-delay="250">
                        <h2 style={{ position: "relative", textAlign: "center" }}>Nuestros Dashboards<span style={{ content: "", position: "absolute", display: "block", width: "100px", height: "3px", background: "#0064AF", left: 0, right: 0, bottom: "-15px", margin: "auto" }} ></span></h2>
                    </Col>
                </Row> */}
                <Row className='d-flex align-items-center justify-content-center py-5 px-5 mx-2' data-aos="fade-up" data-aos-delay="250">
                    {grupos.map((grupo) => (
                        <Col key={grupo.id} xs={12} sm={4} lg={3} style={{ minHeight: '25vh' }}>
                            <Card border="light" className="p-2 mx-3" onMouseEnter={() => handleMouseEnter(grupo.id)} onMouseLeave={() => handleMouseLeave(grupo.id)} style={{ position: 'relative', marginBottom: '50px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div className="icon-container" style={{ position: 'relative', margin: '0 auto', overflow: 'hidden', width: '80px', height: '80px', }} >
                                    <div className="icon" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                        <i className={`bi bi-${grupo.icono}`} style={{ color: 'black', fontSize: '56px', transition: 'ease-in-out 0.3s', zIndex: '2', position: 'absolute', }}></i>
                                        <div style={{ position: 'relative', content: '""', height: '50%', width: '50%', background: isHovered[grupo.id] ? '#0064AF' : '#eeeeee', borderRadius: '50%', zIndex: '1', top: '-20px', left: '-20px', transition: '0.3s' }} ></div>
                                    </div>
                                </div>
                                <Card.Body className="d-flex flex-column align-items-center">
                                    <Card.Title className="card-title" style={{ borderBottom: `2px solid ${isHovered[grupo.id] ? '#0064AF' : '#eeeeee'}`, transition: '0.3s', textAlign: 'center', }} >{grupo.nombre}</Card.Title>
                                    <Card.Text>
                                        <a className="link-primary link-underline-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" style={{ cursor: 'pointer', fontSize: '14px' }} onClick={() => navigate(`/dashboard/${grupo.id}`)}>
                                            Más información
                                        </a>
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Container fluid style={{ backgroundColor: "#f0f0f0" }}>
                <Row className='d-flex align-items-center justify-content-center py-0' >
                    <div className="text-center">
                        {/* <img src={LogoA} alt="Logo" style={{width: "140.5px", height: "29.98px"}} /> */}
                        <div className="py-1 text-dark">
                            &copy;2024 Copyright <strong><span>GCTIC - ESSALUD</span></strong>. Todos los derechos reservados
                        </div>
                        {/* <div className="pt-1 text-dark">Desarrollado por la GCTIC</div> */}
                    </div>
                </Row>
            </Container>
        </Container>
    );
}
