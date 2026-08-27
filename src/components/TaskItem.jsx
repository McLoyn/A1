import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  // Challenge: State lokal untuk mode edit
  const [isEditing, setIsEditing] = useState(false);
  const [judulEdit, setJudulEdit] = useState(task.judul);

  function handleSaveEdit() {
    if (judulEdit.trim()) {
      onEdit(task.id, judulEdit.trim());
      setIsEditing(false);
    }
  }

  // Challenge: Class prioritas dinamis
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Tinggi":
        return "p-high";
      case "Sedang":
        return "p-medium";
      case "Rendah":
        return "p-low";
      default:
        return "";
    }
  };

  return (
    <article className={`task-card ${task.selesai ? "done" : ""}`}>
      <div className="task-content">
        <div className="badges">
          <span className="badge">{task.mapel}</span>
          <span className={`badge priority ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
        </div>

        {/* Mode Edit vs Display */}
        {isEditing ? (
          <div className="edit-box">
            <input
              type="text"
              value={judulEdit}
              onChange={(e) => setJudulEdit(e.target.value)}
            />
            <button type="button" onClick={handleSaveEdit}>
              Simpan
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Batal
            </button>
          </div>
        ) : (
          <h3>{task.judul}</h3>
        )}

        <p className="deadline-text">📅 Deadline: {task.deadline}</p>
        <p>{task.selesai ? "Sudah selesai" : "Belum selesai"}</p>
      </div>

      <div className="task-actions">
        {!isEditing && (
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <button type="button" onClick={() => onToggle(task.id)}>
          {task.selesai ? "Batalkan" : "Tandai Selesai"}
        </button>
        <button
          type="button"
          className="danger"
          onClick={() => onDelete(task.id)}
        >
          Hapus
        </button>
      </div>
    </article>
  );
}
