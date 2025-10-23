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

              {/* Rutas privadas */}
              <Route element={<Admin><PrivatePage><Sidebar /><Outlet /></PrivatePage></Admin>}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/menu' element={<Menu />} />
                <Route path='/ajustes' element={<Ajustes />} />
                <Route path='*' element={<Navigate to='/menu' />} />
              </Route>
            </Routes>
          </DataProvider>
        </AuthProvider>
      </FormProvider>
    </div>
  )
}

