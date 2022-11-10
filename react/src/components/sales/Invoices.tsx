import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { Invoice } from "../../typings/Invoice";
import Navbar from "../navbar/Navbar";
import './invoices.css'
const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/sales", {
      method: "get",
      headers: new Headers({
        // Authorization: "Bearer " + localStorage.getItem("jwt"),
        // "Content-Type": "application/x-www-form-urlencoded",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setInvoices(res);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <Navbar />
      <Row className="top">
        <h1>Invoices  </h1>
      </Row>
      <div style={{marginBottom: '50px'}}>
        <Row>
        <Col sm={1}></Col>
          <Col sm={4}>
            <Card className='card'>
              <Card.Title>
                <h2 style={{color: '#3498db'}}>Sales Today</h2>
              </Card.Title>
              <Card.Body>
                <h4>{invoices.length}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={2}></Col>
          <Col sm={4}>
            <Card className='card'>
              <Card.Title>
                <h2 style={{color: '#3498db'}}>Income</h2>
              </Card.Title>
              <Card.Body>
                <h4>35$</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
      <Col sm={6}>
        <h2>Sales</h2>
      <Table bordered hover style={{marginLeft: "20px"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Total</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 &&
            invoices.map((i: any) => (
              <tr>
                <td>{i.id}</td>
                <td>16$</td>
                <td>{new Date(i.date).toLocaleDateString()}</td>
                <td>
                  {new Date(i.date).getHours()}:{new Date(i.date).getMinutes()}:
                  {new Date(i.date).getSeconds()}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
     </Col>
    </>
  );
};

export default Invoices;
