import { useEffect, useState } from "react";
import API from "../../api/api";
import BedCard from "../../components/BedCard";
import DashboardLayout from "../../layout/DashboardLayout";

export default function AdminDashboard() {
    const [beds, setBeds] = useState([]);

    useEffect(() => {
        API.get("/beds").then(res => setBeds(res.data));
    }, []);

    return (
        <DashboardLayout>
            <h1 className="text-2xl mb-4">Admin Dashboard</h1>

            <div className="grid grid-cols-3 gap-4">
                {beds.map(b => <BedCard key={b._id} bed={b} />)}
            </div>
        </DashboardLayout>
    );
}