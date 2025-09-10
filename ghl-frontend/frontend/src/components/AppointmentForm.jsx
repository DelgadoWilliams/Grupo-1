// src/components/AppointmentForm.jsx
import { useState } from "react";
import api from "../api";

function AppointmentForm() {
  const [formData, setFormData] = useState({
    calendarId: "",
    contactId: "",
    startTime: "",
    endTime: ""
  });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setBusy(true);

    try {
      // Convertir datetime-local (local) a ISO
      const payload = {
        calendarId: formData.calendarId,
        contactId: formData.contactId,
        startTime: new Date(formData.startTime).toISOString(),
        endTime: new Date(formData.endTime).toISOString()
      };

      const res = await api.post("/ghl/appointments/create/", payload);
      console.log("create appointment response:", res.data);
      setMessage("✅ Cita creada con éxito");
      setFormData({ calendarId: "", contactId: "", startTime: "", endTime: "" });
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setMessage("⚠️ Token inválido o expirado");
      } else {
        // Si tu backend devuelve detalles, muéstralos
        const detail = err.response?.data?.detail || "";
        setMessage("❌ Error al crear la cita. " + detail);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>📝 Crear cita</h2>

      {message && <p className={message.startsWith("✅") ? "msg-success" : "msg-error"}>{message}</p>}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <div>
          <label>Calendar ID</label>
          <input className="input" name="calendarId" value={formData.calendarId} onChange={handleChange} required />
        </div>

        <div>
          <label>Contact ID</label>
          <input className="input" name="contactId" value={formData.contactId} onChange={handleChange} required />
        </div>

        <div>
          <label>Start time</label>
          <input className="input" type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required />
        </div>

        <div>
          <label>End time</label>
          <input className="input" type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required />
        </div>

        <button className="button" type="submit" disabled={busy}>
          {busy ? "Creando..." : "Crear cita"}
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
