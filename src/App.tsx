import { Route, Routes } from 'react-router-dom'
import { AppShell } from './layouts/AppShell'
import { Home } from './pages/Home'
import { Market } from './pages/Market'
import { Matching } from './pages/Matching'
import { Connections } from './pages/Connections'
import { PointBank } from './pages/PointBank'
import { News } from './pages/News'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="market" element={<Market />} />
        <Route path="matching" element={<Matching />} />
        <Route path="connections" element={<Connections />} />
        <Route path="points" element={<PointBank />} />
        <Route path="news" element={<News />} />
      </Route>
    </Routes>
  )
}

export default App
