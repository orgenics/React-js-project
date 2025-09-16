// App.jsx
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const increase = () => setCount(count + 1);

  const decrease = () => {
    if (count <= 0) {
      alert("Number can't be less than 0!");
    } else {
      setCount(count - 1);
    }
  };

  const reset = () => setCount(0);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Counter App</h1>
        <h2 style={styles.number}>{count}</h2>
        <div style={styles.btnGroup}>
          <button onClick={increase} style={{ ...styles.btn, background: '#4caf50' }}>Increase</button>
          <button onClick={decrease} style={{ ...styles.btn, background: '#f44336' }}>Decrease</button>
          <button onClick={reset} style={{ ...styles.btn, background: '#2196f3' }}>Reset</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e1e2f, #2a2a3d)",
    color: "#fff",
    fontFamily: "Arial, sans-serif"
  },
  card: {
    background: "#2f2f46",
    padding: "40px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
    minWidth: "300px"
  },
  title: {
    marginBottom: "20px",
    fontSize: "28px"
  },
  number: {
    fontSize: "48px",
    margin: "20px 0"
  },
  btnGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px"
  },
  btn: {
    flex: 1,
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.2s"
  }
};

export default App;
