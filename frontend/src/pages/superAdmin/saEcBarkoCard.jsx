import '../../styles/ecBarko-card.css';
import profile from '../../assets/imgs/profile.png';
import { useState } from 'react';

export default function AdminEcBarkoCard() {
  const [accounts, setAccounts] = useState([
    {
      name: "Nisha Kumari",
      id: "1001",
      cardNumber: "1234-5678-9101",
      balance: "₱30,000.00",
      type: "Type 1",
      status: "active",
      lastActive: "2025-02-18",
    },
    {
      name: "Sophia",
      id: "1002",
      cardNumber: "1234-5678-9102",
      balance: "₱0.00",
      type: "Type 2",
      status: "deactivated",
      lastActive: "2025-02-18",
    },
    {
      name: "Rudra Pratap",
      id: "1003",
      cardNumber: "1234-5678-9103",
      balance: "₱30,000.00",
      type: "Type 3",
      status: "active",
      lastActive: "2025-02-18",
    },
    {
      name: "Trisha Norton",
      id: "1004",
      cardNumber: "1234-5678-9104",
      balance: "₱30,000.00",
      type: "Type 1",
      status: "active",
      lastActive: "2025-02-18",
    },
    {
      name: "Jolene Orr",
      id: "1005",
      cardNumber: "1234-5678-9105",
      balance: "₱30,000.00",
      type: "Type 4",
      status: "deactivated",
      lastActive: "2025-02-18",
    },
    {
      name: "Elvin Bond",
      id: "1006",
      cardNumber: "1234-5678-9106",
      balance: "₱0.00",
      type: "Type 1",
      status: "active",
      lastActive: "2025-02-18",
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [showActivatePopup, setShowActivatePopup] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");

  const reasons = ["Lost Card", "Other"];

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

  const handleDeactivate = () => {
    if (selectedAccount && selectedReason) {
      updateStatus(selectedAccount.id, "deactivated");
      setShowPopup(false);
      alert(`Account ${selectedAccount.name} deactivated due to ${selectedReason}`);
    } else {
      alert("Please select a reason for deactivation.");
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
    <div className="ecbarko">
      <main>
        <div className="head-title">
          <div className="left">
            <h1>EcBarko Card</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Cards</a>
              </li>
            </ul>
          </div>
          <a href="#" className="btn-download">
            <i className="bx bxs-cloud-download"></i>
            <span className="text">Download PDF</span>
          </a>
        </div>

        <div className="card-table">
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
                  <th>Account</th>
                  <th>Card Number</th>
                  <th>Balance</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Last Active</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id}>
                    <td>
                      <img src={profile} alt={account.name} />
                      {account.name}
                    </td>
                    <td>{account.cardNumber}</td>
                    <td>{account.balance}</td>
                    <td>{account.type}</td>
                    <td>
                      <span
                        className={`status ${account.status}`}
                        onClick={() => toggleStatus(account.id)}
                        style={{ cursor: 'pointer' }}
                        title={`Click to ${account.status === 'active' ? 'deactivate' : 'activate'}`}
                      >
                        {account.status}
                      </span>
                    </td>
                    <td>{account.lastActive}</td>
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
              <button className="deactivate" onClick={handleDeactivate}>Deactivate</button>
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
