// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListaUsuariosPage from "./features/usuarios/pages/ListaUsuariosPage";
import ListaServiciosPage from "./features/servicios/pages/ListaServiciosPage";
import ListaProductosPage from "./features/productos/pages/ListaProductosPage";
import ListaMascotasPage from "./features/mascotas/pages/ListaMascotasPage";
import ListaCitasPage from "./features/citas/pages/ListaCitasPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import RegistrarMascotaPage from "./features/mascotas/pages/RegistrarMascotaPage";
import CitasPage from "./pages/CitasPage";
import PagosPage from "./features/pagos/pages/PagosPage";
import ProductosPage from "./pages/ProductosPage";
import DetallesProductoPage from "./features/productos/pages/DetallesProductoPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/registrar-mascota" element={<RegistrarMascotaPage />} />
          <Route path="/citas" element={<CitasPage />} />
          <Route path="/pagos" element={<PagosPage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/productos/:id" element={<DetallesProductoPage />} /> 
        </Route>
      </Routes>
    </Router>
  );
}
