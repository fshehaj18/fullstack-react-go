import axios from "axios";
import React, { useContext, useState } from "react";
import { Product } from "../../typings/Product";
import { useNavigate } from "react-router-dom";
import './AddProduct.css';
import { ProductContext } from "../../store/ProductsProvider";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BASE_URL } from "../../store/constants";

const AddProduct = () => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    desc: "",
    image:"",
    price: 0,
    quantity: 0,
  });
  const navigate = useNavigate();
  const productsCtx = useContext(ProductContext);
  const addProductToJson = async (event: React.FormEvent) => {
    event.preventDefault();
    productsCtx.addProduct(product)
    axios.post(BASE_URL, product);
    navigate('../');
  };
  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const { name, value } = event.target as any;
    setProduct({ ...product, [name]: value });

  };
  return (
    <div className="product-form-container">
     <Form>
      <Form.Group className="mb-3" controlId="formBasictext">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasictext">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter description" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasictext">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasictext">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
};

export default AddProduct;
