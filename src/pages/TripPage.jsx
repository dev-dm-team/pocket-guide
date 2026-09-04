// src/pages/TripPage.jsx
import { useParams } from "react-router-dom";

export default function TripPage() {
  const { id } = useParams();

  return (
    <div style={{ padding: "2rem" }}>
      <p>Voyage : {id}</p>
      <p>À implémenter en #19</p>
    </div>
  );
}
