var accordion = document.querySelectorAll(".accordion");
// user input getElement
var noteTitleInput = document.getElementById("note-title");
var noteDescription = document.getElementById("note-description");
// preload
var preload = document.querySelector(".loader");
var loading = function () {
    preload.classList.add("hidden");
};
window.addEventListener("load", loading);
// Note Option Accordion
accordion.forEach(function (toolItemHeader) {
    toolItemHeader.addEventListener("click", function () {
        toolItemHeader.classList.toggle("active");
        var toolItemBody = toolItemHeader.nextElementSibling;
        if (toolItemHeader.classList.contains("active")) {
            toolItemBody.style.maxHeight = "".concat(toolItemBody.scrollHeight, "px");
        }
        else {
            toolItemBody.style.maxHeight = "0px";
        }
    });
});
// Note Demo getClass
var notePreview = document.querySelector(".note-preview");
var demoInputs = document.querySelectorAll(".demo-inputs");
var h2Elem = document.querySelector(".note-preview-title");
var notePreviewDescriptionText = document.querySelector(".note-preview-description-text");
// Get input option Elements
var titleColor = document.getElementById("title-color-set");
var descriptionColor = document.getElementById("description-color-set");
var backgroundColor = document.getElementById("background-color-set");
var titleSize = document.getElementById("title-size-set");
var descriptionSize = document.getElementById("description-size-set");
// all input on change event
// titleColor OnChange Event
var titleColorValue = function () { return titleColor.value; };
titleColor.addEventListener("input", titleColorValue);
// DescriptionColor OnChange Event
var descriptionColorValue = function () { return descriptionColor.value; };
descriptionColor.addEventListener("input", descriptionColorValue);
// backgroundColor OnChange Event
var backgroundColorValue = function () { return backgroundColor.value; };
backgroundColor.addEventListener("input", backgroundColorValue);
var titleSizeValue = function () { return "".concat(titleSize.value, "px"); };
titleSize.addEventListener("input", titleSizeValue);
var descriptionSizeValue = function () { return "".concat(descriptionSize.value, "px"); };
descriptionSize.addEventListener("input", descriptionSizeValue);
var noteDemoHandler = function () {
    h2Elem.style.color = titleColorValue();
    notePreviewDescriptionText.style.color = descriptionColorValue();
    notePreview.style.backgroundColor = backgroundColorValue();
    h2Elem.style.fontSize = titleSizeValue();
    console.log(notePreviewDescriptionText.style.fontSize);
    notePreviewDescriptionText.style.fontSize = descriptionSizeValue();
};
demoInputs.forEach(function (inputs) {
    inputs.addEventListener("input", noteDemoHandler);
});
// set demo value on load
window.addEventListener("load", noteDemoHandler);
// add and remove button action
var addBtn = document.getElementById("save");
var clearBtn = document.getElementById("clear");
var notesLocalStorage = [];
// save Button
var addBtnAction = function () {
    var date = new Date();
    var notesDate = "\u0627\u0636\u0627\u0641\u0647 \u0634\u062F\u0647 \u062F\u0631 ".concat(date.toLocaleDateString("fa-IR"), " \u0633\u0627\u0639\u062A ").concat(date
        .getHours()
        .toLocaleString("fa-IR"), ":").concat(date.getMinutes().toLocaleString("fa-IR"));
    if (!noteTitleInput.value) {
        alert("عنوان نمیتواند خالی باشد");
    }
    else {
        var appendToStorage = {
            id: notesLocalStorage.length + 1,
            title: noteTitleInput.value,
            description: noteDescription.value,
            titleColor: titleColorValue(),
            descriptionColor: descriptionColorValue(),
            backgroundColor: backgroundColorValue(),
            titleSize: titleSizeValue(),
            descriptionSize: descriptionSizeValue(),
            date: notesDate,
        };
        console.log(appendToStorage);
        notesLocalStorage.push(appendToStorage);
        setLocalStorage(notesLocalStorage);
        notesGenerator(notesLocalStorage);
        clearBtnAction();
        noteTitleInput.focus();
    }
};
addBtn.addEventListener("click", addBtnAction);
var setLocalStorage = function (noteArray) {
    localStorage.setItem("notes", JSON.stringify(noteArray));
};
// click to delete note
var deleteNote = function (noteid) {
    var noteIndex = JSON.parse(localStorage.getItem("notes"));
    notesLocalStorage = noteIndex;
    var removeNote = notesLocalStorage.findIndex(function (note) {
        return note.id === noteid;
    });
    notesLocalStorage.splice(removeNote, 1);
    setLocalStorage(notesLocalStorage);
    notesGenerator(notesLocalStorage);
};
// add New Notes Function
var noteAdded = document.querySelector(".notes-added");
var notesGenerator = function (noteArray) {
    noteAdded.innerHTML = "";
    var border;
    noteArray.forEach(function (note) {
        if (!note.description) {
            border = "unset";
        }
        else {
            border = "2px dashed rgb(0 0 0 / 60%)";
        }
        noteAdded.insertAdjacentHTML("afterbegin", "\n        <div class=\"note-father\" data-noteid=\"".concat(note.id, "\" style=\"\n        background-color: ").concat(note.backgroundColor, "\";>\n        <i class=\"fas fa-trash-alt note\"></i>\n        <h2 class=\"note-preview-title note\" style=\"\n        color: ").concat(note.titleColor, ";\n        font-size:").concat(note.titleSize, "; \n        border-bottom: ").concat(border, ";\">").concat(note.title, "</h2>\n        <div class=\"note-preview-description note\">\n        <p class=\"note-preview-description-text note-text\" style=\"\n        color: ").concat(note.descriptionColor, "; \n        font-size: ").concat(note.descriptionSize, "\">").concat(note.description, "</p>\n        </div>\n        <span class=\"note-time\">").concat(note.date, "</span>\n        </div>"));
    });
    addDeleteBtnToNotes();
};
var addDeleteBtnToNotes = function () {
    var deleteBtns = document.querySelectorAll(".note-father");
    deleteBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            deleteNote(Number(btn.dataset.noteid));
        });
    });
};
// get local storage on load
var getDataOnLoad = function () {
    var noteIndex = JSON.parse(localStorage.getItem("notes"));
    if (!noteIndex) {
        notesLocalStorage = [];
    }
    else {
        notesLocalStorage = noteIndex;
    }
    notesGenerator(notesLocalStorage);
};
window.addEventListener("load", getDataOnLoad);
// Clear Button
var clearBtnAction = function () {
    noteTitleInput.value = "";
    noteDescription.value = "";
};
clearBtn.addEventListener("click", clearBtnAction);
// dark mode
var darkMode = document.querySelector(".night-mode");
var modeIcon = document.getElementById("theme");
var darkTheme = false;
var darkModeBtn = function () {
    if (!darkTheme) {
        modeIcon.classList.remove("fa-sun");
        modeIcon.classList.add("fa-moon");
        document.body.classList.remove("dark-mode");
        darkTheme = true;
        localStorage.setItem("theme", "light");
    }
    else {
        modeIcon.classList.remove("fa-moon");
        modeIcon.classList.add("fa-sun");
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
        darkTheme = false;
    }
};
darkMode.addEventListener("click", darkModeBtn);
var windowOnLoadTheme = function () {
    var currentTheme = localStorage.getItem("theme");
    if (currentTheme === null || currentTheme === "light") {
        darkTheme = false;
        darkModeBtn();
    }
    else {
        darkTheme = true;
        darkModeBtn();
    }
};
window.addEventListener("load", windowOnLoadTheme);
// inputs keydown event
noteTitleInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        noteDescription.focus();
    }
});
noteDescription.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addBtnAction();
    }
});
