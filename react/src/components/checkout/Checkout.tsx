import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Modal, Table } from "react-bootstrap";
import { CardContext } from "../../store/CardProvider";

const Checkout = () => {
  const card = useContext(CardContext);
  const [orderedProducts, setOrderedProducts] = useState([]);
  useEffect(() => {
    setOrderedProducts(card.card.products.products);
  }, [card]);
  const onSubmit = () => {};
  function addProduct() {}
  function removeProduct(product: any) {
    card.deleteProduct(product.id);
    
  }
  function clearCard() {
    card.clearCard();
  }
  function sumBy(orderedProducts: any) {
    const initialValue = 0;
    const total = orderedProducts.reduce(
      (accumulator: any, current: any) =>
        accumulator + current.price * current.quantity,
      initialValue
    );

    return total;
  }
  function addQuantity(p: any) {
    card.changeQuantity(p, 1);
  }
  function substractQuantity(p: any) {
    if (p.quantity == 0) {
      window.alert("irpwgn");
      return;
    }
    card.changeQuantity(p, -1);
  }
  function submitOrder() {}
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      {orderedProducts.length == 0 && <p>No products added</p>}
      {orderedProducts.length > 0 && (
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Cost</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {orderedProducts &&
                  orderedProducts.map((p: any) => (
                    <tr>
                      <td>{p.name}</td>
                      <td>{p.price}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="light"
                          onClick={() => {
                            substractQuantity(p);
                          }}
                        >
                          -
                        </Button>{" "}
                        {p.quantity}
                        <Button
                          size="sm"
                          variant="light"
                          onClick={() => {
                            addQuantity(p);
                          }}
                        >
                          +
                        </Button>
                      </td>
                      <td>{p.quantity * p.price}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            removeProduct(p);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>{" "}
            <p>Total price: {sumBy(orderedProducts)}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => clearCard()}>
              Close
            </Button>
            <Button variant="primary ml-2">Order</Button>
          </Modal.Footer>
        </Modal.Dialog>
      )}
    </div>
  );
};

export default Checkout;
