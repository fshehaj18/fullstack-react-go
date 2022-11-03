import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
  useEffect(() => {
    if (jwt === "") {
    }
  }, []);
  const [jwt, setJwt] = useState<string>("");
  const [credentials, setCredentials] = useState({});
  const logOut = () => {
    localStorage.removeItem('jwt');
    setJwt("");
  };
  const navigate = useNavigate();
  async function loginHandler(event: React.FormEvent) {
    event?.preventDefault()
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    };
    
        await fetch("http://localhost:8080/login", requestOptions)
        .then(response => response.json())
        .then((body) => {
         if(body.response) {
          setJwt(body.response);
          localStorage.setItem('jwt', body.response)
          navigate('../products')
         }
        })
        .catch(error => console.log(error))
    
  }

  return (
    <div className="form-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e: any) => {
          setCredentials({ ...credentials, username: e.target.value });
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e: any) => {
          setCredentials({ ...credentials, password: e.target.value });
        }}
      />
      <Button size="lg" onClick={loginHandler}>Login</Button>
    </div>
  );
};

export default Login;
