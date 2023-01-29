import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthProvider from "../components/authProvider";
import { getCursos } from "../firebase/firebase";

export default function MisCursos() {

    const fecha = new Date();

    const navigate = useNavigate();

    const [state, setState] = useState(0);
    const [currentUser, setcurrentUser] = useState({});
    const [cursos, setCursos] = useState([]);

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
        const res = await getCursos('82f45f19-e930-467d-a791-e8bbde2a6b57');
        setCursos([...res]);
    }

    function getDias() {
        //Aqui poner la fecha de compra de la base de datos 
        let fecha1 = new Date(fecha.toISOString());
        //Aqui poner la fecha Actual 
        let fecha2 = new Date('01/29/2023');
        //Calculamos los dias transcurridos 
        let miliSegDia = 24 * 60 * 60 * 1000;
        let miliSegTrans = Math.abs(fecha1.getTime() - fecha2.getTime());
        let diasTrans = Math.round(miliSegTrans / miliSegDia);
        return diasTrans
    }

    function renderCursos() {
        let dias = getDias();
        if (dias < 365) {
            if (cursos.length > 0) {
                return cursos.map((curso) => (
                    <div
                        className="view-curso"
                        key={curso.id}
                        onClick={(e) => { clickCurso(curso.id) }}
                    >
                        <div>
                            <h2>{curso.name}</h2>
                            <p>{curso.descripcion}</p>
                        </div>
                        <img src={curso.photo} />
                    </div>
                ));
            }
        } else {
            //Aqui poner un metodo para eliminar la compra de la base de datos 
            return <strong>Suscribete en un curso</strong>
        }

    }

    function clickCurso(e) {
        navigate(`../curso-niveles/${e}`);
    }

    if (state === 6) {
        return (
            <main className="main-misCursos">
                <section className="section-misCursos">
                    <h2>Mis cursos</h2>
                    <div className="divCursos-misCursos">
                        {renderCursos()}
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