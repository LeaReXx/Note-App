var $ = document;
let accordion = $.querySelectorAll(".accordion");
// user input getElement
let noteTitleInput = $.getElementById("note-title");
let noteDescription = $.getElementById("note-description");

// preload
let preload = $.querySelector(".loader");

function loading() {
  preload.classList.add("hidden");
}
window.addEventListener("load", loading);

// Note Option Accordion
accordion.forEach((toolItemHeader) => {
  toolItemHeader.addEventListener("click", () => {
    toolItemHeader.classList.toggle("active");
    let toolItemBody = toolItemHeader.nextElementSibling;

    if (toolItemHeader.classList.contains("active")) {
      toolItemBody.style.maxHeight = toolItemBody.scrollHeight + "px";
    } else {
      toolItemBody.style.maxHeight = 0;
    }
  });
});

// Note Demo getClass
let notePreview = $.querySelector(".note-preview");
let h2Elem = $.querySelector(".note-preview-title");
let notePreviewDescriptionText = $.querySelector(".note-preview-description-text");

// Get input option Elements
let titleColor = $.getElementById("title-color-set");
let descriptionColor = $.getElementById("description-color-set");
let backgroundColor = $.getElementById("background-color-set");
let titleSize = $.getElementById("title-size-set");
let descriptionSize = $.getElementById("description-size-set");

// titleColor OnChange Event
function titleColorValue() {
  h2Elem.style.color = titleColor.value;
}
titleColor.addEventListener("input", titleColorValue);

// DescriptionColor OnChange Event
function descriptionColorValue() {
  notePreviewDescriptionText.style.color = descriptionColor.value;
}
descriptionColor.addEventListener("input", descriptionColorValue);

// backgroundColor OnChange Event
function backgroundColorValue() {
  notePreview.style.backgroundColor = backgroundColor.value;
}
backgroundColor.addEventListener("input", backgroundColorValue);

function titleSizeValue() {
  h2Elem.style.fontSize = titleSize.value + "px";
}
titleSize.addEventListener("input", titleSizeValue);

function descriptionSizeValue() {
  notePreviewDescriptionText.style.fontSize = descriptionSize.value + "px";
}
descriptionSize.addEventListener("input", descriptionSizeValue);

// add and remove button action
let date;
setInterval(() => {
  date = new persianDate().format("اضافه شده در DD MMMM YYYY ساعت HH:mm");
}, 1000);

let addBtn = $.getElementById("save");
let clearBtn = $.getElementById("clear");

let notesLocalStorage = [];
// save Button
function addBtnAction() {
  if (!noteTitleInput.value) {
    alert("عنوان نمیتواند خالی باشد");
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
      date: date,
    };
    notesLocalStorage.push(appendToStorage);
    getLocalStorage(notesLocalStorage);
    notesGenerator(notesLocalStorage);
    clearBtnAction();
    noteTitleInput.focus();
  }
}
addBtn.addEventListener("click", addBtnAction);

function getLocalStorage(noteArray) {
  localStorage.setItem("notes", JSON.stringify(noteArray));
}

// add New Notes Function
let noteAdded = $.querySelector(".notes-added");
function notesGenerator(noteArray) {
  noteAdded.innerHTML = "";
  let border;
  noteArray.forEach(function (note) {
    if (!note.description) {
      border = "unset";
    } else {
      border = "2px dashed rgb(0 0 0 / 60%)";
    }

    noteAdded.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="note-father" onclick="deleteNote(` +
        note.id +
        `)" style="
        background-color: ` +
        note.backgroundColor +
        `";>
        <i class="fas fa-trash-alt note"></i>
        <h2 class="note-preview-title note" style="
        color: ` +
        note.titleColor +
        `; 
        font-size: ` +
        note.titleSize +
        "px" +
        `; 
        border-bottom: ` +
        border +
        `;">` +
        note.title +
        `
         </h2>
        <div class="note-preview-description note">
        <p class="note-preview-description-text note-text" style="
        color: ` +
        note.descriptionColor +
        `; 
        font-size: ` +
        note.descriptionSize +
        "px" +
        `">` +
        note.description +
        `</p>
        </div>
        <span class="note-time">` +
        note.date +
        `</span>
        </div>`
    );
  });
}

// get local storage on load
function getDataOnLoad() {
  let noteIndex = JSON.parse(localStorage.getItem("notes"));

  if (!noteIndex) {
    notesLocalStorage = [];
  } else {
    notesLocalStorage = noteIndex;
  }

  notesGenerator(notesLocalStorage);
}
window.addEventListener("load", getDataOnLoad);

// Clear Button
function clearBtnAction() {
  noteTitleInput.value = "";
  noteDescription.value = "";
}
clearBtn.addEventListener("click", clearBtnAction);

// click to delete note
function deleteNote(noteid) {
  let noteIndex = JSON.parse(localStorage.getItem("notes"));

  notesLocalStorage = noteIndex;

  let removeNote = notesLocalStorage.findIndex(function (note) {
    return note.id === noteid;
  });
  notesLocalStorage.splice(removeNote, 1);

  getLocalStorage(notesLocalStorage);
  notesGenerator(notesLocalStorage);
}

// dark mode
let darkMode = $.querySelector(".night-mode");
let modeIcon = $.getElementById("theme");
let darkTheme = false;

function darkModeBtn() {
  if (!darkTheme) {
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.add("fa-moon");
    $.body.classList.remove("dark-mode");
    darkTheme = true;
    localStorage.setItem("theme", "light");
  } else {
    modeIcon.classList.remove("fa-moon");
    modeIcon.classList.add("fa-sun");
    $.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    darkTheme = false;
  }
}
darkMode.addEventListener("click", darkModeBtn);

function windowOnLoadTheme() {
  let currentTheme = localStorage.getItem("theme");
  if (currentTheme === null || currentTheme === "light") {
    darkTheme = false;
    darkModeBtn();
  } else {
    darkTheme = true;
    darkModeBtn();
  }
}
window.addEventListener("load", windowOnLoadTheme);

// inputs keydown event
noteTitleInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    noteDescription.focus();
  }
});

noteDescription.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addBtnAction();
  }
});
