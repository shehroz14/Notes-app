const searchInput = document.querySelector('#searchInput');
const noteForm = document.querySelector('#noteForm');
const noteTitle = document.querySelector('#noteTitle');
const noteContent = document.querySelector('#noteContent');
const submitBtn = document.querySelector('#submit');
const charCount = document.querySelector('#charCount');
const notesList = document.querySelector('#notesList');

submitBtn.addEventListener('click', (e)=>{
e.preventDefault()

    let noteTitleValue = noteTitle.value.trim();
    let noteContentValue = noteContent.value.trim();

   let notesListBox = document.createElement('div');
   notesListBox.classList.add('note')

    notesListBox.innerHTML = ` <h3>${noteTitleValue}</h3>
    <p>${noteContentValue}</p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    <button class="pin-btn">Pin</button>`

   notesList.appendChild(notesListBox);

    noteTitle.value = ''
    noteContent.value = ''
})

noteContent.addEventListener('input', ()=>{
    let count = noteContent.value.length;
    charCount.textContent = `${count} Characters`
})