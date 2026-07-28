const searchInput = document.querySelector("#searchInput");
const noteForm = document.querySelector("#noteForm");
const noteTitle = document.querySelector("#noteTitle");
const noteContent = document.querySelector("#noteContent");
const submitBtn = document.querySelector("#submit");
const charCount = document.querySelector("#charCount");
const notesList = document.querySelector("#notesList");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

notes.forEach((note) => {
  let notesListBox = document.createElement("div");
  notesListBox.classList.add("note");

  notesListBox.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    <button class="pin-btn">Pin</button>
        `;
  notesList.appendChild(notesListBox);

  let deleteBtn = notesListBox.querySelector(".delete-btn");
  let pinBtn = notesListBox.querySelector(".pin-btn");
  let editBtn = notesListBox.querySelector(".edit-btn");

  deleteBtn.addEventListener("click", () => {
    notes = notes.filter((item) => item !== note);
    localStorage.setItem("notes", JSON.stringify(notes));
    notesListBox.remove();
  });

  pinBtn.addEventListener("click", () => {
    notesListBox.classList.toggle("pinned");
  });

  editBtn.addEventListener("click", () => {
    let title = notesListBox.querySelector("h3").textContent;
    let content = notesListBox.querySelector("p").textContent;

    noteTitle.value = title;
    noteContent.value = content;

    notes = notes.filter((item) => item !== note);
    localStorage.setItem("notes", JSON.stringify(notes));
    notesListBox.remove();
  });
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let noteTitleValue = noteTitle.value.trim();
  let noteContentValue = noteContent.value.trim();

  let newNote = {
    title: noteTitleValue,
    content: noteContentValue
  };

  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));

  let notesListBox = document.createElement("div");
  notesListBox.classList.add("note");

  notesListBox.innerHTML = ` <h3>${noteTitleValue}</h3>
    <p>${noteContentValue}</p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    <button class="pin-btn">Pin</button>`;

  notesList.appendChild(notesListBox);

  let deleteBtn = notesListBox.querySelector(".delete-btn");
  let pinBtn = notesListBox.querySelector(".pin-btn");
  let editBtn = notesListBox.querySelector(".edit-btn");

  deleteBtn.addEventListener("click", () => {
    notes = notes.filter((item) => item.title !== noteTitleValue || item.content !== noteContentValue);
    localStorage.setItem("notes", JSON.stringify(notes));
    notesListBox.remove();
  });

  pinBtn.addEventListener("click", () => {
    notesListBox.classList.toggle("pinned");
  });

  editBtn.addEventListener("click", () => {
    let title = notesListBox.querySelector("h3").textContent;
    let content = notesListBox.querySelector("p").textContent;

    noteTitle.value = title;
    noteContent.value = content;

    notes = notes.filter((item) => item.title !== title || item.content !== content);
    localStorage.setItem("notes", JSON.stringify(notes));
    notesListBox.remove();
  });

  noteTitle.value = "";
  noteContent.value = "";
  charCount.textContent = "0 Characters";
});

noteContent.addEventListener("input", () => {
  let count = noteContent.value.length;
  charCount.textContent = `${count} Characters`;
});