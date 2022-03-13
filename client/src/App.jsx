import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './Pages/LoginPage/LoginPage'
import SignupPage from './Pages/SignupPage/SignupPage'
function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/" element={<h1>Welcome</h1>}/>
      </Routes>
     
    </div>
  )
}

export default App
