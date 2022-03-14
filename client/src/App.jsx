import { Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage/LoginPage'
import SignupPage from './Pages/SignupPage/SignupPage'
import WelcomePage from './Pages/WelcomePage/WelcomePage'
function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/" element={<WelcomePage/>}/>
      </Routes>
     
    </div>
  )
}

export default App
