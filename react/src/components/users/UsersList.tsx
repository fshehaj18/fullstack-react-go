import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { User } from '../../typings/User';

const UsersList = () => {
    const [users, setUsers] = useState<User[]>([]);
    useEffect( () => {
            fetch("http://localhost:8080/users", {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),
            })
            .then(res => res.json())
            .then(res => {
               setUsers(res.users);
               console.log(users);
               
               if( 1==1) {
                console.log("egj")
                
               }
            })
            .catch(error => console.log(error))
        }, []);
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 && users.map((user: any) => (
                    <tr>
                        <td>{user.id}</td>
                        <td colSpan={2}>{user.firstName}</td>
                        <td>@twitter</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default UsersList

function useAsyncEffect(arg0: () => void, arg1: never[]) {
    throw new Error('Function not implemented.');
}
