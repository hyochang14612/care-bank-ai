import { Route, Routes } from 'react-router-dom'
import { AppDataProvider } from './context/AppDataContext'
import { AppShell } from './layouts/AppShell'
import { Home } from './pages/Home'
import { Market } from './pages/Market'
import { Matching } from './pages/Matching'
import { Connections } from './pages/Connections'
import { PointBank } from './pages/PointBank'
import { News } from './pages/News'
import { Demo } from './pages/Demo'
import { Roles } from './pages/Roles'
import { Pitch } from './pages/Pitch'

function App() {
  return (
    <AppDataProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="market" element={<Market />} />
          <Route path="matching" element={<Matching />} />
          <Route path="connections" element={<Connections />} />
          <Route path="points" element={<PointBank />} />
          <Route path="news" element={<News />} />
          <Route path="demo" element={<Demo />} />
          <Route path="roles" element={<Roles />} />
          <Route path="pitch" element={<Pitch />} />
        </Route>
      </Routes>
    </AppDataProvider>
  )
}

export default App
