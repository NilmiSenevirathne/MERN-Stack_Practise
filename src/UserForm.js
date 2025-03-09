import { Grid, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const UserForm = ({ addUser, selectedUser, isEdit, resetForm, updateUser }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setId(selectedUser.id);
      setName(selectedUser.name);
    } else {
      setId("");
      setName("");
    }
  }, [selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name is required!");
      return;
    }

    const userData = { id, name };
    if (isEdit) {
      updateUser(userData);
    } else {
      addUser(userData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ backgroundColor: "#fff", padding: "20px", marginBottom: "30px" }}>
        <Grid item xs={12}>
          <Typography variant="h5">{isEdit ? "Edit User" : "Add User"}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="ID"
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={isEdit}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" sx={{ marginRight: "10px" }}>
            {isEdit ? "Update" : "Submit"}
          </Button>

          {isEdit && (
            <Button variant="outlined" color="secondary" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default UserForm;
