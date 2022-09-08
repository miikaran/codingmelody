import Welcome from './components/Welcome'
import Login from './components/Login'
import Signup from './components/Signup'
import MainPage from './pages/MainPage'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes  } from 'react-router-dom';

function App() {

  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />}/>  
          <Route path="/MainPage" element={<MainPage />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/Signup" element={<Signup />}/>
        </Routes> 
      </BrowserRouter>
    </div>

  
  );
}

export default App;
