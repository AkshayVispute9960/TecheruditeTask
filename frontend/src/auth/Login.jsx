import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  //loading
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post('http://localhost:3000/api/auth/login', {
        email: emailValue,
        password: passwordValue,
      });
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 3000,  // Automatically close after 3 seconds
      });
     
      localStorage.setItem('authToken', data?.data?.token);
      navigate('/main/admin');
      setLoading(false);
      
    } catch (error) {
 
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 3000,
      });
      setLoading(false);
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
      <form onSubmit={handleLogin}>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
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
            Login
          </Button>
        </Grid>
      </Grid>
      </form>
      <Grid container spacing={2} sx={{ justifyContent: "center", mt: 2 }}>
      <Grid size={12}sx={{}}>
      <Link to='/admin-registration'>Admin Registration</Link>
      </Grid>
      <Grid size={12}>
      <Link to='/customer-registration'>Customer Registration</Link>
      </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
