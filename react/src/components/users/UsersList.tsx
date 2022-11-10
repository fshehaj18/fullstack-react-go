import React, { useEffect, useState } from "react";
import { Button, Navbar, Table } from "react-bootstrap";
import { User } from "../../typings/User";
import NavbarComponent from "../navbar/Navbar";

const UsersList = () => {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        fetch("http://localhost:8080/users", {
            method: "get",
            headers: new Headers({
                Authorization: "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/x-www-form-urlencoded",
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                setUsers(res.users);
                
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <>
            <NavbarComponent />
            <Button>Add user</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 &&
                        users.map((user: any) => (
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    );
};

export default UsersList;

function useAsyncEffect(arg0: () => void, arg1: never[]) {
    throw new Error("Function not implemented.");
}
