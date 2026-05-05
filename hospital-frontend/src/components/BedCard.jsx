export default function BedCard({ bed }) {
    const color =
        bed.status === "available"
            ? "bg-green-500"
            : "bg-red-500";

    return (
        <div className={`p-4 rounded text-white ${color}`}>
            <h3>Bed #{bed.bedNumber}</h3>
            <p>{bed.status}</p>
        </div>
    );
}