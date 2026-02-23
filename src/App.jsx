import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Sidebar } from './shared/components/Sidebar.jsx'
import { Dashboard } from './features/dashboard/pages/Dashboard.jsx'
import { Menu } from './features/menu/pages/Menu.jsx'
import { Login } from './features/auth/pages/login.jsx'
import { PrivatePage } from './features/auth/components/PrivatePage.jsx'
import { PublicPage } from './features/auth/components/PublicPage.jsx'
import { Ajustes } from './features/ajustes/pages/Ajustes.jsx'
import { ResetPassword } from './features/auth/pages/ResetPassword.jsx'
import { Admin } from './features/auth/components/Admin.jsx'
import { Outlet } from 'react-router-dom'
import { PagoExitoso } from './features/pagos/pages/PagoExitoso.jsx'
import { PagoFallido } from './features/pagos/pages/PagoFallido.jsx'
import { PagoVencido } from './features/pagos/pages/Pagovencido.jsx'
import { GestionLocales } from './features/admin/page/GestionLocales.jsx'
import { GestionUsuarios } from './features/admin/page/GestionUsuarios.jsx'
import { DashboardAdmin } from './features/dashboard/pages/DashboardAdmin.jsx'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore.js'
import { useFormStore } from './store/useFormStore.js'
import { ModalPay } from './features/pagos/components/ModalPay.jsx'

export const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const loading = useAuthStore((state) => state.loading);
  const showModalPay = useFormStore((state) => state.showModalPay);
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

