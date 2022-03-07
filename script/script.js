var $ = document
let accordion = $.querySelectorAll('.accordion');
// user input getElement
let noteTitleInput = $.getElementById('note-title');
let noteDescription = $.getElementById('note-description');

// preload
let preload = $.querySelector('.loader')

function loading() {
    preload.classList.add('hidden')
}
window.addEventListener('load', loading)


// Note Option Accordion 
accordion.forEach(toolItemHeader => {

    toolItemHeader.addEventListener('click', () => {
        toolItemHeader.classList.toggle('active');
        let toolItemBody = toolItemHeader.nextElementSibling;

        if (toolItemHeader.classList.contains("active")) {
            toolItemBody.style.maxHeight = toolItemBody.scrollHeight + "px";
        } else {
            toolItemBody.style.maxHeight = 0;
        }
    });
});



// Note Demo getClass 
let notePreview = $.querySelector('.note-preview')
let h2Elem = $.querySelector('.note-preview-title')
let notePreviewDescriptionText = $.querySelector('.note-preview-description-text')

// Get input option Elements
let titleColor = $.getElementById('title-color-set');
let descriptionColor = $.getElementById('description-color-set');
let backgroundColor = $.getElementById('background-color-set');
let titleSize = $.getElementById('title-size-set')
let descriptionSize = $.getElementById('description-size-set')

// titleColor OnChange Event  
function titleColorValue() {
    h2Elem.style.color = titleColor.value
}
titleColor.addEventListener('input', titleColorValue);

// DescriptionColor OnChange Event
function descriptionColorValue() {
    notePreviewDescriptionText.style.color = descriptionColor.value
}
descriptionColor.addEventListener('input', descriptionColorValue)

// backgroundColor OnChange Event
function backgroundColorValue() {
    notePreview.style.backgroundColor = backgroundColor.value
}
backgroundColor.addEventListener('input', backgroundColorValue)

function titleSizeValue() {
    h2Elem.style.fontSize = titleSize.value + 'px'
}
titleSize.addEventListener('input', titleSizeValue)

function descriptionSizeValue() {
    notePreviewDescriptionText.style.fontSize = descriptionSize.value + 'px'
}
descriptionSize.addEventListener('input', descriptionSizeValue)

// add and remove button action 
let date;
setInterval(() => {
    date = new persianDate().format('اضافه شده در DD MMMM YYYY ساعت HH:mm')
}, 1000);

let addBtn = $.getElementById('save');
let clearBtn = $.getElementById('clear')

let notesLocalStorage = []
// save Button
function addBtnAction() {

    if (!noteTitleInput.value) {
        alert('عنوان نمیتواند خالی باشد')
    } else {
        let appendToStorage = {
            id: notesLocalStorage.length + 1,
            title: noteTitleInput.value,
            description: noteDescription.value,
            titleColor: titleColor.value,
            descriptionColor: descriptionColor.value,
            backgroundColor: backgroundColor.value,
            titleSize: titleSize.value,
            descriptionSize: descriptionSize.value,
            date: date
        }
        notesLocalStorage.push(appendToStorage)
        getLocalStorage(notesLocalStorage)
        notesGenerator(notesLocalStorage)
        clearBtnAction()
        noteTitleInput.focus()
    }

}
addBtn.addEventListener('click', addBtnAction)

function getLocalStorage(noteArray) {
    localStorage.setItem('notes', JSON.stringify(noteArray))
}

let noteAdded = $.querySelector('.notes-added')
// add New Notes Func
function notesGenerator(noteArray) {
    let noteFather, deleteIcon, noteHeadText, noteDescriptionTextElem, noteDescriptionText, time

    noteAdded.innerHTML = ''

    noteArray.forEach(function (note) {
        noteFather = $.createElement('div')

        noteFather.classList.add('note-father')
        noteFather.setAttribute('onclick', 'deleteNote(' + note.id + ')')
        deleteIcon = $.createElement('i')
        deleteIcon.className = 'fas fa-trash-alt note'

        noteHeadText = $.createElement('h2')
        noteHeadText.className = 'note-preview-title note'

        noteDescriptionTextElem = $.createElement('div')
        noteDescriptionTextElem.className = 'note-preview-description note'

        noteDescriptionText = $.createElement('p')
        noteDescriptionText.className = 'note-preview-description-text note-text'

        time = $.createElement('span')
        time.className = 'note-time'
        time.innerHTML = note.date
        // input value add to note
        noteHeadText.innerHTML = note.title
        if (note.description === '' && noteDescription.value === '') {
            noteHeadText.style.border = '0'
        }
        noteDescriptionText.innerHTML = note.description

        // note style add to element
        // color
        noteFather.style.backgroundColor = note.backgroundColor
        noteDescriptionText.style.color = note.descriptionColor
        noteHeadText.style.color = note.titleColor
        // size 
        noteDescriptionText.style.fontSize = note.descriptionSize + 'px'
        noteHeadText.style.fontSize = note.titleSize + 'px'

        // append to HTML 
        noteFather.append(deleteIcon, noteHeadText, noteDescriptionTextElem, noteDescriptionText, time)
        noteAdded.prepend(noteFather)
    })
}

// get local storage on load 
function getDataOnLoad() {
    let noteIndex = JSON.parse(localStorage.getItem('notes'))

    if (!noteIndex) {
        notesLocalStorage = []
    } else {
        notesLocalStorage = noteIndex
    }

    notesGenerator(notesLocalStorage)

}
window.addEventListener('load', getDataOnLoad)

// Clear Button 
function clearBtnAction() {
    noteTitleInput.value = ''
    noteDescription.value = ''
}
clearBtn.addEventListener('click', clearBtnAction)

// click to delete note 
function deleteNote(noteid) {
    let noteIndex = JSON.parse(localStorage.getItem('notes'))

    notesLocalStorage = noteIndex

    let removeNote = notesLocalStorage.findIndex(function (note) {
        return note.id === noteid
    })
    notesLocalStorage.splice(removeNote, 1)

    getLocalStorage(notesLocalStorage)
    notesGenerator(notesLocalStorage)
}


// dark mode 
let darkMode = $.querySelector('.night-mode')
let modeIcon = $.getElementById('theme')
let darkTheme = false

function darkModeBtn() {
    if (!darkTheme) {
        modeIcon.classList.remove('fa-sun')
        modeIcon.classList.add('fa-moon')
        $.body.classList.remove('dark-mode')
        darkTheme = true
        localStorage.setItem('theme', 'light')
    } else {
        modeIcon.classList.remove('fa-moon')
        modeIcon.classList.add('fa-sun')
        $.body.classList.add('dark-mode')
        localStorage.setItem('theme', 'dark')
        darkTheme = false
    }
}
darkMode.addEventListener('click', darkModeBtn)

function windowOnLoadTheme() {
    let currentTheme = localStorage.getItem('theme')
    if (currentTheme === null || currentTheme === 'light') {
        darkTheme = false
        darkModeBtn()
    } else {
        darkTheme = true
        darkModeBtn()
    }
}
window.addEventListener('load', windowOnLoadTheme)


// inputs keydown event 
noteTitleInput.addEventListener('keydown', function (event) {

    if (event.keyCode === 13) {
        event.preventDefault()
        noteDescription.focus()
    }
})

noteDescription.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        addBtnAction()
    }
})