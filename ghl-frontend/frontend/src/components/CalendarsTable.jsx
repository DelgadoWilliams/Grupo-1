// src/components/CalendarsTable.jsx
import { useEffect, useState } from "react";
import api from "../api";

function CalendarsTable() {
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get("/ghl/calendars/")
      .then((res) => {
        if (!mounted) return;
        // res.data puede ser lista o un objeto con key -> ajusta si tu backend devuelve otra forma
        setCalendars(Array.isArray(res.data) ? res.data : []);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 401) {
          setError("⚠️ Token inválido o expirado");
        } else {
          setError("❌ Error al cargar calendarios");
        }
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>📅 Calendarios</h2>
      {loading && <p>⏳ Cargando...</p>}
      {error && <p className="msg-error">{error}</p>}

      <table className="table" style={{ marginTop: 12 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {calendars.length === 0 && !loading ? (
            <tr><td colSpan="3">No hay calendarios disponibles</td></tr>
          ) : (
            calendars.map((cal) => (
              <tr key={cal.id ?? cal._id ?? JSON.stringify(cal)}>
                <td>{cal.id ?? cal._id ?? "-"}</td>
                <td>{cal.name ?? cal.nombre ?? cal.title ?? "-"}</td>
                <td>{cal.status ?? cal.state ?? (cal.active ? "Activo" : "Inactivo") ?? "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CalendarsTable;
