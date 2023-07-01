import React, { useState } from 'react';
import axios from 'axios';

const CrearUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleApellidoChange = (e) => {
    setApellido(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/usuarios', {
        nombre,
        apellido,
      });
      
      // Manejar la respuesta exitosa de la API
      setMensaje('Usuario creado correctamente');
      setNombre('');
      setApellido('');
    } catch (error) {
      // Manejar el error de la API
      setMensaje('Error al crear el usuario');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Crear Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={handleNombreChange} />
        </div>
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input type="text" id="apellido" value={apellido} onChange={handleApellidoChange} />
        </div>
        <button type="submit">Crear</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
};

export default CrearUsuario;
