import { useState, useEffect, useMemo, useCallback } from "react";
import API from "../../api/api";
import DashboardLayout from "../../layout/DashboardLayout";

export default function AdmitPatient() {
    const initialForm = {
        name: "",
        age: "",
        disease: "",
        bedId: ""
    };

    const [beds, setBeds] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);

    // Fetch beds
    useEffect(() => {
        const fetchBeds = async () => {
            try {
                const res = await API.get("/beds");
                setBeds(res.data);
            } catch (err) {
                console.error("Failed to fetch beds", err);
            }
        };
        fetchBeds();
    }, []);

    // Memoized available beds (performance)
    const availableBeds = useMemo(
        () => beds.filter(b => b.status === "available"),
        [beds]
    );

    // Handle input change (optimized)
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }, []);

    // Validation
    const validateForm = () => {
        const ageNum = Number(form.age);

        if (!form.name.trim()) return "Name is required";
        if (!form.disease.trim()) return "Disease is required";
        if (!form.bedId) return "Please select a bed";

        if (!ageNum || ageNum < 0 || ageNum > 120) {
            return "Age must be between 1 and 120";
        }

        return null;
    };

    // Submit handler
    const submit = async () => {
        const error = validateForm();
        if (error) {
            alert(error);
            return;
        }

        try {
            setLoading(true);

            await API.post("/patients", {
                ...form,
                age: Number(form.age)
            });

            alert("Patient admitted successfully");

            setForm(initialForm);
        } catch (err) {
            console.error(err);
            alert("Failed to admit patient");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div style={styles.container}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Admit Patient</h2>

                    <div style={styles.formGroup}>
                        <label>Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter patient name"
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Age</label>
                        <input
                            name="age"
                            type="number"
                            value={form.age}
                            onChange={handleChange}
                            placeholder="Enter age (1-120)"
                            style={styles.input}
                            min="1"
                            max="120"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Disease</label>
                        <input
                            name="disease"
                            value={form.disease}
                            onChange={handleChange}
                            placeholder="Enter disease"
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Select Bed</label>
                        <select
                            name="bedId"
                            value={form.bedId}
                            onChange={handleChange}
                            style={styles.input}
                        >
                            <option value="">-- Select Bed --</option>
                            {availableBeds.map(b => (
                                <option key={b._id} value={b._id}>
                                    Bed {b.bedNumber}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={submit}
                        style={styles.button}
                        disabled={loading}
                    >
                        {loading ? "Admitting..." : "Admit Patient"}
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
}

// Styles (slightly improved UX)
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f6f8"
    },
    card: {
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        width: "360px"
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
        borderRadius: "6px",
        border: "1px solid #ccc",
        marginTop: "5px"
    },
    button: {
        width: "100%",
        padding: "12px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold"
    }
};