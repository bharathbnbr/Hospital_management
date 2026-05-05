import { useEffect, useState } from "react";
import API from "../../api/api";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../layout/DashboardLayout";

export default function DischargePatient() {
    const [patients, setPatients] = useState([]);
    const [loadingId, setLoadingId] = useState(null);

    // ✅ Fetch patients
    const fetchPatients = async () => {
        try {
            const res = await API.get("/patients");
            setPatients(res.data);
        } catch (err) {
            toast.error("Failed to load patients");
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    // ✅ Discharge patient
    const handleDischarge = async (id) => {
        try {
            setLoadingId(id);

            await API.put(`/patients/${id}/discharge`);

            toast.success("Patient discharged successfully");

            // refresh list
            fetchPatients();
        } catch (err) {
            toast.error("Discharge failed");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">Discharge Patients</h1>

            <div className="bg-white rounded-xl shadow p-4">
                {patients.length === 0 ? (
                    <p className="text-gray-500">No patients found</p>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3">Name</th>
                                <th className="p-3">Age</th>
                                <th className="p-3">Disease</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {patients.map((p) => (
                                <tr key={p._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{p.name}</td>
                                    <td className="p-3">{p.age}</td>
                                    <td className="p-3">{p.disease}</td>

                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded text-white text-sm ${p.status === "admitted"
                                                ? "bg-green-500"
                                                : "bg-gray-500"
                                                }`}
                                        >
                                            {p.status}
                                        </span>
                                    </td>

                                    <td className="p-3">
                                        {p.status === "admitted" && (
                                            <button
                                                onClick={() => handleDischarge(p._id)}
                                                disabled={loadingId === p._id}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                {loadingId === p._id
                                                    ? "Processing..."
                                                    : "Discharge"}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </DashboardLayout>
    );
}