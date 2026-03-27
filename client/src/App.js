import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const [leads, setLeads] = useState([]);
  const [dark, setDark] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    source: ""
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const fetchLeads = () => {
   axios.get("https://mini-crm-backend-nuay.onrender.com/api/leads")
      .then(res => setLeads(res.data));
  };

  useEffect(() => {
    if (token) {
      fetchLeads();
    }
  }, [token]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!token) {
    return <Login setToken={setToken} />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://mini-crm-backend-nuay.onrender.com/api/leads", form)
      .then(() => {
        fetchLeads();
        setForm({ name: "", email: "", source: "" });
      });
  };

  const updateStatus = (id, status) => {
    axios.put(`https://mini-crm-backend-nuay.onrender.com/api/leads/${id}`, { status })
      .then(fetchLeads);
  };

  const deleteLead = (id) => {
    axios.delete(`http://localhost:5000/api/leads/${id}`)
      .then(fetchLeads);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const total = leads.length;
  const contacted = leads.filter(l => l.status === "contacted").length;
  const converted = leads.filter(l => l.status === "converted").length;

  const chartData = {
    labels: ["New", "Contacted", "Converted"],
    datasets: [
      {
        label: "Leads",
        data: [
          leads.filter(l => l.status === "new").length,
          leads.filter(l => l.status === "contacted").length,
          leads.filter(l => l.status === "converted").length
        ],
        backgroundColor: ["#6769f1", "#f59e0b", "#22c55e"],
        borderWidth: 1
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        minHeight: "100vh",
        background: dark
          ? "linear-gradient(135deg, #0f172a, #1e293b)"
          : "linear-gradient(135deg, #667eea, #764ba2)",
        color: dark ? "white" : "black",
        padding: "20px"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>🚀 MINI CRM</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setDark(!dark)} style={toggleBtn}>
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button onClick={logout} style={logoutBtn}>Logout</button>
        </div>
      </div>

      <div style={statsContainer}>
        <div style={statCard}>Total: {total}</div>
        <div style={statCard}>Contacted: {contacted}</div>
        <div style={statCard}>Converted: {converted}</div>
      </div>

      <div style={glass}>
        <h2 style={{ marginBottom: "15px" }}>Analytics</h2>
        <div style={{ width: "300px", margin: "0 auto" }}>
          <Pie data={chartData} />
        </div>
      </div>

      <div style={glass}>
        <h2>Add Lead</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} style={input}/>
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} style={input}/>
          <input name="source" placeholder="Source" value={form.source} onChange={handleChange} style={input}/>
          <button style={addBtn}>Add Lead</button>
        </form>
      </div>

      <div style={grid}>
        {leads.map((lead) => (
          <motion.div
            key={lead._id}
            style={card}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3>{lead.name}</h3>
            <p>{lead.email}</p>
            <p><b>Message:</b> {lead.notes}</p>
            <span style={badge(lead.status)}>
              {lead.status}
            </span>
            <div>
              <button style={contactBtn} onClick={() => updateStatus(lead._id, "contacted")}>Contacted</button>
              <button style={convertBtn} onClick={() => updateStatus(lead._id, "converted")}>Converted</button>
              <button style={deleteBtn} onClick={() => deleteLead(lead._id)}>Delete</button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

const toggleBtn = {
  padding: "8px 12px",
  margin: "5px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: "rgba(255,255,255,0.3)",
  color: "white"
};

const logoutBtn = {
  padding: "8px 12px",
  margin: "5px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const statsContainer = {
  display: "flex",
  justifyContent: "space-around",
  margin: "20px 0",
  gap: "20px"
};

const statCard = {
  background: "rgba(255,255,255,0.2)",
  padding: "15px 20px",
  borderRadius: "10px",
  backdropFilter: "blur(10px)",
  textAlign: "center",
  flex: 1
};

const glass = {
  background: "rgba(255,255,255,0.2)",
  padding: "20px",
  borderRadius: "15px",
  backdropFilter: "blur(10px)",
  marginBottom: "20px"
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "8px",
  border: "none",
  boxSizing: "border-box"
};

const addBtn = {
  width: "100%",
  padding: "10px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "10px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "15px"
};

const card = {
  background: "rgba(255,255,255,0.2)",
  padding: "20px",
  borderRadius: "15px",
  backdropFilter: "blur(10px)",
  textAlign: "center"
};

const badge = (status) => ({
  padding: "5px 10px",
  borderRadius: "20px",
  background:
    status === "converted"
      ? "#22c55e"
      : status === "contacted"
      ? "#f59e0b"
      : "#6b7280",
  color: "white",
  display: "inline-block",
  marginTop: "10px"
});

const contactBtn = { 
  margin: "5px", 
  padding: "5px 10px", 
  background: "#f59e0b", 
  color: "white", 
  border: "none", 
  borderRadius: "5px",
  cursor: "pointer"
};
const convertBtn = { 
  margin: "5px", 
  padding: "5px 10px", 
  background: "#22c55e", 
  color: "white", 
  border: "none", 
  borderRadius: "5px",
  cursor: "pointer"
};
const deleteBtn = { 
  margin: "5px", 
  padding: "5px 10px", 
  background: "#ef4444", 
  color: "white", 
  border: "none", 
  borderRadius: "5px",
};

export default App;
