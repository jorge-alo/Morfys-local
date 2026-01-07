import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './pages/Dashboard.jsx'
import { Menu } from './pages/Menu.jsx'
import { Login } from './pages/login.jsx'
import { PrivatePage } from './components/auth/PrivatePage.jsx'
import { PublicPage } from './components/auth/PublicPage.jsx'
import { Ajustes } from './pages/Ajustes.jsx'
import { ResetPassword } from './pages/ResetPassword.jsx'
import { Admin } from './components/auth/Admin.jsx'
import { Outlet } from 'react-router-dom'
import { PagoExitoso } from './pages/PagoExitoso.jsx'
import { PagoFallido } from './pages/PagoFallido.jsx'
import { PagoVencido } from './pages/Pagovencido.jsx'
import { GestionLocales } from './pages/GestionLocales.jsx'
import { GestionUsuarios } from './pages/GestionUsuarios.jsx'
import { DashboardAdmin } from './pages/DashboardAdmin.jsx'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'
import { useFormStore } from './store/useFormStore.js'
import { ModalPay } from './components/ModalPay.jsx'

export const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const loading = useAuthStore((state) => state.loading);
  const showModalPay = useFormStore((state) => state.showModalPay);
  const setShowModalPay = useFormStore((state) => state.setShowModalPay);
  const navigate = useNavigate();

  useEffect(() => {
    // 🚀 Aquí es donde se llama al checkAuth al cargar la App
    checkAuth(navigate);
  }, []);

  // Mientras verifica el token, puedes mostrar un spinner
  if (loading) return <div>Cargando...</div>;
  return (
    <div className="app-container">



      <Routes>
        {/* Rutas públicas */}
        <Route path='/' element={<PublicPage><Login /></PublicPage>} />
        <Route path='/reset-password/:token' element={<PublicPage><ResetPassword /></PublicPage>} />
        <Route path='/pago-exitoso' element={<PagoExitoso />} />
        <Route path='/pago-fallido' element={<PagoFallido />} />
        <Route path='/pago-vencido' element={<PagoVencido />} />

        {/* --- RUTAS PARA TODOS (Admin y Owners) --- */}
        <Route element={<PrivatePage><Sidebar /><Outlet /></PrivatePage>}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/ajustes' element={<Ajustes />} />
        </Route>

        {/* --- RUTAS EXCLUSIVAS (Solo SuperAdmin) --- */}
        <Route path='/admin' element={<Admin><PrivatePage><Sidebar /><Outlet /></PrivatePage></Admin>}>
          <Route path='locales' element={<GestionLocales />} />
          <Route path='usuarios' element={<GestionUsuarios />} />
          <Route path='dashboard' element={<DashboardAdmin />} />
        </Route>
      </Routes>
      {showModalPay && (
        <ModalPay/>
      )}

    </div>
  )
}

