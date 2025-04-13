import { useState } from "react";
import '../../styles/TicketClerks.css';
import profile from '../../assets/imgs/profile.png';

export default function TicketClerks() {
  const [showPopup, setShowPopup] = useState(false);
  const [showActivatePopup, setShowActivatePopup] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");

  const [accounts, setAccounts] = useState([
    { name: "Nisha Kumari", id: "TC123", status: "active" },
    { name: "Rudra Pratap", id: "TC124", status: "active" },
    { name: "Trisha Norton", id: "TC125", status: "active" },
  ]);

  const reasons = ["Other"];

  const toggleStatus = (id) => {
    const account = accounts.find((account) => account.id === id);
    setSelectedAccount(account);

    if (account.status === "deactivated") {
      setShowActivatePopup(true);
    } else if (account.status === "active") {
      setShowPopup(true);
    }
  };

  const updateStatus = (id, newStatus) => {
    setAccounts((prev) =>
      prev.map((account) => {
        if (account.id === id) {
          return { ...account, status: newStatus };
        }
        return account;
      })
    );
  };

  const handleSuspend = () => {
    if (selectedAccount && selectedReason) {
      updateStatus(selectedAccount.id, "deactivated");
      setShowPopup(false);
      alert(`Account ${selectedAccount.name} deactivated due to ${selectedReason}`);
    } else {
      alert("Please select a reason for suspension.");
    }
  };

  const handleActivate = () => {
    if (selectedAccount) {
      updateStatus(selectedAccount.id, "active");
      setShowActivatePopup(false);
      alert(`Account ${selectedAccount.name} has been activated.`);
    }
  };

  return (
    <div className="content">
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Ticket Clerks</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Ticket Clerks</a>
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
                  <th>Ticket Clerk Name</th>
                  <th>Ticket Clerk ID</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id} onClick={() => toggleStatus(account.id)}>
                    <td>
                      <img src={profile} alt="Profile" />
                      <p>{account.name}</p>
                    </td>
                    <td>{account.id}</td>
                    <td>example@email.com</td>
                    <td>{account.id}</td>
                    <td>Ticket Clerk</td>
                    <td>
                      <span className={`status ${account.status}`}>{account.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showPopup && selectedAccount && selectedAccount.status === "active" && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Deactivate {selectedAccount.name}?</h3>
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
              <button className="deactivate" onClick={handleSuspend}>Deactivate</button>
            </div>
          </div>
        </div>
      )}

      {showActivatePopup && selectedAccount && selectedAccount.status === "deactivated" && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Activate {selectedAccount.name}?</h3>
            <p>Are you sure you want to activate this account?</p>
            <div className="popup-actions">
              <button onClick={() => setShowActivatePopup(false)}>Cancel</button>
              <button className="activate" onClick={handleActivate}>Activate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
