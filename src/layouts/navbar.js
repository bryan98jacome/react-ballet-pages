import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import logo from '../img/BALLET TEACHER ACADEMY.jpg';
import userProfile from '../img/user.png';
import { useState } from "react";

import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { logout } from "../firebase/firebase";

export default function NavegationBar() {

    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setcurrentUser] = useState({});
    const [dropdown, setDropdown] = useState(false);

    function handledUserLoggedIn(user) {
        setcurrentUser(user);;
        setState(6);
    }

    function handleUserNotRegistered(user) {
        setState(3);
    }

    function handleUserNotLoggedIn() {
        setState(4);
    }

    async function cerrarSesion() {
        await logout();
        setState(4);
        setDropdown(!dropdown);
        navigate('../');
    }

    const abrirCerrarDropdown = () => {

    }

    function clickDropdown() {
        setDropdown(!dropdown);
    }

    function clickContinueL() {
        navigate('../react-ballet-pages/login');
    }

    function clickContinueS() {
        navigate('../react-ballet-pages/signup');
    }

    function clickAdminCuenta() {
        setDropdown(!dropdown);
        navigate('../react-ballet-pages/administrar-cuenta');
    }

    function clickAdminWeb(){
        setDropdown(!dropdown);
        navigate('../react-ballet-pages/administrar-web');
    }

    function clickMiscursos(){}

    if (state == 6) {
        return (
            <>
                <Navbar className="navBar" collapseOnSelect expand="lg" bg="sure" variant="sure">
                    <Container>
                            <img className="logo" src={logo} height="80" width="80" onClick={cerrarSesion} />
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="../react-ballet-pages/cursos">Cursos</Nav.Link>
                                <Nav.Link as={Link} to="../react-ballet-pages/metodologia">Metodología</Nav.Link>
                                <Nav.Link as={Link} to="../react-ballet-pages/docentes">Docentes</Nav.Link>
                            </Nav>
                            <Nav> 
                                <Dropdown className="dropdown" isOpen={dropdown} toggle={abrirCerrarDropdown}>
                                    <DropdownToggle className="dropdownbutton" >
                                        {
                                            currentUser.profilePicture == null ?
                                                <img src={userProfile} onClick={clickDropdown} /> :
                                                <img src={currentUser.profilePicture} onClick={clickDropdown} />
                                        }
                                    </DropdownToggle>

                                    <DropdownMenu>
                                        <div className="div-imageProfile">
                                            {
                                                currentUser.profilePicture == null ?
                                                    <img src={userProfile} onClick={clickDropdown} /> :
                                                    <img src={currentUser.profilePicture} onClick={clickDropdown} />
                                            }
                                        </div>
                                        <div className="div-dataUser">
                                            <h1>{currentUser.username}</h1>
                                            <p>{currentUser.email}</p>
                                        </div>
                                        <div className="div-buttonDropdown">
                                            <button className="button-cuenta" onClick={clickAdminCuenta}>Administrar tu cuenta</button>
                                        </div>
                                        <div className="div-buttonDropdown">
                                            <button className="button-cuenta" onClick={clickMiscursos}>Mis cursos</button>
                                        </div>
                                        {
                                            currentUser.rol == "administrador" ?
                                                <div className="div-buttonDropdown">
                                                    <button className="button-cuenta" onClick={clickAdminWeb}>Administrar Web</button>
                                                </div>
                                                :
                                                <></>
                                        }
                                        <div className="div-buttonDropdown">
                                            <button className="button-cerrar" onClick={cerrarSesion}>Cerrar sesión</button>
                                        </div>
                                    </DropdownMenu>
                                </Dropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <section>
                    <Outlet></Outlet>
                </section>
            </>
        );
    }

    if (state == 3 || state == 4) {
        return (<>
            <Navbar className="navBar" collapseOnSelect expand="lg" bg="sure" variant="sure">
                <Container>
                    <Navbar.Brand className="logo" as={Link} to="/">
                        <img className="logo" src={logo} height="80" width="80" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/academia">Academia</Nav.Link>
                            <Nav.Link as={Link} to="/cursos">Cursos</Nav.Link>
                            <Nav.Link as={Link} to="/metodologia">Metodología</Nav.Link>
                            <Nav.Link as={Link} to="/docentes">Docentes</Nav.Link>
                        </Nav>
                        <Nav>
                            <button className="login" onClick={clickContinueL}>Login</button>
                            <button className="register" onClick={clickContinueS}>Sign Up</button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <section>
                <Outlet></Outlet>
            </section>
        </>
        );
    }

    return (
        <AuthProvider
            onUserLoggedIn={handledUserLoggedIn}
            onUserNotRegistered={handleUserNotRegistered}
            onUserNotLoggedIn={handleUserNotLoggedIn}
        >
        </AuthProvider>
    );
}