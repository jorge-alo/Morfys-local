import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './pages/Dashboard.jsx'
import { Menu } from './pages/Menu.jsx'
import { Login } from './pages/login.jsx'
import { FormProvider } from './context/FormProvider.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { DataProvider } from './context/DataProvider.jsx'
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

export const App = () => {
  return (
    <div className="app-container">
      <FormProvider>
        <AuthProvider>
          <DataProvider>
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
          </DataProvider>
        </AuthProvider>
      </FormProvider>
    </div>
  )
}

