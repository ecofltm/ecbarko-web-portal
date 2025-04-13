import { useState } from "react";
import '../../styles/Admins.css';
import profile from '../../assets/imgs/profile.png';

const Admins = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showActivatePopup, setShowActivatePopup] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");

  const [adminData, setAdminData] = useState([
    {
      name: "Cherish Sarmiento",
      id: "Admin1",
      email: "example@email.com",
      password: "Admin_1",
      role: "Admin",
      status: "active"
    },
    {
      name: "Ma. Katrina Lara",
      id: "Admin2",
      email: "example@email.com",
      password: "Admin_2",
      role: "Admin",
      status: "active"
    },
    {
      name: "Aliyah Picante",
      id: "Admin3",
      email: "example@email.com",
      password: "Admin_3",
      role: "Admin",
      status: "active"
    },
  ]);

  const reasons = ["Other"];

  const toggleStatus = (id) => {
    const admin = adminData.find((admin) => admin.id === id);
    setSelectedAdmin(admin);

    if (admin.status === "active") {
      setShowPopup(true);
    } else {
      setShowActivatePopup(true);
    }
  };

  const updateStatus = (id, newStatus) => {
    setAdminData((prev) =>
      prev.map((admin) =>
        admin.id === id ? { ...admin, status: newStatus } : admin
      )
    );
  };

  const handleDeactivate = () => {
    if (selectedAdmin && selectedReason) {
      updateStatus(selectedAdmin.id, "deactivated");
      setShowPopup(false);
      alert(`Admin ${selectedAdmin.name} deactivated due to ${selectedReason}`);
    } else {
      alert("Please select a reason.");
    }
  };

  const handleActivate = () => {
    if (selectedAdmin) {
      updateStatus(selectedAdmin.id, "active");
      setShowActivatePopup(false);
      alert(`Admin ${selectedAdmin.name} has been activated.`);
    }
  };

  return (
    <div className="content">
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Admins</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#" className="active">Admins</a>
              </li>
            </ul>
          </div>
          <a href="#" className="btn-download">
            <i className="bx bxs-cloud-download"></i>
            <span className="text">Download PDF</span>
          </a>
        </div>

        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Accounts</h3>
              <i className="bx bx-search"></i>
              <i className="bx bx-filter"></i>
              <i className="bx bx-plus"></i>
              <i className="bx bx-pencil"></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Admin Name</th>
                  <th>Admin ID</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {adminData.map((admin) => (
                  <tr key={admin.id} onClick={() => toggleStatus(admin.id)}>
                    <td>
                      <img src={profile} alt="Profile" />
                      <p>{admin.name}</p>
                    </td>
                    <td>{admin.id}</td>
                    <td>{admin.email}</td>
                    <td>{admin.password}</td>
                    <td>{admin.role}</td>
                    <td>
                      <span className={`status ${admin.status}`}>
                        {admin.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showPopup && selectedAdmin && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Deactivate {selectedAdmin.name}?</h3>
            <p>Reason for deactivation:</p>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
            >
              <option value="">Select Reason</option>
              {reasons.map((reason, index) => (
                <option key={index} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
            <div className="popup-actions">
              <button onClick={() => setShowPopup(false)}>Cancel</button>
              <button className="deactivate" onClick={handleDeactivate}>Deactivate</button>
            </div>
          </div>
        </div>
      )}

      {showActivatePopup && selectedAdmin && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Activate {selectedAdmin.name}?</h3>
            <p>Are you sure you want to activate this admin?</p>
            <div className="popup-actions">
              <button onClick={() => setShowActivatePopup(false)}>Cancel</button>
              <button className="activate" onClick={handleActivate}>Activate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admins;
