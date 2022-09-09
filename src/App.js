import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import Signup from './components/auth/Signup'
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
          <Route path="/Signup" element={<Signup />}/>
        </Routes> 
      </BrowserRouter>
    </div>

  
  );
}

export default App;
