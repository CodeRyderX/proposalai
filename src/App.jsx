import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Generator from './pages/Generator'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Generator />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}