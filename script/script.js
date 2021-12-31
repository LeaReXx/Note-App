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

    toolItemHeader.addEventListener('click', event => {
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

// input option event 
let titleColor = $.getElementById('title-color-set');
let descriptionColor = $.getElementById('description-color-set');
let backgroundColor = $.getElementById('background-color-set');
let titleSize = $.getElementById('title-size-set')
let descriptionSize = $.getElementById('description-size-set')

// titleColor OnChange Event  
function titleColorValue() {
    h2Elem.style.color = titleColor.value
}
titleColor.addEventListener('change', titleColorValue);

// DescriptionColor OnChange Event
function descriptionColorValue() {
    notePreviewDescriptionText.style.color = descriptionColor.value
}
descriptionColor.addEventListener('change', descriptionColorValue)

// backgroundColor OnChange Event
function backgroundColorValue() {
    notePreview.style.backgroundColor = backgroundColor.value
}
backgroundColor.addEventListener('change', backgroundColorValue)

function titleSizeValue() {
    h2Elem.style.fontSize = titleSize.value + 'px'
}
titleSize.addEventListener('change', titleSizeValue)

function descriptionSizeValue() {
    notePreviewDescriptionText.style.fontSize = descriptionSize.value + 'px'
}
descriptionSize.addEventListener('change', descriptionSizeValue)


// add and remove button action 

let addBtn = $.getElementById('save');
let clearBtn = $.getElementById('clear')

// save Button

function addBtnAction() {

    if (!noteTitleInput.value) {
        alert('عنوان نمیتواند خالی باشد')
    } else {
        let noteAdded = $.querySelector('.notes-added')
        let noteFather = $.createElement('div')

        noteFather.classList.add('note-father')
        noteFather.addEventListener('click', deleteNote)

        let deleteIcon = $.createElement('i')
        deleteIcon.className = 'fas fa-trash-alt note'

        let noteHeadText = $.createElement('h2')
        noteHeadText.className = 'note-preview-title note'

        let noteDescriptionTextElem = $.createElement('div')
        noteDescriptionTextElem.className = 'note-preview-description note'

        let noteDescriptionText = $.createElement('p')
        noteDescriptionText.className = 'note-preview-description-text note-text'

        // input value add to note
        noteHeadText.innerHTML = noteTitleInput.value
        if (noteDescription.value === '') {
            noteHeadText.style.border = '0'
        }
        noteDescriptionText.innerHTML = noteDescription.value

        // note style add to element
        // color
        noteFather.style.backgroundColor = backgroundColor.value
        noteDescriptionText.style.color = descriptionColor.value
        noteHeadText.style.color = titleColor.value
        // size 
        noteDescriptionText.style.fontSize = descriptionSize.value + 'px'
        noteHeadText.style.fontSize = titleSize.value + 'px'

        // append to HTML 
        noteFather.append(deleteIcon)
        noteFather.append(noteHeadText)
        noteFather.append(noteDescriptionTextElem)
        noteDescriptionTextElem.append(noteDescriptionText)
        noteAdded.prepend(noteFather)
    }
}
addBtn.addEventListener('click', addBtnAction)

// Clear Button 
function clearBtnAction() {
    noteTitleInput.value = ''
    noteDescription.value = ''
}
clearBtn.addEventListener('click', clearBtnAction)
// click to delete note 

function deleteNote(event) {
        if(event.target.classList.contains('note')){
            event.target.parentElement.remove();
        } else if (event.target.classList.contains('note-text')) {
            event.target.parentElement.parentElement.remove()
        } else {
            event.target.remove()
        }
}


// dark mode 
let darkMode = $.querySelector('.night-mode')
let modeIcon = $.getElementById('theme')
function darkModeBtn(){
    if (modeIcon.classList.contains('fa-moon')){
        modeIcon.classList.remove('fa-moon')
        modeIcon.classList.add('fa-sun')
        $.body.classList.add('dark-mode')
    } else {
        modeIcon.classList.remove('fa-sun')
        modeIcon.classList.add('fa-moon')
        $.body.classList.remove('dark-mode')

    }
}
darkMode.addEventListener('click', darkModeBtn)
