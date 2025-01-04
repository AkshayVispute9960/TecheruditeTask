import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";

const CustomerRegistration = () => {
  const navigate = useNavigate();
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  //loading
  const [loading, setLoading] = useState(false);

  const handleCustomerRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
 const res = await axios.post('http://localhost:3000/api/auth/register', {
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        password: passwordValue,
        role: 'customer'
      });
      
      toast.success(res?.data?.message, {
              position: "top-right",
              autoClose: 3000,  // Automatically close after 3 seconds
            });
      navigate('/');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 3000,
      });
      
    }
  }

  if(loading){
    return (
      <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    )
  }

  return (
    <Box
      sx={{
        p: 2,
        width: "100%",
      }}
    >
      <Typography variant="h4">Customer Registration</Typography>
      <form onSubmit={handleCustomerRegistration}>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <Grid size={12}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            type="text"
            value={firstNameValue}
            onChange={(e) => setFirstNameValue(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            type="text"
            value={lastNameValue}
            onChange={(e) => setLastNameValue(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </Grid>
      </Grid>
      </form>
      <Grid sx={{mt: 2}}>
      <Link to='/'>Login</Link>
      </Grid>
    </Box>
  );
};

export default CustomerRegistration;
