const express = require('express');
const app = express();
const mariadb = require('mariadb');
const cors = require('cors');
const bodyParser = require('body-parser')

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'aplicacio_react',
});

app.use(cors());
app.use(bodyParser.json());


// Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM usuarios');
    res.json(rows);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  } finally {
    if (conn) conn.release();
  }
});

// Obtener un usuario por su ID
app.get('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  } finally {
    if (conn) conn.release();
  }
});

// Crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
  const { nombre, apellido } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query('INSERT INTO usuarios (nombre, apellido) VALUES (?, ?)', [nombre, apellido]);

    // Convertir el BigInt a una cadena antes de enviar la respuesta JSON
    const serializedResult = {
      id: result.insertId.toString(),
      nombre,
      apellido,
    };

    res.json(serializedResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el usuario' });
  } finally {
    if (conn) conn.release();
  }
});


// Actualizar un usuario existente
app.put('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  const { nombre, apellido } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query('UPDATE usuarios SET nombre = ?, apellido = ? WHERE id = ?', [nombre, apellido, id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json({ id, nombre, apellido });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  } finally {
    if (conn) conn.release();
  }
});

// Eliminar un usuario
app.delete('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query('DELETE FROM usuarios WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json({ message: 'Usuario eliminado correctamente' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  } finally {
    if (conn) conn.release();
  }
});

app.listen(3001, () => {
  console.log('Servidor backend en ejecución en el puerto 3001');
});