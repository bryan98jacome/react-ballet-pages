import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import AuthProvider from "../components/authProvider";
import { getCompras, getCurso, getNivel } from "../firebase/firebase";

export default function MisCursos() {

    const fecha = new Date();

    const navigate = useNavigate();

    const [state, setState] = useState(0);
    const [typeCompra, setTypeCompra] = useState(0);
    const [currentUser, setcurrentUser] = useState({});
    const [compras, setCompras] = useState([]);
    const [cursos, setCursos] = useState({});
    const [idNiveles, setIdNiveles] = useState([]);
    const [niveles, setNiveles] = useState([]);
    const resTmp = [];

    async function handledUserLoggedIn(user) {
        setcurrentUser(user);
        await getData(user);
        setState(6);
    }

    function handleUserNotRegistered(user) {
        setState(3);
        navigate("../");
    }

    function handleUserNotLoggedIn() {
        setState(4);
        navigate("../");
    }

    async function getData(user) {
        const res = await getCompras(user.uid);
        setCompras([...res]);
        res.map(async (curso) => {
            const resCurso = await getCurso(curso.cursoId);
            const resNiveles = curso.cursoId;
            setIdNiveles([...resNiveles]);
            if (resCurso !== undefined) {
                setCursos({ ...resCurso }); setTypeCompra(1);
            } else {
                const resCurso = await getCurso('82f45f19-e930-467d-a791-e8bbde2a6b57');
                setCursos({ ...resCurso });
            }
        });
    }

    useEffect(() => {
        getNivelesData()
    }, [idNiveles]);

    function getNivelesData() {
        idNiveles.map(async id => {
            //console.log(id);
            const resNivel = await getNivel(id);
            if (resNivel !== undefined) {
                resTmp.push(resNivel);
                setNiveles([...resTmp]);
            }
        });
        console.log(resTmp);
    }

    function getDias(fechaCompra) {
        //Aqui poner la fecha de compra de la base de datos 
        let fecha1 = new Date(fechaCompra);
        //Aqui poner la fecha Actual 
        let fecha2 = new Date(fecha);
        //Calculamos los dias transcurridos 
        let miliSegDia = 24 * 60 * 60 * 1000;
        let miliSegTrans = Math.abs(fecha1.getTime() - fecha2.getTime());
        let diasTrans = Math.round(miliSegTrans / miliSegDia);

        return diasTrans

    }

    function renderCursos() {
        if (compras.length > 0) {
            return (compras.map((curso) => {
                let dias = getDias(curso.fechaCompra);
                if (dias < 365) {
                    return (
                        <div
                            className="view-curso"
                            key={curso.cursoId}
                            onClick={(e) => { clickCurso(cursos.id) }}
                        >
                            <div>
                                <h2>{cursos.name}</h2>
                                <p>{cursos.descripcion}</p>
                            </div>
                            <img src={cursos.photo} />
                        </div>
                    );
                }
            }));
        } else { return (<strong>No tienes ningun curso disponible</strong>); }

    }

    function clickCurso(e) {
        navigate(`../curso-niveles/${e}`);
    }

    function renderNiveles() {
        if (niveles.length > 0) {
            //ordenar array niveles 
            niveles.sort((a, b) => {
                if (a.order > b.order) {
                    return 1;
                }
                if (a.order < b.order) {
                    return -1;
                }
                return 0;
            });
            let dias = getDias(compras[0].fechaCompra);
            return (niveles.map((nivel) => {
                if (dias < 365) {
                    return (
                        <div
                            className="view-curso"
                            key={nivel.Id}
                            onClick={(e) => { clickNivel(nivel.id) }}
                        >
                            <div>
                                <h2>{nivel.name}</h2>
                                <p>{cursos.descripcion}</p>
                            </div>
                            <img src={cursos.photo} />
                        </div>
                    );
                }
            }));
        } else { return (<strong>No tienes ningun curso disponible</strong>); }
    }

    function clickNivel(id) {
        alert(id);
    }

    if (state === 6) {
        return (
            <main className="main-misCursos">
                <section className="section-misCursos">
                    <h2>Mis cursos</h2>
                    <div className="divCursos-misCursos">
                        {typeCompra === 1 ? renderCursos() : renderNiveles()}
                    </div>
                </section>
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