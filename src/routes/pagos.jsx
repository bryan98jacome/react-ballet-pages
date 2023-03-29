import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import eeuuImg from '../img/estados-unidos.png';
import cursoImg from '../img/BALLET TEACHER ACADEMY.jpg';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useParams } from 'react-router-dom';
import swal from "sweetalert";
import { compraCurso, getCompraTemp } from '../firebase/firebase';
import AuthProvider from '../components/authProvider';

export default function Pagos() {

    let { valor, id } = useParams();
    const fecha = new Date();
    const navigate = useNavigate();

    const [state, setState] = useState(0);
    const [currentUser, setcurrentUser] = useState({});

    async function handledUserLoggedIn(user) {
        setcurrentUser(user);
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

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: valor,
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        upDateCompra(data);
        swal({
            title: "Compra realizada con exito!",
            text: "Felicidades ahora puedes empezar tu curso!",
            icon: "success",
            button: "OK",
        });
        navigate(`../mis-cursos`);
        return actions.order.capture();
    };

    async function upDateCompra(data) {
        if (id === currentUser.uid) {
            // Obtener los nombres de las propiedades del objeto
            const resCompraTemp = await getCompraTemp(currentUser.uid);
            const names = Object.keys(resCompraTemp);
            const tmp = {};
            tmp.fechaCompra = fecha.toISOString();
            tmp.orderID = data.orderID;
            tmp.cursoId = names;
            tmp.userUID = currentUser.uid;
            await compraCurso(tmp);
            console.log(tmp);
        } else {
            const tmp = {};
            tmp.fechaCompra = fecha.toISOString();
            tmp.orderID = data.orderID;
            tmp.cursoId = id;
            tmp.userUID = currentUser.uid;
            await compraCurso(tmp);
        }
    }

    if (state === 6) {
        return (
            <main className="main-pagos">
                <section className='sec-pagos'>
                    {/*console.log(fecha.toISOString())*/}
                    <div className='div1-pagos'>
                        <img src={cursoImg} alt="imagen-logo" />
                    </div>
                    <div className='div2-pagos'>
                        <h2>Metodología Cubana de Ballet</h2>
                        <div className="divPrecio-opcionCompra">
                            <img src={eeuuImg} alt="Foto de Estados Unidos" />
                            <strong>${valor}</strong>
                            <p>*unidad/año</p>
                        </div>
                        <strong>Descripción</strong>
                        <p>Curso Completo</p>
                        <ul className='ul-pagos'>
                            <li>Certificado al finalizar</li>
                            <li>Curso 100% en linea</li>
                            <li>Cronograma flexible</li>
                            <li>Aprende a tu tiempo</li>
                        </ul>
                        <strong>La compra incluye:</strong>
                        <ul className='ul-pagos'>
                            <li>Videos paso a paso</li>
                            <li>Documentación escrita</li>
                        </ul>
                        <hr color="#C6AAC8" size={1} width="100%" />
                        <div className='divPaypal-pagos'>
                            <PayPalScriptProvider options={{ "client-id": "AQzy_-hBgFVn-GfTnro7vMBnUOpnzae6y3jvz4H5HsprpBw7oQvlzaEciWzpwe3moA_Enc3l9FORJMIG" }}>
                                <PayPalButtons
                                    createOrder={(data, actions) => createOrder(data, actions)}
                                    onApprove={(data, actions) => onApprove(data, actions)}
                                />
                            </PayPalScriptProvider>
                        </div>
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