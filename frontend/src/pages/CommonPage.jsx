import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const CommonPage = () => {
  const { userRole } = useParams();
  const navigate = useNavigate()
  return <div>
    {userRole}
    <p>
      <Button variant="outlined" onClick={() => {
        navigate('/')
        localStorage.removeItem('authToken');
      }}>
        Logout
      </Button>
    </p>
    </div>;
};

export default CommonPage;
