import React, {useContext, useEffect} from "react";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormControl, NavItem } from "react-bootstrap";
import { Product } from "../../typings/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CardContext } from "../../store/CardProvider";

const NavbarComponent = (props: any) => {
  const navigate = useNavigate();
  const handleSelect = () => {
    navigate('/card')
  }
  const cardCtx = useContext(CardContext);
  const total = cardCtx.card.products.total;
  useEffect(() => {
   
  }, [cardCtx]);
  return (
    <Navbar bg="primary" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Shop-App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavItem onClick={handleSelect}><FontAwesomeIcon icon={faShoppingCart} />
            
            <div className='cart-value'>{total}</div></NavItem>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/login">Invoices</Nav.Link>
            <Nav.Link href="/login">Users</Nav.Link>
          </Nav>
          {/* <Form className="d-flex">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2" 
            />
            <Button variant="success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
