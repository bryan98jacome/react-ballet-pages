import { useNavigate } from 'react-router-dom';
import eeuuImg from '../img/estados-unidos.png';
import cursoImg from '../img/BALLET TEACHER ACADEMY.jpg';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useParams } from 'react-router-dom';
import swal from "sweetalert";

export default function Pagos() {

    let { valor, id } = useParams();
    const fecha = new Date();
    const navigate = useNavigate();

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
        //Generar un metodo para guardar los datos de la compra en firebase!!!!!!
        
        swal({
            title: "Compra realizada con exito!",
            text: "Felicidades ahora puedes empezar tu curso!",
            icon: "success",
            button: "OK",
        });
        navigate(`../mis-cursos`);
        return actions.order.capture();
    };

    return (
        <main className="main-pagos">
            <section className='sec-pagos'>
                {console.log(fecha.toISOString())}
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