import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = async () => {
        const { name, email, password, confirmPassword } = form;

        if (!name || !email || !password || !confirmPassword) {
            alert("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await API.post("/auth/register", { name, email, password });
            alert("Registration successful");
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.msg || "Error registering user");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Register</h2>

                <div style={styles.formGroup}>
                    <label>Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label>Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        style={styles.input}
                    />
                </div>

                <button onClick={submit} style={styles.button}>
                    Register
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        marginTop: "40px"
    },
    card: {
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        width: "350px"
    },
    title: {
        textAlign: "center",
        marginBottom: "20px"
    },
    formGroup: {
        marginBottom: "15px",
        display: "flex",
        flexDirection: "column"
    },
    input: {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginTop: "5px"
    },
    button: {
        width: "100%",
        padding: "12px",
        background: "#16a34a",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold"
    }
};