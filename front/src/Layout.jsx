import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Usuarios</Link>
          </li>
          <li>
            <Link to="/crearUsuario">Crear Usuario</Link>
          </li>
          <li>
            <Link to="/editarUsuario">Editar Usuario</Link>
          </li>

        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;