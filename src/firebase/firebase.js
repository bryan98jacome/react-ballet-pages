// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import async from "hbs/lib/async";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function userExists(uid) {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  console.log(res);
  return res.exists();
}

export async function existsUsername(email) {
  const users = [];
  const docsRef = collection(db, "users");
  const q = query(docsRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });

  return users.length > 1 ? users[1].uid : null;
}

export async function existsEmail(email) {
  const users = [];
  const docsRef = collection(db, "users");
  const q = query(docsRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users.length > 0 ? users[0].uid : null;
}

export async function registerNewUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) { }
}

export async function updateUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    console.log(user);
    await setDoc(docRef, user);
  } catch (error) {
    console.error(error);
  }
}

export async function getUserInfo(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    console.error(error);
  }
}

/*Guarda el archivo en storage*/
export async function setUserProfilePhoto(uid, file) {
  try {
    const imageRef = ref(storage, `imagesProfile/${uid}`);
    const resUpload = await uploadBytes(imageRef, file);
    return resUpload;
  } catch (error) {
    console.error(error);
  }
}

/**Obtiene una url del archivo de storage*/
export async function getProfilePhotoUrl(profilePicture) {
  try {
    const imageRef = ref(storage, profilePicture);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error(error);
  }
}

/*Agregar nuevo docente*/
export async function upDateDocente(docente) {
  try {
    const collectionRef = collection(db, "docentes");
    const docRef = doc(collectionRef, docente.id);
    await setDoc(docRef, docente);
  } catch (error) {
    console.error(error);
  }
}

/*Agregar foto al nuevo docente*/
export async function setDocenteProfilePhoto(email, file) {
  try {
    const imageRef = ref(storage, `imagesProfileDocentes/${email}`);
    const resUpload = await uploadBytes(imageRef, file);
    return resUpload;
  } catch (error) {
    console.error(error);
  }
}

/*Consultar los docentes*/
export async function getDocentes() {
  const docentes = [];
  try {
    const collectionRef = collection(db, "docentes");
    const q = query(collectionRef, where("id", "!=", null));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      docentes.push(doc.data());
    });
    return docentes;
  } catch (error) {
    console.error(error);
  }
}

/*Consulta del docente mediante el id*/
export async function getDocente(uuid) {
  try {
    const docRef = doc(db, "docentes", uuid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    console.error(error);
  }
}

/*Consulta si ya existe un email de docente registrado*/
export async function existsEmailDocente(email) {
  const docentes = [];
  const docsRef = collection(db, "docentes");
  const q = query(docsRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    docentes.push(doc.data());
  });
  return docentes.length > 0 ? false : true;
}

/** Eliminar el docente **/
export async function deleteDocente(uuid) {
  try {
    const docRef = doc(db, "docentes", uuid);
    await deleteDoc(docRef);
    await deleteVideoPaso(uuid);
  } catch (error) {
    console.error(error);
  }
}

/******** Servicios de los Cursos ********/
/*Agregar nuevo curso*/
export async function upDateCurso(curso) {
  try {
    const collectionRef = collection(db, "cursos");
    const docRef = doc(collectionRef, curso.id);
    await setDoc(docRef, curso);
  } catch (error) {
    console.error(error);
  }
}

/*Consultar si existe un curso ya registrado*/
export async function existsCurso(name) {
  const cursos = [];
  const docsRef = collection(db, "cursos");
  const q = query(docsRef, where("name", "==", name));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    cursos.push(doc.data());
  });
  return cursos.length > 0 ? false : true;
}

/*Agregar foto al curso*/
export async function setCursoPhoto(name, file) {
  try {
    const imageRef = ref(storage, `imagesCursos/${name}`);
    const resUpload = await uploadBytes(imageRef, file);
    return resUpload;
  } catch (error) {
    console.error(error);
  }
}

/*Consultar los cursos*/
export async function getCursos() {
  const cursos = [];
  try {
    const collectionRef = collection(db, "cursos");
    const q = query(collectionRef, where("id", "!=", null));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      cursos.push(doc.data());
    });
    return cursos;
  } catch (error) {
    console.error(error);
  }
}

/*Consultar el curso mediante el id*/
export async function getCurso(uuid) {
  try {
    const docRef = doc(db, "cursos", uuid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    console.error(error);
  }
}
/** Eliminar el curso **/
export async function deleteCurso(uuid) {
  try {
    const docRef = doc(db, "cursos", uuid);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
}

/******* Servicios de Niveles *******/
/*Agregar nuevo nivel*/
export async function upDateNivel(nivel) {
  try {
    const collectionRef = collection(db, "niveles");
    const docRef = doc(collectionRef, nivel.id);
    await setDoc(docRef, nivel);
  } catch (error) {
    console.error(error);
  }
}
/*Consultar si existe un nivel ya registrado*/
export async function existsNivel(name, idCurso) {
  const niveles = [];
  const docsRef = collection(db, "niveles");
  const q = query(docsRef, where("name", "==", name), where("idCurso", "==", idCurso));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    niveles.push(doc.data());
  });
  return niveles.length > 0 ? false : true;
}

/*Consultar los niveles*/
export async function getNiveles(id) {
  const niveles = [];
  try {
    const collectionRef = collection(db, "niveles");
    const q = query(collectionRef, where("idCurso", "==", id), orderBy("name"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      niveles.push(doc.data());
    });
    return niveles;
  } catch (error) {
    console.error(error);
  }
}

