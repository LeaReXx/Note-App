let $ = document;

class NewNote {
  constructor(
    title,
    description,
    titleColor,
    descriptionColor,
    backgroundColor,
    titleSize,
    descriptionSize
  ) {
    this.title = title;
    this.description = description;
    this.titleColor = titleColor;
    this.descriptionColor = descriptionColor;
    this.backgroundColor = backgroundColor;
    this.titleSize = titleSize;
    this.descriptionSize = descriptionSize;
  }
}

class NoteInputs {
  constructor() {
    this.noteTitleInput = $.getElementById("note-title");
    this.noteDescription = $.getElementById("note-description");
    // // Get input option Elements
    this.titleColor = $.getElementById("title-color-set");
    this.descriptionColor = $.getElementById("description-color-set");
    this.backgroundColor = $.getElementById("background-color-set");
    this.titleSize = $.getElementById("title-size-set");
    this.descriptionSize = $.getElementById("description-size-set");
    // note options on load event
    this.demoInputs = $.querySelectorAll(".demo-inputs");
    // note demo
    this.notePreview = $.querySelector(".note-preview");
    this.h2Elem = $.querySelector(".note-preview-title");
    this.notePreviewDescription = $.querySelector(
      ".note-preview-description-text"
    );
    this.noteDemoPreview();
    this.noteOptions();
  }
  noteOptions() {
    for (let inputOption of this.demoInputs) {
      inputOption.addEventListener("input", () => {
        this.noteDemoPreview();
      });
    }
  }

  noteDemoPreview() {
    this.notePreview.style.backgroundColor = this.backgroundColor.value;
    this.h2Elem.style.color = this.titleColor.value;
    this.notePreviewDescription.style.color = this.descriptionColor.value;
    this.h2Elem.style.fontSize = `${this.titleSize.value}px`;
    this.notePreviewDescription.style.fontSize = `${this.descriptionSize.value}px`;
  }

}
new NoteInputs();














// var $ = document;
let accordion = $.querySelectorAll(".accordion");
// // user input getElement
// let noteTitleInput = $.getElementById("note-title");
// let noteDescription = $.getElementById("note-description");

// // preload
// let preload = $.querySelector(".loader");

// let loading = () => {
//   preload.classList.add("hidden");
// };
// window.addEventListener("load", loading);

// // Note Option Accordion
accordion.forEach((toolItemHeader) => {
  toolItemHeader.addEventListener("click", () => {
    toolItemHeader.classList.toggle("active");
    let toolItemBody = toolItemHeader.nextElementSibling;

    if (toolItemHeader.classList.contains("active")) {
      toolItemBody.style.maxHeight = `${toolItemBody.scrollHeight}px`;
    } else {
      toolItemBody.style.maxHeight = 0;
    }
  });
});

// // Note Demo getClass
// let notePreview = $.querySelector(".note-preview");
// let demoInputs = $.querySelectorAll(".demo-inputs");
// let h2Elem = $.querySelector(".note-preview-title");
// let notePreviewDescriptionText = $.querySelector(
//   ".note-preview-description-text"
// );
// // Get input option Elements
// let titleColor = $.getElementById("title-color-set");
// let descriptionColor = $.getElementById("description-color-set");
// let backgroundColor = $.getElementById("background-color-set");
// let titleSize = $.getElementById("title-size-set");
// let descriptionSize = $.getElementById("description-size-set");

// // all input on change event

// // titleColor OnChange Event
// let titleColorValue = () => titleColor.value;
// titleColor.addEventListener("input", titleColorValue);

// // DescriptionColor OnChange Event
// let descriptionColorValue = () => descriptionColor.value;
// descriptionColor.addEventListener("input", descriptionColorValue);

// // backgroundColor OnChange Event
// let backgroundColorValue = () => backgroundColor.value;
// backgroundColor.addEventListener("input", backgroundColorValue);

// let titleSizeValue = () => `${titleSize.value}px`;
// titleSize.addEventListener("input", titleSizeValue);

// let descriptionSizeValue = () => `${descriptionSize.value}px`;
// descriptionSize.addEventListener("input", descriptionSizeValue);

// let noteDemoHandler = () => {
//   h2Elem.style.color = titleColorValue();
//   notePreviewDescriptionText.style.color = descriptionColorValue();
//   notePreview.style.backgroundColor = backgroundColorValue();
//   h2Elem.style.fontSize = titleSizeValue();
//   notePreviewDescriptionText.style.fontSize = descriptionSizeValue();
// };

// demoInputs.forEach((inputs) => {
//   inputs.addEventListener("input", noteDemoHandler);
// });
// // set demo value on load
// window.addEventListener("load", noteDemoHandler);
// // add and remove button action
// let date;
// setInterval(() => {
//   date = new persianDate().format("اضافه شده در DD MMMM YYYY ساعت HH:mm");
// }, 1000);

