import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import Axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  // Fetch users from the backend
  const getUsers = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/api/users");
      setUsers(response.data.response); // Ensure correct key from response
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Add user to the database
  const addUser = async (data) => {
    try {
      const payload = {
        id: data.id,
        name: data.name,
      };

      const response = await Axios.post("http://localhost:3001/api/createUser", payload);

      if (response.status === 200) {
        console.log("User added successfully");
        getUsers(); // Fetch updated list after adding user
        setSubmitted(false)
      
      } else {
        console.error("Failed to add user:", response.data);
      }
    } catch (error) {
      console.error("Axios Error: ", error);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <Box sx={{ width: "calc(100% - 100px)", margin: "auto", marginTop: "100px" }}>
      <UserForm addUser={addUser} submitted={submitted} />
      <UsersTable rows={users} />
    </Box>
  );
};

export default Users;
