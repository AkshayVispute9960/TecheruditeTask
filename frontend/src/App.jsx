import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./auth/Login";
import AdminRegistration from "./auth/AdminRegistration";
import CustomerRegistration from "./auth/CustomerRegistration";
import CommonPage from "./pages/CommonPage";
import PropTypes from "prop-types";
import EmailVerification from "./auth/EmailVerification";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ element }) => {
  return localStorage.getItem("authToken") ? element : <Navigate to="/" />;
};

const PublicRouteValidation = ({element}) => {
  return localStorage.getItem('authToken') ? <Navigate to='/main/admin' /> : element
}

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired, 
};

PublicRouteValidation.propTypes = {
  element: PropTypes.element.isRequired
}
function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={
            <PublicRouteValidation element={<Login />} />
            
            } />
          <Route path="/admin-registration" element={
            
            <PublicRouteValidation element={<AdminRegistration />} />
            } />
          <Route
            path="/customer-registration"
            element={
              <PublicRouteValidation element={<CustomerRegistration />} />
            }
          />
          
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route
            path="/main/:userRole"
            element={<PrivateRoute element={<CommonPage />} />}
          />

          <Route path="*" element={<h1>Not Found!</h1>} />
        </Routes>
      </Router>
      <ToastContainer />
    </main>
  );
}

export default App;
