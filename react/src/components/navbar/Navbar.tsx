import React, { useContext, useEffect } from "react";
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
    navigate("/card");
  };
  const cardCtx = useContext(CardContext);
  const total = cardCtx.card.products.total;
  useEffect(() => {}, [cardCtx]);
  return (
    <Navbar  expand="lg" style={{backgroundColor: '#00a8ff'}}>
      <Container>
        <Navbar.Brand href="../products" style={{color: '#f3fbff', fontFamily: 'Brush Script MT', }}><h1>Shop-App</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{ cursor: "pointer", color: "#fff000" }} onClick={handleSelect}>
              <span style={{ alignItems: "flex-end", fontSize: '20px', textAlign: 'end' }}>
                <FontAwesomeIcon icon={faShoppingCart} />

                <span className="cart-value">{total}</span>
              </span>
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link style={{ cursor: "pointer", color: "#fff", fontSize: '20px'}} href="/login">Login</Nav.Link>
            <Nav.Link style={{ cursor: "pointer", color: "#fff", fontSize: '20px' }} href="/invoices">Invoices</Nav.Link>
            <Nav.Link style={{ cursor: "pointer", color: "#fff", fontSize: '20px' }} href="/users">Users</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
