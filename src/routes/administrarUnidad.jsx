import AuthProvider from "../components/authProvider";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePaso, deleteUnidad, getPasosUnidad, getUnidad } from "../firebase/firebase";
import swal from "sweetalert";

export default function AdministrarUnidad() {

    let { idunidad } = useParams();

    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setcurrentUser] = useState({});
    const [unidad, setUnidad] = useState({});
    const [pasos, setPasos] = useState([]);

    function handledUserLoggedIn(user) {
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
        const res = await getUnidad(idunidad);
        setUnidad(res);

        const resPasos = await getPasosUnidad(idunidad);
        setPasos([...resPasos]);
    }

    function renderPasos() {
        if (pasos.length > 0) {
            return pasos.map((paso) => (
                <div
                    className="view-paso"
                    key={paso.id}
                >
                    <h1>{paso.name}</h1>
                    <div>
                        <video controls> <source src={paso.video} /> </video>
                    </div>
                    <h3>Descripción</h3>
                    <div> <p>{paso.paso}</p> </div>
                    <div className="botones">
                        <button type="submit" className="btn btn-primary" onClick={e => (editPaso(paso.id))}>Editar</button>
                        <button className="btn btn-primary btnred btnDelete" onClick={e => (eliminarPaso(paso.id))}>Eliminar Paso</button>
                    </div>
                </div>
            ));
        }
    }

    function clickDeleteUnidad() {
        swal({
            title: "¿Está seguro?",
            text: "Una vez eliminado esta unidad, ¡no podrá recuperarlo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                /* Eliminar los pasos de la unidad */
                eliminarPasos();
                /* Eliminar la unidad */
                await deleteUnidad(unidad.id);
                //eliminarUnidades();

                swal(`¡La unidad ${unidad.name} ha sido eliminado!`, {
                    icon: "success",
                });
                /* Redirigir a la pagina anterior */
                navigate(`../administrar-nivel/${unidad.idNivel}`);
            } else {
                swal(`¡La unidad ${unidad.name} está a salvo!`);
            }
        });
    }

    function eliminarPasos() {
        pasos.map(async (paso) => (
            await deletePaso(paso.id)
        ));
    }

    async function eliminarPaso(idPaso) {
        swal({
            title: "¿Está seguro?",
            text: "Una vez eliminado este paso, ¡no podrá recuperarlo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                await deletePaso(idPaso);
                getData();

                swal(`¡El paso ha sido eliminado!`, {
                    icon: "success",
                });
            } else {
                swal(`¡El paso está a salvo!`);
            }
        });
    }

    function editPaso(uuid) {
        navigate(`../editar-paso/${uuid}`);
    }

    if (state == 6 && currentUser.rol === "administrador") {
        return (
            <main className="admin-nivel">
                <h2>{unidad.name}</h2>
                <section>
                    <div className="div-addPaso">
                        {renderPasos()}
                    </div>
                </section>

                <div className="div-deleteCurso">
                    <button className="btn btn-primary btnred btnDelete" onClick={clickDeleteUnidad}>Eliminar Unidad</button>
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