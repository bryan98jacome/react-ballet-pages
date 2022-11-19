const Home = () => {
    return (
        <>
            <section className='sectionHome'>
                <section>
                    <section className="section-video">
                        <div className="overlay"></div>
                        <video loop autoPlay muted>
                            <source src='https://firebasestorage.googleapis.com/v0/b/metodologia-ballet.appspot.com/o/videos%2FvideoIntro.mp4?alt=media&token=da522a9c-dbf7-4ad2-8ea9-6820a20d66b7' />
                        </video>
                    </section>
                </section>
                <section className="section">
                    <div className="section-list">
                        <div className="list-contain">
                            <svg xmlns="http://www.w3.org/2000/svg" className="list-icon" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z" />
                            </svg>
                            <p>Cursos de ballet profesional, aprende tecnicas, metodologias y domina los conceptos básicos del baile.</p>
                        </div>
                        <div className="list-contain">
                            <svg xmlns="http://www.w3.org/2000/svg" className="list-icon" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M10.53 5.968h-.843v4.06h.843c1.117 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04z" />
                                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm5.396 3.001V11H6.209V8.43H3.687V11H2.5V5.001h1.187v2.44h2.522V5h1.187zM8.5 11V5.001h2.188c1.824 0 2.685 1.09 2.685 2.984C13.373 9.893 12.5 11 10.69 11H8.5z" />
                            </svg>
                            <p>Videos exclusivos con buena calidad, documentación de pasos de baile. Contenido descargable para usuarios.</p>
                        </div>
                        <div className="list-contain">
                            <svg xmlns="http://www.w3.org/2000/svg" className="list-icon" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
                                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
                            </svg>
                            <p>Consigue certificados internacionales en
                                <strong>
                                    Metodología Cubana de Ballet
                                </strong>
                                con aval del consejo internacional de la danza.
                            </p>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
}

export default Home;