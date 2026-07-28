import { Route, Routes } from 'react-router-dom'
import { AppDataProvider } from './context/AppDataContext'
import { ResidentShell } from './layouts/ResidentShell'
import { WorkerShell } from './layouts/WorkerShell'
import { ResidentHome } from './pages/ResidentHome'
import { About } from './pages/About'
import { Register } from './pages/Register'
import { CareRequest } from './pages/CareRequest'
import { ResidentResources } from './pages/ResidentResources'
import { Stories } from './pages/Stories'
import { CarePointBank } from './pages/CarePointBank'
import { Login } from './pages/Login'
import { WorkerLogin } from './pages/WorkerLogin'
import { AiMatching } from './pages/worker/AiMatching'
import { ConnectionManagement } from './pages/worker/ConnectionManagement'
import { Stats } from './pages/worker/Stats'

function App() {
  return (
    <AppDataProvider>
      <Routes>
        <Route element={<ResidentShell />}>
          <Route path="/" element={<ResidentHome />} />
          <Route path="about" element={<About />} />
          <Route path="register" element={<Register />} />
          <Route path="request" element={<CareRequest />} />
          <Route path="resources" element={<ResidentResources />} />
          <Route path="stories" element={<Stories />} />
          <Route path="care-point" element={<CarePointBank />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="worker" element={<WorkerLogin />} />
        <Route element={<WorkerShell />}>
          <Route path="worker/ai-matching" element={<AiMatching />} />
          <Route path="worker/connections" element={<ConnectionManagement />} />
          <Route path="worker/stats" element={<Stats />} />
        </Route>
      </Routes>
    </AppDataProvider>
  )
}

export default App
