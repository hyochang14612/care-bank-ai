import { Route, Routes } from 'react-router-dom'
import { AppDataProvider } from './context/AppDataContext'
import { ResidentShell } from './layouts/ResidentShell'
import { WorkerShell } from './layouts/WorkerShell'
import { Landing } from './pages/Landing'
import { ResidentHome } from './pages/ResidentHome'
import { Register } from './pages/Register'
import { CareRequest } from './pages/CareRequest'
import { ResidentResources } from './pages/ResidentResources'
import { Stories } from './pages/Stories'
import { CarePointBank } from './pages/CarePointBank'
import { WorkerLogin } from './pages/WorkerLogin'
import { AiRecommend } from './pages/worker/AiRecommend'
import { CaseManagement } from './pages/worker/CaseManagement'
import { MatchApproval } from './pages/worker/MatchApproval'
import { ConnectionStatus } from './pages/worker/ConnectionStatus'
import { Stats } from './pages/worker/Stats'

function App() {
  return (
    <AppDataProvider>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<ResidentShell />}>
          <Route path="resident" element={<ResidentHome />} />
          <Route path="register" element={<Register />} />
          <Route path="request" element={<CareRequest />} />
          <Route path="resources" element={<ResidentResources />} />
          <Route path="stories" element={<Stories />} />
          <Route path="care-point" element={<CarePointBank />} />
        </Route>

        <Route path="worker" element={<WorkerLogin />} />
        <Route element={<WorkerShell />}>
          <Route path="worker/dashboard" element={<AiRecommend />} />
          <Route path="worker/cases" element={<CaseManagement />} />
          <Route path="worker/approve" element={<MatchApproval />} />
          <Route path="worker/connections" element={<ConnectionStatus />} />
          <Route path="worker/stats" element={<Stats />} />
        </Route>
      </Routes>
    </AppDataProvider>
  )
}

export default App