// let addBtn = $.getElementById("save");
// let clearBtn = $.getElementById("clear");

// let notesLocalStorage = [];
// // save Button
// let addBtnAction = () => {
//   if (!noteTitleInput.value) {
//     alert("عنوان نمیتواند خالی باشد");
//   } else {
//     let appendToStorage = {
//       id: notesLocalStorage.length + 1,
//       title: noteTitleInput.value,
//       description: noteDescription.value,
//       titleColor: titleColorValue(),
//       descriptionColor: descriptionColorValue(),
//       backgroundColor: backgroundColorValue(),
//       titleSize: titleSizeValue(),
//       descriptionSize: descriptionSizeValue(),
//       date: date,
//     };
//     notesLocalStorage.push(appendToStorage);
//     getLocalStorage(notesLocalStorage);
//     notesGenerator(notesLocalStorage);
//     clearBtnAction();
//     noteTitleInput.focus();
//   }
// };
// addBtn.addEventListener("click", addBtnAction);

// let getLocalStorage = (noteArray) => {
//   localStorage.setItem("notes", JSON.stringify(noteArray));
// };

// // add New Notes Function
// let noteAdded = $.querySelector(".notes-added");
// let notesGenerator = (noteArray) => {
//   noteAdded.innerHTML = "";
//   let border;
//   noteArray.forEach((note) => {
//     if (!note.description) {
//       border = "unset";
//     } else {
//       border = "2px dashed rgb(0 0 0 / 60%)";
//     }

//     noteAdded.insertAdjacentHTML(
//       "afterbegin",
//       `
//         <div class="note-father" onclick="deleteNote(` +
//         note.id +
//         `)" style="
//         background-color: ` +
//         note.backgroundColor +
//         `";>
//         <i class="fas fa-trash-alt note"></i>
//         <h2 class="note-preview-title note" style="
//         color: ` +
//         note.titleColor +
//         `;
//         font-size: ` +
//         note.titleSize +
//         "px" +
//         `;
//         border-bottom: ` +
//         border +
//         `;">` +
//         note.title +
//         `
//          </h2>
//         <div class="note-preview-description note">
//         <p class="note-preview-description-text note-text" style="
//         color: ` +
//         note.descriptionColor +
//         `;
//         font-size: ` +
//         note.descriptionSize +
//         "px" +
//         `">` +
//         note.description +
//         `</p>
//         </div>
//         <span class="note-time">` +
//         note.date +
//         `</span>
//         </div>`
//     );
//   });
// };

// // get local storage on load
// let getDataOnLoad = () => {
//   let noteIndex = JSON.parse(localStorage.getItem("notes"));

//   if (!noteIndex) {
//     notesLocalStorage = [];
//   } else {
//     notesLocalStorage = noteIndex;
//   }

//   notesGenerator(notesLocalStorage);
// };
// window.addEventListener("load", getDataOnLoad);

// // Clear Button
// let clearBtnAction = () => {
//   noteTitleInput.value = "";
//   noteDescription.value = "";
// };
// clearBtn.addEventListener("click", clearBtnAction);

// // click to delete note
// let deleteNote = (noteid) => {
//   let noteIndex = JSON.parse(localStorage.getItem("notes"));

//   notesLocalStorage = noteIndex;

//   let removeNote = notesLocalStorage.findIndex(function (note) {
//     return note.id === noteid;
//   });
//   notesLocalStorage.splice(removeNote, 1);

//   getLocalStorage(notesLocalStorage);
//   notesGenerator(notesLocalStorage);
// };

// // dark mode
// let darkMode = $.querySelector(".night-mode");
// let modeIcon = $.getElementById("theme");
// let darkTheme = false;

// let darkModeBtn = () => {
//   if (!darkTheme) {
//     modeIcon.classList.remove("fa-sun");
//     modeIcon.classList.add("fa-moon");
//     $.body.classList.remove("dark-mode");
//     darkTheme = true;
//     localStorage.setItem("theme", "light");
//   } else {
//     modeIcon.classList.remove("fa-moon");
//     modeIcon.classList.add("fa-sun");
//     $.body.classList.add("dark-mode");
//     localStorage.setItem("theme", "dark");
//     darkTheme = false;
//   }
// };
// darkMode.addEventListener("click", darkModeBtn);

// let windowOnLoadTheme = () => {
//   let currentTheme = localStorage.getItem("theme");
//   if (currentTheme === null || currentTheme === "light") {
//     darkTheme = false;
//     darkModeBtn();
//   } else {
//     darkTheme = true;
//     darkModeBtn();
//   }
// };
// window.addEventListener("load", windowOnLoadTheme);

// // inputs keydown event
// noteTitleInput.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     noteDescription.focus();
//   }
// });

// noteDescription.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     e.preventDefault();
//     addBtnAction();
//   }
// });
