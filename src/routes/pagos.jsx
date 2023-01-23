import eeuuImg from '../img/estados-unidos.png';
import cursoImg from '../img/BALLET TEACHER ACADEMY.jpg';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
//import React from "react";
//import ReactDOM from "react-dom"
//const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function Pagos() {

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "5.00",
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function(detalles){console.log("AQUIIIIIIIII"+detalles)});
    };

    return (
        <main className="main-pagos">
            <section className='sec-pagos'>
                <div className='div1-pagos'>
                    <img src={cursoImg} alt="imagen-logo" />
                </div>
                <div className='div2-pagos'>
                    <h2>Metodología Cubana de Ballet</h2>
                    <div className="divPrecio-opcionCompra">
                        <img src={eeuuImg} alt="Foto de Estados Unidos" />
                        <strong>$50</strong>
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