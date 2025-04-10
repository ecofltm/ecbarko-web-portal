import "../syles/sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";  // Add useNavigate here
import logo from '../../assets/imgs/logo.png';
import profile from '../../assets/imgs/profile.png';
import { Logout } from '../../redux/AuthSlice';
import { useSelector, useDispatch } from 'react-redux';
import { post } from '../../services/ApiEndpoint';

export default function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize navigate here
  const user = useSelector((state) => state.Auth.user);

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = async () => {
    try {
      const request = await post('/api/auth/logout');
      const response = request.data;
      if (request.status === 200) {
        dispatch(Logout());
        navigate('/login');  // Use navigate here
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <img src={logo} alt="EcBarko Logo" />
        <span className="text">EcBarko</span>
      </div>

      <div className="profile">
        <img src={profile} alt="Profile" />
        <h1>{user?.name || "Nisha Kumari"}</h1>
        <p>Ticket Clerk</p>
      </div>

      <ul className="side-menu top">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">
            <i className="bx bxs-dashboard"></i>
            <span className="text">Dashboard</span>
          </Link>
        </li>
        <li className={isActive("/users") ? "active" : ""}>
          <Link to="/users">
            <i className="bx bxs-user"></i>
            <span className="text">Users</span>
          </Link>
        </li>
        <li className={isActive("/ecbarko-card") ? "active" : ""}>
          <Link to="/ecbarko-card">
            <i className="bx bxs-card"></i>
            <span className="text">Ecbarko Cards</span>
          </Link>
        </li>
        <li className={isActive("/vehicles") ? "active" : ""}>
          <Link to="/vehicles">
            <i className="bx bxs-car"></i>
            <span className="text">Vehicles</span>
          </Link>
        </li>
        <li className={isActive("/schedule") ? "active" : ""}>
          <Link to="/schedule">
            <i className="bx bxs-calendar"></i>
            <span className="text">Schedule</span>
          </Link>
        </li>
      </ul>

      <ul className="side-menu">
        <li className={isActive("/settings") ? "active" : ""}>
          <Link to="/settings">
            <i className="bx bxs-cog"></i>
            <span className="text">Settings</span>
          </Link>
        </li>
        <li className="logout-item">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </button>
        </li>
      </ul>
    </aside>
  );
}
