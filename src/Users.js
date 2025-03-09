import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import Axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  // Fetch users from the backend
  const getUsers = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/api/users");
      setUsers(response.data.response);
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
        getUsers();
        setSubmitted(false);
      } else {
        console.error("Failed to add user:", response.data);
      }
    } catch (error) {
      console.error("Axios Error: ", error);
    }
  };

  // Update user details
  const updateUser = async (data) => {
    try {
      const payload = {
        id: data.id,
        name: data.name,
      };

      const response = await Axios.post("http://localhost:3001/api/updateUser", payload);

      if (response.status === 200) {
        console.log("User updated successfully");
        getUsers();
        setSubmitted(false);
        setIsEdit(false);
      } else {
        console.error("Failed to update user:", response.data);
      }
    } catch (error) {
      console.error("Axios Error: ", error);
    }
  };

  // Delete user
  const deleteUser = (data) => {
    Axios.post("http://localhost:3001/api/deleteUser", { id: data.id })
      .then((response) => {
        alert("User deleted successfully");
        getUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <Box sx={{ width: "calc(100% - 100px)", margin: "auto", marginTop: "100px" }}>
      <UserForm
        addUser={addUser}
        selectedUser={selectedUser}
        isEdit={isEdit}
        resetForm={() => {
          setIsEdit(false);
          setSelectedUser({});
        }}
        updateUser={updateUser}
      />
      <UsersTable
        rows={users}
        editUser={(user) => {
          setSelectedUser(user);
          setIsEdit(true);
        }}
        deleteUser={(user) => {
          if (window.confirm("Are you sure you want to delete this user?")) {
            deleteUser(user);
          }
        }}
      />
    </Box>
  );
};

export default Users;
