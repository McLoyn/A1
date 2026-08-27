import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [judul, setJudul] = useState("");
  const [mapel, setMapel] = useState("Pemrograman Web");
  const [priority, setPriority] = useState("Sedang");
  const [deadline, setDeadline] = useState("");

  // Challenge: Validasi Error
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const judulBersih = judul.trim();

    // Validasi input
    if (!judulBersih) {
      setErrorMessage("Judul tugas tidak boleh kosong!");
      return;
    }

    const taskBaru = {
      id: Date.now(),
      judul: judulBersih,
      mapel,
      priority,
      deadline: deadline || "Tanpa Deadline",
      selesai: false,
    };

    onAddTask(taskBaru);

    // Reset form
    setJudul("");
    setDeadline("");
    setErrorMessage("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {/* Challenge: Conditional Rendering Pesan Error */}
      {errorMessage && <div className="error-banner">{errorMessage}</div>}

      <div className="form-inputs">
        <input
          type="text"
          placeholder="Judul Tugas..."
          value={judul}
          onChange={(e) => {
            setJudul(e.target.value);
            if (errorMessage) setErrorMessage("");
          }}
        />

        <select value={mapel} onChange={(e) => setMapel(e.target.value)}>
          <option>Pemrograman Web</option>
          <option>Basis Data</option>
          <option>PBO</option>
        </select>

        {/* Challenge: Field Prioritas */}
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Rendah">Prioritas Rendah</option>
          <option value="Sedang">Prioritas Sedang</option>
          <option value="Tinggi">Prioritas Tinggi</option>
        </select>

        {/* Challenge: Field Deadline */}
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <button type="submit">+ Tambah Tugas</button>
      </div>
    </form>
  );
}
