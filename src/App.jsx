import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './components/pages/Chat/Chat'
import Index from './components/pages/Index/Index'
import NavBar from './components/NavBar/NavBar'
import Services from './components/pages/Services/Services'

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/servicios' element={<Services />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