/*Consulta del nivel mediante el id*/
export async function getNivel(uuid) {
  try {
    const docRef = doc(db, "niveles", uuid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    console.error(error);
  }
}

/** Eliminar el nivel **/
export async function deleteNivel(uuid) {
  try {
    const docRef = doc(db, "niveles", uuid);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
}

/******** Servicios de Unidades ********/
/*Consultar si existe una unidad ya registrada*/
export async function existsUnidad(name, idNivel) {
  const unidades = [];
  const docsRef = collection(db, "unidades");
  const q = query(docsRef, where("name", "==", name), where("idNivel", "==", idNivel));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    unidades.push(doc.data());
  });
  return unidades.length > 0 ? false : true;
}
/*Agregar nueva unidad*/
export async function upDateUnidad(unidad) {
  try {
    const collectionRef = collection(db, "unidades");
    const docRef = doc(collectionRef, unidad.id);
    await setDoc(docRef, unidad);
  } catch (error) {
    console.error(error);
  }
}

/*Consultar las unidades por id del curso*/
export async function getUnidades(id) {
  const unidades = [];
  try {
    const collectionRef = collection(db, "unidades");
    const q = query(collectionRef, where("idCurso", "==", id), orderBy("name"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      unidades.push(doc.data());
    });
    return unidades;
  } catch (error) {
    console.error(error);
  }
}

/*Consultar las unidades por id del nivel*/
export async function getUnidadesNivel(id) {
  const unidades = [];
  try {
    const collectionRef = collection(db, "unidades");
    const q = query(collectionRef, where("idNivel", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      unidades.push(doc.data());
    });
    return unidades;
  } catch (error) {
    console.error(error);
  }
}

/*Consulta la unidad mediante el id*/
export async function getUnidad(uuid) {
  try {
    const docRef = doc(db, "unidades", uuid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    console.error(error);
  }
}

/** Eliminar la unidad **/
export async function deleteUnidad(uuid) {
  try {
    const docRef = doc(db, "unidades", uuid);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
}

/******** Servicios de los pasos *********/
/*Guarda el archivo en storage*/
export async function setProfilePaso(uid, file) {
  try {
    const videoRef = ref(storage, `VideosPasos/${uid}`);
    const resUpload = await uploadBytes(videoRef, file);
    return resUpload;
  } catch (error) {
    console.error(error);
  }
}
/*Agregar nuevo paso*/
export async function upDatePaso(paso) {
  try {
    const collectionRef = collection(db, "pasos");
    const docRef = doc(collectionRef, paso.id);
    await setDoc(docRef, paso);
  } catch (error) {
    console.error(error);
  }
}

/*Consultar si existe un paso ya registrada*/
export async function existsPaso(name, idUnidad) {
  const pasos = [];
  const docsRef = collection(db, "pasos");
  const q = query(docsRef, where("name", "==", name), where("idunidad", "==", idUnidad));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    pasos.push(doc.data());
  });
  return pasos.length > 0 ? false : true;
}

/*Consultar los paso por id del curso*/
export async function getPasos(id) {
  const pasos = [];
  try {
    const collectionRef = collection(db, "pasos");
    const q = query(collectionRef, where("idCurso", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      pasos.push(doc.data());
    });
    return pasos;
  } catch (error) {
    console.error(error);
  }
}

/*Consultar los pasos por id del nivel*/
export async function getPasosNivel(id) {
  const pasos = [];
  try {
    const collectionRef = collection(db, "pasos");
    const q = query(collectionRef, where("idNivel", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      pasos.push(doc.data());
    });
    return pasos;
  } catch (error) {
    console.error(error);
  }
}

/*Consultar los pasos por id de la unidad*/
export async function getPasosUnidad(id) {
  const pasos = [];
  try {
    const collectionRef = collection(db, "pasos");
    const q = query(collectionRef, where("idunidad", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      pasos.push(doc.data());
    });
    return pasos;
  } catch (error) {
    console.error(error);
  }
}

/*Consulta el paso mediante el id*/
export async function getPaso(uuid) {
  try {
    const docRef = doc(db, "pasos", uuid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    console.error(error);
  }
}

/** Eliminar el paso **/
export async function deletePaso(uuid) {
  try {
    const docRef = doc(db, "pasos", uuid);
    await deleteDoc(docRef);
    await deleteVideoPaso(uuid);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteVideoPaso(uuid) {
  const desertRef = ref(storage, `VideosPasos/${uuid}`);
  deleteObject(desertRef).then(() => { }).catch((error) => { });
}

/**  Compras **/
/**  Agregar Compra **/
export async function compraCurso(compra) {
  try {
    const collectionRef = collection(db, 'compras');
    const docRef = doc(collectionRef, compra.orderID);
    await setDoc(docRef, compra);
  } catch (error) { }
}

/**  obtener información de la compra  **/
export async function getCompras(uuid) {
  const compras = [];
  try {
    const collectionRef = collection(db, "compras");
    const q = query(collectionRef, where("userUID", "==", uuid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      compras.push(doc.data());
    });
    return compras;
  } catch (error) {
    console.error(error);
  }
}

/**  Agregar Compra Temporal**/
export async function compraTemp(compra) {
  try {
    const collectionRef = collection(db, 'comprasTemp');
    const docRef = doc(collectionRef, compra.id);
    await setDoc(docRef, compra);
  } catch (error) { console.log(error) }
}
/**  Obtener Compra Temporal**/
export async function getCompraTemp(uuid) {
  try {
    const docRef = doc(db, "comprasTemp", uuid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    console.error(error);
  }
}


export async function logout() {
  await auth.signOut();
}
