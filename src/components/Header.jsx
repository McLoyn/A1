export default function Header({ total, selesai, belumSelesai, progress }) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">REACT PROJECT XI RPL</p>
        <h1>TaskBoard Kelas</h1>
        <p>Catat, kerjakan, dan pantau progres tugasmu.</p>
      </div>

      <div className="stats-box">
        <div className="stats">
          <strong>
            {selesai}/{total}
          </strong>
          <span>Selesai ({belumSelesai} Belum)</span>
        </div>

        {/* Challenge: Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <small className="progress-text">{progress}% Terkerjakan</small>
      </div>
    </header>
  );
}
