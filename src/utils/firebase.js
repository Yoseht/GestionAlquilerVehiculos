import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore();

const rolesCollection = collection(db, 'roles');

const crearRoles = async () => {
  try {
    await addDoc(rolesCollection, {
      id: 'administrador',
      nombre: 'Administrador',
      campos: ['nombre', 'apellido', 'correo', 'contraseña', 'inventario'],
    });

    await addDoc(rolesCollection, {
      id: 'cliente',
      nombre: 'Cliente',
      campos: ['identificacion','nombre','apellido','edad','correo','contraseña','vehiculosAlquilados'],
    });

    console.log('Roles creados con éxito');
  } catch (error) {
    console.error('Error al crear roles:', error);
  }
};

crearRoles();