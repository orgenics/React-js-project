import { useState } from 'react';

function App() {
  const [input, setInput] = useState({});
  const [list, setList] = useState([]);
  const [errors, setErrors] = useState({});

  const getInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!input.name) newErrors.name = "* Name is required";
    if (!input.profile) newErrors.profile = "* Profile picture URL is required";
    if (!input.email) newErrors.email = "* Email is required";
    else if (!/\S+@\S+\.\S+/.test(input.email)) newErrors.email = "* Enter a valid email";
    if (!input.rating) newErrors.rating = "* Rating is required";
    else if (input.rating < 1 || input.rating > 5) newErrors.rating = "* Rating must be 1–5";
    if (!input.description) newErrors.description = "* Description is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const setData = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setList([...list, input]);
    setInput({});
    setErrors({});
  };

  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Leave a Review</h2>
        <form onSubmit={setData}>
          <InputField
            type="text"
            name="name"
            placeholder="Full Name"
            value={input.name}
            onChange={getInput}
            error={errors.name}
          />
          <InputField
            type="text"
            name="profile"
            placeholder="Profile Image URL"
            value={input.profile}
            onChange={getInput}
            error={errors.profile}
          />
          <InputField
            type="email"
            name="email"
            placeholder="Email Address"
            value={input.email}
            onChange={getInput}
            error={errors.email}
          />
          <InputField
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            value={input.rating}
            onChange={getInput}
            error={errors.rating}
          />
          <TextAreaField
            name="description"
            placeholder="Write your review here..."
            value={input.description || ""}
            onChange={getInput}
            error={errors.description}
          />
          <button type="submit" style={styles.submitButton}>Submit Review</button>
        </form>
      </div>

      <h2 style={{ textAlign: "center", margin: "40px 0 20px", fontSize: "26px" }}>All Reviews</h2>
      <div style={styles.cardGrid}>
        {list.map((review, index) => (
          <div key={index} style={styles.card}>
            <img
              src={review.profile || "https://via.placeholder.com/120"}
              alt="profile"
              style={styles.profileImage}
            />
            <h3>{review.name}</h3>
            <p style={styles.email}><strong>Email:</strong> {review.email}</p>
            <div style={styles.ratingStars}>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} style={{ color: i < review.rating ? "#FFD700" : "#ddd", fontSize: "18px" }}>
                  {i < review.rating ? "★" : "☆"}
                </span>
              ))}
            </div>
            <p style={styles.description}>{review.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// error handling
function InputField({ type, name, placeholder, value, onChange, error }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        style={{
          ...styles.input,
          borderColor: error ? "red" : "#ccc",
        }}
      />
      {error && <div style={styles.errorText}>{error}</div>}
    </div>
  );
}

function TextAreaField({ name, placeholder, value, onChange, error }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={4}
        style={{
          ...styles.input,
          resize: "vertical",
          height: "100px",
          borderColor: error ? "red" : "#ccc",
        }}
      />
      {error && <div style={styles.errorText}>{error}</div>}
    </div>
  );
}

// Styles
const styles = {
  page: {
    background: "linear-gradient(135deg, #eef2f3, #d9e2ec)",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
  formContainer: {
    maxWidth: "650px",
    margin: "0 auto",
    padding: "35px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "600",
    color: "#1e3c72",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "10px",
    fontSize: "15px",
    border: "1.5px solid #d1d5db",
    outline: "none",
    backgroundColor: "#fafafa",
    transition: "border 0.3s, box-shadow 0.3s",
  },
  submitButton: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #0077cc, #005fa3)",
    color: "#fff",
    borderRadius: "10px",
    border: "none",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  submitButtonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 14px rgba(0, 119, 204, 0.3)",
  },
  errorText: {
    color: "#e63946",
    fontSize: "13px",
    marginTop: "6px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "28px",
    padding: "0 20px",
  },
  card: {
    padding: "22px",
    backgroundColor: "#fff",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    textAlign: "center",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },
  cardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
  },
  profileImage: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "12px",
    border: "3px solid #0077cc33",
  },
  ratingStars: {
    margin: "12px 0",
    fontSize: "18px",
    letterSpacing: "2px",
  },
  email: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "6px",
  },
  description: {
    fontSize: "15px",
    color: "#374151",
    fontStyle: "italic",
    marginTop: "12px",
    lineHeight: "1.5",
  },
};

export default App;