const noteText = document.querySelector('.note-txt');
const noteButton = document.querySelector('.submit-note');
const noteList = document.querySelector('.container');

// event listeners
document.addEventListener('DOMContentLoaded', getNotes)
noteButton.addEventListener('click', addNote);
noteList.addEventListener('click', deleteNote)
// functions
function addNote(event) {
    // prevent form from submitting
    event.preventDefault();
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('container-text');
    const noteCotent = document.createElement('p')
    noteCotent.innerText = noteText.value
    noteDiv.appendChild(noteCotent)

    // save note to local
    saveLocalNotes(noteText.value)
    // delete button
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add('trash-button')
    noteDiv.appendChild(deleteButton)


    noteList.appendChild(noteDiv)

    noteText.value = ''
}
function deleteNote(evt) {
    const note = evt.target

    if (note.classList[0] === 'trash-button') {
        const noteDel = note.parentElement
        noteDel.classList.add('delete')
        removeLocalNotes(noteDel)
        noteDel.addEventListener('transitionend', () => {
            noteDel.remove()
        })
    }
}

// copied code
function saveLocalNotes(note) {
    // check -- do I have note already
    let notes;
    if (localStorage.getItem('notes') === null) {
        notes = []
    }
    else {
        notes = JSON.parse(localStorage.getItem('notes'));
    }
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotes() {
    let notes;
    if (localStorage.getItem('notes') === null) {
        notes = []
    }
    else {
        notes = JSON.parse(localStorage.getItem('notes'));
    }
    notes.forEach(function (note) {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('container-text');
        const noteCotent = document.createElement('p')
        noteCotent.innerText = note
        noteDiv.appendChild(noteCotent)

        // delete button
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
        deleteButton.classList.add('trash-button')
        noteDiv.appendChild(deleteButton)


        noteList.appendChild(noteDiv)
    })
}

function removeLocalNotes(note) {
    let notes;
    if (localStorage.getItem('notes') === null) {
        notes = []
    }
    else {
        notes = JSON.parse(localStorage.getItem('notes'));
    }
    const noteIndex = note.children[0].innerText;
    notes.splice(notes.indexOf(noteIndex), 1)
    localStorage.setItem('notes', JSON.stringify(notes));
}