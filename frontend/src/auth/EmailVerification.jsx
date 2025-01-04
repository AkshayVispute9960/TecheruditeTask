import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

const EmailVerification = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const getQueryParams = (param) => {
        const queryParams = new URLSearchParams(location.search);
        return queryParams.get(param);
      };
      
      const token = getQueryParams('token');

      useEffect(() => {
        if (token) {
            setLoading(true);
          axios.get(`/api/auth/verify-email/?token=${token}`)
            .then(() => {
              
              setLoading(false);
              toast.success('Email Verified Successfully!', {
                            position: "top-right",
                            autoClose: 3000,  // Automatically close after 3 seconds
                          });
            })
            .catch(error => {
                toast.error(error?.response?.data?.message, {
                    position: "top-right",
                    autoClose: 3000,
                  });
              
              setLoading(false);
            });
        } else {
            navigate('/')
        }
      }, [token]);

      if(loading){
        return (
          <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
        )
      }

  return (
    <div>Email Verified Successfully!</div>
  )
}

export default EmailVerification