import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import AuthProvider from "../components/authProvider";
import { getCurso, getNivel, getPaso, getPasosNivel, getPasosUnidad, getUnidades } from "../firebase/firebase";

export default function CursoUnidades() {

    let { idnivel } = useParams();

    const navigate = useNavigate();

    const [state, setState] = useState(0);
    const [currentUser, setcurrentUser] = useState({});
    const [unidades, setUnidades] = useState([]);
    const [pasos, setPasos] = useState([]);
    const [curso, setCurso] = useState({});
    const [nivel, setNivel] = useState({});

    async function handledUserLoggedIn(user) {
        setcurrentUser(user);
        if (user.rol === "administrador") {
            setState(6);
            getData();
        } else {
            navigate("../");
        }
    }

    function handleUserNotRegistered(user) {
        setState(3);
        navigate("../");
    }

    function handleUserNotLoggedIn() {
        setState(4);
        navigate("../");
    }

    async function getData() {
        const res = await getCurso('5e3e910f-78d6-4e5a-9117-71b8e16fb962');
        setCurso(res);
        const resNivel = await getNivel(idnivel);
        setNivel(resNivel);
        const resUnidades = await getUnidades('5e3e910f-78d6-4e5a-9117-71b8e16fb962');
        setUnidades([...resUnidades]);
        const resPasos = await getPasosNivel(idnivel);
        setPasos([...resPasos]);
    }

    function renderUnidades() {
        //ordenar array unidades 
        unidades.sort((a, b) => {
            if (a.order > b.order) {
                return 1;
            }
            if (a.order < b.order) {
                return -1;
            }
            return 0;
        });

        if (unidades.length > 0) {
            return unidades.map((unidad) => (
                <li key={unidad.id}>

                    <a data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                        <i className="fs-4 bi-speedometer2">
                            <span className="ms-1 d-none d-sm-inline span-title">{unidad.name}</span>
                        </i>
                    </a>
                    <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                        {renderPasos(unidad.id)}
                    </ul>
                </li>
            ));
        }
    }

    function renderPasos(idunidad) {
        if (pasos.length > 0) {
            //ordenar array pasos 
            pasos.sort((a, b) => {
                if (a.order > b.order) {
                    return 1;
                }
                if (a.order < b.order) {
                    return -1;
                }
                return 0;
            });

            return pasos.map((paso) => (
                <div key={paso.id}>
                    {paso.idunidad == idunidad ?
                        <li key={paso.id} className="w-100">
                            <a href="#" className="nav-link px-0"><span className="d-none d-sm-inline span-title">{paso.name}</span></a>
                        </li> :
                        <></>
                    }
                </div>
            ));
        } else {
            return (<div></div>);
        }

    }

    if (state === 6) {
        return (
            <main>
                <div className="container-fluid">
                    <div className="row flex-nowrap ">
                        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-color scroll">
                            <div className="d-flex flex-column align-items-center px-3 pt-2 text-white min-vh-100">
                                <h1 className="fs-5 d-none d-sm-inline span-title">{nivel.name}</h1>
                                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                    {renderUnidades()}
                                </ul>
                            </div>
                        </div>
                        <div className="col py-3 cursoNiveles">
                            <h2>{nivel.name}</h2>
                        </div>
                    </div>
                </div>
            </main>
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