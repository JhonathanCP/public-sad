import React, { useEffect, useState } from 'react';
import { getInfo } from '../api/groups.api';
import { jwtDecode } from "jwt-decode";
import { Link, Route, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../assets/logo-essalud-blanco.svg';
import Img from '../assets/hero-img.svg';
import { Container, Navbar, Nav, NavDropdown, Row, Col, Button, Offcanvas } from 'react-bootstrap';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useParams } from 'react-router-dom';

export function DashboardPage() {

    const { id } = useParams();
    const [col2Visible, setCol2Visible] = useState(true);
    const toggleCol2Visibility = () => {
        setCol2Visible(!col2Visible);
    };

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
                const filteredReportes = response.data.reports.filter(report => report.groupId == id);
                setReportes(filteredReportes);
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
            {/* Container superior */}
            <Container fluid className='p-0'>
                {/* Navbar */}
                <Navbar fixed="true" style={{ backgroundColor: "#0064AF", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }} data-bs-theme="dark">
                    <Container fluid className='py-0'>
                        <Col className='col-auto me-auto mx-2 px-2'>
                            <Button onClick={toggleCol2Visibility} className='mx-4' style={{ backgroundColor: "#0064AF", borderColor: "#0064AF"}}><i className='bi bi-list'></i></Button>
                            <Navbar.Brand href="#home">
                                <img
                                    src={Logo}
                                    className="d-inline-block align-top img-fluid"
                                    alt="React Bootstrap logo"
                                    style={{width: "142.5px", height: "30.98px"}}
                                />
                            </Navbar.Brand>
                        </Col>
                        <Col className='col-auto ms-auto mx-5 px-5'>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav>
                                    <NavDropdown className="text-white" title={usuario} id="basic-nav-dropdown">
                                        <NavDropdown.Item style={{ position: "relative", textAlign: "center", width: "10px" }} onClick={() => handleLogout()}>Cerrar sesión</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Col>
                    </Container>
                </Navbar>
            </Container>

            {/* Container del medio ocupando todo el espacio vertical */}
            <Container fluid style={{ backgroundColor: "#f0f0f0" }}>
                <Row className="p-0" style={{ minHeight: '100vh' }} data-aos="fade-right" data-aos-delay="250">
                    <Col xs={2} style={{ backgroundColor: "#0064AF" }} className={`${col2Visible ? '' : 'd-none'}`} >
                        <ul>
                        {reportes.map((reporte) => (<li>{reporte.nombre}</li>))}
                        </ul>
                    </Col>
                    <Col xs={10} className="p-0 m-0">
                        <iframe src="https://app.powerbi.com/view?r=eyJrIjoiMzE1OWZjOTMtOGU5MS00MWMxLWJiZjEtODBkOTNkYzcxMWYzIiwidCI6IjM0ZjMyNDE5LTFjMDUtNDc1Ni04OTZlLTQ1ZDYzMzcyNjU5YiIsImMiOjR9" frameBorder="0" style={{ width: '100%', height: '100%' }}></iframe>
                    </Col>
                </Row>
            </Container>

            {/* Container inferior */}
            <Container fluid style={{ backgroundColor: "#0064AF" }}>
                <Row className='d-flex align-items-center justify-content-center py-1' >
                    <div className="text-center">
                        <div className="pt-0 text-white">
                            &copy; Copyright <strong><span>GCTIC - ESSALUD</span></strong>. Todos los derechos reservados
                        </div>
                        <div className="pt-0 text-white">Desarrollado por GCTIC</div>
                    </div>
                </Row>
            </Container>
        </Container>

    );
}
