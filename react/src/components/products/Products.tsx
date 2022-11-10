import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  FormControl,
  FormText,
  Row,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { CardContext } from "../../store/CardProvider";
import { BASE_URL } from "../../store/constants";
import { ProductContext } from "../../store/ProductsProvider";
import { Product } from "../../typings/Product";
import Navbar from "../navbar/Navbar";
import "./productStyle.css";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const prod = useContext(ProductContext);
  const card = useContext(CardContext);
  const [textInput, setTextInput] = useState("");
  const [priceInput, setPriceInput] = useState<number>(100);
  const [option, setOption] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (option === "3") {
      setProducts(
        prod.products.sort(function (a: Product, b: Product) {
          return a.price - b.price;
        })
      );
    } else if (option === "2") {
      setProducts(
        prod.products.sort(function (a: Product, b: Product) {
          return b.price - a.price;
        })
      );
    } else {
      setProducts(
        prod.products.sort(function (a: Product, b: Product) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
      );
    }
    setProducts(prod.products.filter((p: any) => p.name.includes(textInput))
    .filter((p: any) => p.price < priceInput));
    console.log(products);
  }, [prod.products, textInput, option, priceInput]);
  const deleteHandler = async (id: number) => {
    await fetch(BASE_URL + `/${id}`, { method: "DELETE" });
    prod.deleteProduct(id);
  };
  const search = (e: any) => {
    console.log(e.target.value);
    setTextInput(e.target.value);
  };
  const productIsInCard = (orderedProducts: any, name: string): boolean => {
    for (let i = 0; i < orderedProducts.products.length; i++) {
      if (orderedProducts.products[i].name === name) {
        return true;
      }
    }
    return false;
  };
  const sortByPriceAscending = (e: any) => {
    console.log(e.target.value);
    setOption(e.target.value);
  };
  const addToCart = (p: Product) => {
    if (!productIsInCard(card.card.products, p.name)) {
      p.quantity = 1;
    }
    card.addProduct(p);
  };
  return (
    <>
      <Navbar /> 
      <Row className="top">
        <h1>Products  </h1>
      </Row>
      <Container >
       
        <Row> 
          <Col xs={2}>
            <Button variant="success" size="lg" style={{backgroundColor: '#20bf55', border: 'none'}} onClick={() => navigate("./new-product")} >
              Add product
            </Button>
          </Col>
          <Col sm={2} xs={6} style={{ marginBottom: "12px" }}>
            <Form.Select
              onChange={sortByPriceAscending}
              aria-label="Default select example"
            >
              <option value="1">Low to High</option>
              <option value="2">High to Low</option>
              <option value="3">A to Z</option>
            </Form.Select>
          </Col>
          <Col style={{ marginBottom: "12px"   }}>
            <div>
            <Form onSubmit={search}>
              <div style={{ zIndex: 10, maxWidth: '45%', }}>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={search}
                />
              </div>
              </Form>
              <div style={{ zIndex: 15, margin: 0,  position: "absolute", top: 185, right: 880}}>
                <FontAwesomeIcon
                 
                  icon={faSearch}
                />
              </div>
              </div>
            
          </Col>
          <Col>
            <Form.Label>Price</Form.Label>
            <Form.Range
              defaultValue={500}
              onChange={(e) => setPriceInput(Number(e.target.value))}
            />
          </Col>
         
        </Row>
      </Container>
      <Row>
        <Container>
          <Row style={{ marginTop: "6px" }}>
            {products.map((p: any) => (
              <Col className="mr-6" style={{ marginTop: "10px" }}>
                <Card
                  style={{
                    marginTop: "10px",
                    width: "15rem",
                    marginBottom: "10px",
                    overflow: "hidden",
                  }}
                  className="card-img-wrap"
                >
                  <Card.Img
                    style={{
                      width: "40%",
                      height: "10vw",
                      objectFit: "cover",
                      alignItems: "center",
                      marginLeft: "65px",
                    }}
                    variant="top"
                    src={p.image}
                    width="1px"
                    height="120px"
                    className="hover-zoom"
                  />
                  <Card.Body>
                    <Card.Title>
                      <h4>{p.name} </h4>
                    </Card.Title>
                    <Card.Text>{p.desc}</Card.Text>
                    <Card.Text>
                      <strong>{p.price / 100}$ </strong>
                    </Card.Text>
                    <div className="flexButtons">
                      <div className="pl-5" style={{ overflow: "visible" }}>
                        <Button variant= "warning" style={{backgroundColor: '#ff9e00', color: '#fff'}} onClick={() => addToCart(p)}>
                          Add
                        </Button>
                      </div>
                      <div className="pr-1"></div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Row>
    </>
  );
};

export default Products;
