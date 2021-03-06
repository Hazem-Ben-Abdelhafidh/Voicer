import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import RequireAuth from "./Components/RequireAuth";
import Layout from "./Components/Layout/Layout"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<WelcomePage />} />
        <Route element={<RequireAuth/>}>
          <Route path="/home" element={<Layout/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
