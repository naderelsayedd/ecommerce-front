import './App.css';
import './components/main.css' ;
import Navbar from './components/NavBar';
import {BrowserRouter , Routes , Route } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import Details from './components/Details';
import Footer from './components/Footer'
import Contact from './components/Contact';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element= {<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
