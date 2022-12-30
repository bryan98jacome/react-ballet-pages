import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import AuthProvider from "../components/authProvider";
import { getCurso, getNivel, getPaso, getPasosNivel, getPasosUnidad, getUnidades, getUnidadesNivel } from "../firebase/firebase";

export default function CursoUnidades() {

    let { idnivel } = useParams();

    const navigate = useNavigate();

    const [state, setState] = useState(0);
    const [currentUser, setcurrentUser] = useState({});
    const [unidades, setUnidades] = useState([]);
    const [pasos, setPasos] = useState([]);
    const [paso, setPaso] = useState({});
    const [curso, setCurso] = useState({});
    const [nivel, setNivel] = useState({});

    async function handledUserLoggedIn(user) {
        setcurrentUser(user);
        setState(6);
        getData();
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
        const resNivel = await getNivel(idnivel);
        setNivel(resNivel);
        const resUnidades = await getUnidadesNivel(idnivel);
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

                    <a>
                        <i>
                            <span className="span-cursoUnidades">{unidad.name}</span>
                        </i>
                    </a>
                    <ul>
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
                        <li key={paso.id} className="li-cursoUnidades">
                            <a onClick={e => (clickPaso(paso.id))}><span>{paso.name}</span></a>
                        </li> :
                        <></>
                    }
                </div>
            ));
        } else {
            return (<div></div>);
        }

    }

    async function clickPaso(idPaso) {
        const paso = await getPaso(idPaso);
        setPaso(paso);
    }

    function renderPaso() {
        if (paso.name === undefined) {
            return (<div><h2>Selecciona un paso</h2></div>);
        } else {
            return (
                <div className="div-renderPaso">
                    <h2>{paso.name}</h2>
                    <video src={paso.video} controls controlsList="nodownload"></video>
                    <h3>Indicación</h3>
                    <div className="div-pasoCursoUnidades" dangerouslySetInnerHTML={{ __html: paso.paso }} />
                </div>
            );
        }
    }

    if (state === 6) {
        return (
            <main className="main-cursoUnidad">
                <div className="divRow-cursoUnidad">
                    <section className="pasos-cursoUnidad">
                        <h1 className="h1-cursoUnidad">{nivel.name}</h1>
                        <ul className="ulPasos-cursoUnidad">
                            {renderUnidades()}
                        </ul>
                    </section>
                    <section className="videos-cursoUnidad">
                        {renderPaso()}
                    </section>
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

/*
<div className="container-fluid">
                    <div className="row flex-nowrap">
                        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-color scroll">
                            <div className="d-flex flex-column align-items-center px-3 pt-2 text-white min-vh-100">
                                <h1 className="fs-5 d-none d-sm-inline span-title">{nivel.name}</h1>
                                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                    {renderUnidades()}
                                </ul>
                            </div>
                        </div>
                        <div className="col py-3 cursoNiveles">
                            {renderPaso()}
                        </div>
                    </div>
                </div>
*/