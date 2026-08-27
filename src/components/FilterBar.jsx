export default function FilterBar({
  filter,
  onFilterChange,
  filterPriority,
  onPriorityChange,
  search,
  onSearchChange,
  onDeleteCompleted,
  hasCompleted,
}) {
  const pilihanStatus = [
    { value: "semua", label: "Semua" },
    { value: "belum", label: "Belum Selesai" },
    { value: "selesai", label: "Selesai" },
  ];

  return (
    <div className="filter-section">
      <div className="filter-bar">
        {/* Challenge: Input Pencarian */}
        <input
          type="text"
          className="search-input"
          placeholder="Cari berdasarkan judul..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {/* Filter Status */}
        {pilihanStatus.map((item) => (
          <button
            key={item.value}
            type="button"
            className={filter === item.value ? "active" : ""}
            onClick={() => onFilterChange(item.value)}
          >
            {item.label}
          </button>
        ))}

        {/* Challenge: Filter Prioritas */}
        <select
          value={filterPriority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="select-filter"
        >
          <option value="semua">Semua Prioritas</option>
          <option value="Tinggi">Tinggi</option>
          <option value="Sedang">Sedang</option>
          <option value="Rendah">Rendah</option>
        </select>

        {/* Challenge: Tombol Hapus Semua Selesai */}
        {hasCompleted && (
          <button
            type="button"
            className="danger-clear-btn"
            onClick={onDeleteCompleted}
          >
            Hapus Semua Selesai
          </button>
        )}
      </div>
    </div>
  );
}
