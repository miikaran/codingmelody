import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import MainPage from './pages/MainPage'
import { BrowserRouter, Route, Routes  } from 'react-router-dom';

function App() {

  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}/>  
          <Route path="/MainPage" element={<MainPage />}/>
          <Route path="/Login" element={<LoginPage />}/>
          <Route path="/Signup" element={<SignupPage />}/>
        </Routes> 
      </BrowserRouter>
    </div>

  
  );
}

export default App;
