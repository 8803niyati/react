import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <Navbar expand="lg" className="blinkit-navbar" sticky="top">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="blinkit-logo">
          <img
            src="https://clevertap.com/wp-content/uploads/2023/08/blinkit-logo_casestudy.png" 
            alt="Blinkit"
            height="100%"
          />
        </Navbar.Brand>

        {/* Toggle for mobile view */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Nav Links */}
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center gap-3">
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            <Link to="/add-product" className="btn btn-success">
              Add Product
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
