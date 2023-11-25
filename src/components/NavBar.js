import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from 'react-router-dom'
import { FaAmazonPay } from "react-icons/fa";


function NavBar() {
  const hasToken = localStorage.getItem('token') ;
  return (
    <Navbar expand="lg" className='bg-primary'>
      <Container >
        <Navbar.Brand className='navbar-brand text-light' href="/"><FaAmazonPay />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/">Home</NavLink>
            {
              hasToken ? (
                <div className='d-flex justify-content-center align-items-center'>
                <NavLink to="/profile" className='nav-link'>Profile</NavLink>
                <NavLink to="/contact" className='nav-link'>Contact</NavLink>
                </div>
              ) : (
                <NavLink to="/login" className='nav-link'>Login</NavLink>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;