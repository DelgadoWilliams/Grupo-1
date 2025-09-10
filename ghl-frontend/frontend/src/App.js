// src/App.jsx
import CalendarsTable from "./components/CalendarsTable";
import AppointmentForm from "./components/AppointmentForm";

function App() {
  return (
    <div className="app">
      {/* sidebar */}
      <aside className="sidebar">
        <div className="logo">GHL Demo</div>
        <nav>
          <a href="#calendarios" style={{ display: "block", marginBottom: 12 }}>📅 Calendarios</a>
          <a href="#citas" style={{ display: "block" }}>📝 Crear cita</a>
        </nav>
      </aside>

      {/* main */}
      <main className="main">
        <h1 style={{ marginTop: 0 }}>Integración React + Django + GHL</h1>

        <section id="calendarios" className="card">
          <CalendarsTable />
        </section>

        <section id="citas" className="card">
          <AppointmentForm />
        </section>
      </main>
    </div>
  );
}

export default App;
