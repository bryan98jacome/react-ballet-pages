import eeuuImg from '../img/estados-unidos.png';

export default function OpcionCompra() {
    return (
        <main className="main-opcionCompra">
            <section className="opciones-opcionCompra">
                <div className="divOpcion-opcionCompra">
                    <div className="divTop-opcionCompra">
                        <h3>Curso completo</h3>
                        <div className="divAnual-opcionCompra"><strong>ANUAL</strong></div>
                    </div>
                    <div className="divSvg-opcionCompra">
                        <p>1 Estudiante</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        </svg>
                    </div>
                    <hr color="#C6AAC8" size={1} width="100%" />
                    <div className="divPrecio-opcionCompra">
                        <img src={eeuuImg} alt="Foto de Estados Unidos" />
                        <strong>$150</strong>
                        <p>/año</p>
                    </div>
                    <button className='btn-opcionCompra'>Suscríbete ahora</button>
                    <ul className='ul-opcionCompra'>
                        <li><p>Certificado al finalizar</p></li>
                        <li><p>Curso 100% en linea</p></li>
                        <li><p>Cronograma flexible</p></li>
                        <li><p>Aprende a tu tiempo</p></li>
                    </ul>
                </div>
                <div className="divOpcion-opcionCompra">
                    <div className="divTop-opcionCompra">
                        <h3>Unidades</h3>
                        <div className="divAnual-opcionCompra"><strong>ANUAL</strong></div>
                    </div>
                    <div className="divSvg-opcionCompra">
                        <p>1 Estudiante</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        </svg>
                    </div>
                    <hr color="#C6AAC8" size={1} width="100%" />
                    <div className="divPrecio-opcionCompra">
                        <img src={eeuuImg} alt="Foto de Estados Unidos" />
                        <strong>$50</strong>
                        <p>*unidad/año</p>
                    </div>
                    <button className='btn-opcionCompra'>Suscríbete ahora</button>
                    <ul className='ul-opcionCompra'>
                        <li><p>Certificado al finalizar</p></li>
                        <li><p>Curso 100% en linea</p></li>
                        <li><p>Cronograma flexible</p></li>
                        <li><p>Aprende a tu tiempo</p></li>
                    </ul>
                </div>
            </section>
        </main>
    );
}