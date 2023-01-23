//import logo from './logo.svg';
//import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './css/main.css';
import './css/navbar.css';
import './css/home.css';
import './css/academia.css';
import './css/cursos.css';
import './css/niveles.css';
import './css/docentes.css';
import './css/metodologia.css';
import './css/login.css';
import './css/signup.css';
import './css/chooseUsername.css';
import './css/administrarCuenta.css';
import './css/administrarWeb.css';
import './css/administrarDocente.css';
import './css/administrarCurso.css';
import './css/administrarNivel.css';
import './css/administrarUnidad.css';
import './css/editPaso.css';
import './css/chooseDocente.css';
import './css/cursoNiveles.css';
import './css/cursoUnidades.css';
import './css/chooseCurso.css';
import './css/misCursos.css';
import './css/opcionCompra.css';
import './css/nivelesCompra.css';
import './css/pagos.css';
import './css/footer.css';

import Cursos from './routes/cursos';
import Niveles from './routes/niveles';
import Academia from './routes/academia';
import Home from './routes/home';
import Metodologia from './routes/metodologia';
import Docentes from './routes/docentes';
import LogIn from './routes/login';
import SignUp from './routes/signup';
import ChoosUsernameView from './routes/chooseUsername';
import AdministrarCuenta from './routes/administrarCuenta';
import AdministrarWeb from './routes/administrarWeb';
import ChoosDocente from './routes/chooseDocente';
import AdministrarDocente from './routes/administrarDocente';
import ChoosCurso from './routes/chooseCurso';
import AdiministrarCurso from './routes/administrarCurso';
import AdministrarNivel from './routes/administrarNivel';
import AdministrarUnidad from './routes/administrarUnidad';
import EditPaso from './routes/editPaso';
import CursoNiveles from './routes/cursoNiveles';
import CursoUnidades from './routes/cursoUnidades';
import MisCursos from './routes/misCursos';
import OpcionCompra from './routes/opcionCompra';
import NivelesCompra from './routes/nivelesCompra';
import Pagos from './routes/pagos';
import NavegationBar from './layouts/navbar';
import Footer from './layouts/footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/react-ballet-pages' element={<NavegationBar />}>
            <Route index element={<Home />} />
            <Route path='academia' element={<Academia />} />
            <Route path='cursos' element={<Cursos />} />
            <Route path='metodologia' element={<Metodologia />} />
            <Route path='docentes' element={<Docentes />} />
            <Route path='login' element={<LogIn />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='niveles' element={<Niveles />} />
            <Route path='choose-username' element={<ChoosUsernameView />} />
            <Route path='administrar-cuenta' element={<AdministrarCuenta />} />
            <Route path='administrar-web' element={<AdministrarWeb />} />
            <Route path='choose-docente' element={<ChoosDocente />} />
            <Route path='administrar-docente/:iddocente' element={<AdministrarDocente />} />
            <Route path='choose-curso' element={<ChoosCurso />} />
            <Route path='administrar-curso/:idcurso' element={<AdiministrarCurso />} />
            <Route path='administrar-nivel/:idnivel' element={<AdministrarNivel />} />
            <Route path='administrar-unidad/:idunidad' element={<AdministrarUnidad />} />
            <Route path='curso-niveles/:idcurso' element={<CursoNiveles />} />
            <Route path='curso-unidades/:idnivel' element={<CursoUnidades />} />
            <Route path='editar-paso/:idpaso' element={<EditPaso />} />
            <Route path='opcion-compra' element={<OpcionCompra />} />
            <Route path='unidades-compra' element={<NivelesCompra />} />
            <Route path='pagos' element={<Pagos />} />
            <Route path='mis-cursos' element={<MisCursos />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
