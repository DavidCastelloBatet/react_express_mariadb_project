import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Usuarios from './Usuarios';
import CrearUsuario from './CrearUsuario.jsx';
import EditarUsuario from './EditarUsuario.jsx';

const App = () => {
  
    
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Usuarios />} />
          <Route path="crearUsuario" element={<CrearUsuario />} />
          <Route path="editarUsuario" element={<EditarUsuario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;