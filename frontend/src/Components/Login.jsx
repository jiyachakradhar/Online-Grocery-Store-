import React, { useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Attempt:", { email, password });
    // Add API call here for authentication
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
      <Paper
        elevation={6}
        sx={{
          padding: "2.5rem",
          borderRadius: "1rem",
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
          width: { xs: "90vw", sm: "60vw", md: "40vw", lg: "30vw", xl: "25vw" },
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="600" mb={2}>
          Welcome Back!
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={3}>
          Please enter your credentials to login.
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              fontSize: "1.2rem",
              fontWeight: "700",
              backgroundColor: "green",
              borderRadius: "0.5rem",
              "&:hover": { backgroundColor: "#006400" }, // Darker green on hover
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
