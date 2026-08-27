import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import Pagination from "./components/Pagination";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      judul: "Membuat desain halaman login",
      mapel: "Web",
      selesai: false,
      priority: "Tinggi",
      deadline: "2026-09-01",
    },
    {
      id: 2,
      judul: "Membuat class Product",
      mapel: "PBO",
      selesai: true,
      priority: "Sedang",
      deadline: "2026-08-30",
    },
  ]);

  const [filter, setFilter] = useState("semua");
  const [filterPriority, setFilterPriority] = useState("semua");
  const [search, setSearch] = useState("");

  // State Mode Gelap/Terang ('dark' atau 'light')
  const [theme, setTheme] = useState("dark");

  // State Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4; // Jumlah tugas per halaman

  // Toggle Mode Gelap / Terang
  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }

  // Terapkan attribute data-theme di elemen root HTML
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Handler CRUD Tugas
  function handleAddTask(taskBaru) {
    setTasks((prevTasks) => [...prevTasks, taskBaru]);
    setCurrentPage(1); // Reset ke halaman 1 saat tugas baru ditambah
  }

  function handleToggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, selesai: !task.selesai } : task,
      ),
    );
  }

  function handleDeleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function handleDeleteAllCompleted() {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.selesai));
  }

  function handleEditTask(id, judulBaru) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, judul: judulBaru } : task,
      ),
    );
  }

  // Filter Data
  const filteredTasks = tasks.filter((task) => {
    const matchStatus =
      filter === "selesai"
        ? task.selesai
        : filter === "belum"
          ? !task.selesai
          : true;
    const matchPriority =
      filterPriority === "semua" ? true : task.priority === filterPriority;
    const matchSearch = task.judul.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchPriority && matchSearch;
  });

  // Logika Pagination
  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTasks = filteredTasks.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Derived Data
  const totalCount = tasks.length;
  const selesaiCount = tasks.filter((task) => task.selesai).length;
  const belumSelesaiCount = totalCount - selesaiCount;
  const progressPercent =
    totalCount === 0 ? 0 : Math.round((selesaiCount / totalCount) * 100);

  return (
    <div className="app-shell">
      {/* Tombol Toggle Theme UI */}
      <div className="theme-toggle-container">
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          [ SYSTEM MODE: {theme === "dark" ? "DARK_TECH" : "LIGHT_TECH"} ]
        </button>
      </div>

      <Header
        total={totalCount}
        selesai={selesaiCount}
        belumSelesai={belumSelesaiCount}
        progress={progressPercent}
      />

      <TaskForm onAddTask={handleAddTask} />

      <FilterBar
        filter={filter}
        onFilterChange={(val) => {
          setFilter(val);
          setCurrentPage(1);
        }}
        filterPriority={filterPriority}
        onPriorityChange={(val) => {
          setFilterPriority(val);
          setCurrentPage(1);
        }}
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        onDeleteCompleted={handleDeleteAllCompleted}
        hasCompleted={selesaiCount > 0}
      />

      <TaskList
        tasks={paginatedTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />

      {/* Komponen Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
