const noteForm = document.getElementById("noteForm");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const notesList = document.getElementById("notesList");
const searchInput = document.getElementById("searchInput");
const charCount = document.getElementById("charCount");
const themeToggle = document.getElementById("themeToggle");

let notes = JSON.parse(localStorage.getItem("advancedNotes")) || [];
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

if (darkMode) document.body.classList.add("dark");
themeToggle.textContent = darkMode ? "☀️" : "🌙";

function saveData() {
  localStorage.setItem("advancedNotes", JSON.stringify(notes));
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(dateString));
}

function renderNotes() {
  const query = searchInput.value.toLowerCase().trim();

  const filteredNotes = notes
    .filter(note =>
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    )
    .sort((a, b) => b.pinned - a.pinned || new Date(b.updatedAt) - new Date(a.updatedAt));

  notesList.innerHTML = "";

  filteredNotes.forEach((note) => {
    const noteEl = document.createElement("div");
    noteEl.className = `note ${note.pinned ? "pinned" : ""}`;

    noteEl.innerHTML = `
      <div class="note-head">
        <div class="note-title">${note.title || "Untitled Note"}</div>
        <small>${note.pinned ? "📌 Pinned" : ""}</small>
      </div>
      <div class="note-meta">
        Created: ${formatDate(note.createdAt)} | Updated: ${formatDate(note.updatedAt)}
      </div>
      <div class="note-content">${note.content}</div>
      <div class="note-actions">
        <button class="pin-btn" onclick="togglePin('${note.id}')">
          ${note.pinned ? "Unpin" : "Pin"}
        </button>
        <button class="edit-btn" onclick="editNote('${note.id}')">Edit</button>
        <button class="delete-btn" onclick="deleteNote('${note.id}')">Delete</button>
      </div>
    `;

    notesList.appendChild(noteEl);
  });
}

function addNote(e) {
  e.preventDefault();

  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();

  if (!title && !content) return;

  const newNote = {
    id: Date.now().toString(),
    title: title || "Untitled Note",
    content,
    pinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  notes.unshift(newNote);
  saveData();
  renderNotes();

  noteTitle.value = "";
  noteContent.value = "";
  charCount.textContent = "0 characters";
}

function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveData();
  renderNotes();
}

function editNote(id) {
  const note = notes.find(n => n.id === id);
  if (!note) return;

  const newTitle = prompt("Edit title:", note.title);
  if (newTitle === null) return;

  const newContent = prompt("Edit content:", note.content);
  if (newContent === null) return;

  note.title = newTitle.trim() || "Untitled Note";
  note.content = newContent.trim();
  note.updatedAt = new Date().toISOString();

  saveData();
  renderNotes();
}

function togglePin(id) {
  const note = notes.find(n => n.id === id);
  if (!note) return;

  note.pinned = !note.pinned;
  note.updatedAt = new Date().toISOString();

  saveData();
  renderNotes();
}

noteForm.addEventListener("submit", addNote);

noteContent.addEventListener("input", () => {
  charCount.textContent = `${noteContent.value.length} characters`;
});

searchInput.addEventListener("input", renderNotes);

themeToggle.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);
  themeToggle.textContent = darkMode ? "☀️" : "🌙";
  saveData();
});

renderNotes();