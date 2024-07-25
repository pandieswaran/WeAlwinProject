import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Nav';
import '../Pages/Homepage.css';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';

function UserDatas() {
    const [user, setUsers] = useState([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await Axios.get('http://localhost:8000/user');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers(); 
    }, []); 
  
    return (
        <div>
            <Navigation />
            <h2>User List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email Id</th>
                        <th>Phone Number</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phonenumber}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default UserDatas;
