let accordion = document.querySelectorAll(".accordion")!;
// user input getElement
let noteTitleInput = document.getElementById("note-title") as HTMLInputElement;
let noteDescription = document.getElementById(
  "note-description"
) as HTMLInputElement;

// preload
let preload = document.querySelector(".loader")!;

let loading = () => {
  preload.classList.add("hidden");
};
window.addEventListener("load", loading);

// Note Option Accordion
accordion.forEach((toolItemHeader) => {
  toolItemHeader.addEventListener("click", () => {
    toolItemHeader.classList.toggle("active");
    let toolItemBody = toolItemHeader.nextElementSibling as HTMLDivElement;

    if (toolItemHeader.classList.contains("active")) {
      toolItemBody.style.maxHeight = `${toolItemBody.scrollHeight}px`;
    } else {
      toolItemBody.style.maxHeight = "0px";
    }
  });
});

// Note Demo getClass
const notePreview = document.querySelector(".note-preview") as HTMLDivElement;
const demoInputs = document.querySelectorAll<HTMLInputElement>(".demo-inputs");
const h2Elem = document.querySelector(
  ".note-preview-title"
) as HTMLInputElement;
const notePreviewDescriptionText = document.querySelector(
  ".note-preview-description-text"
) as HTMLParagraphElement;
// Get input option Elements
const titleColor = document.getElementById(
  "title-color-set"
) as HTMLInputElement;
const descriptionColor = document.getElementById(
  "description-color-set"
) as HTMLInputElement;
const backgroundColor = document.getElementById(
  "background-color-set"
) as HTMLInputElement;
const titleSize = document.getElementById(
  "title-size-set"
) as HTMLSelectElement;
const descriptionSize = document.getElementById(
  "description-size-set"
) as HTMLSelectElement;

// all input on change event

// titleColor OnChange Event
let titleColorValue = () => titleColor.value;
titleColor.addEventListener("input", titleColorValue);

// DescriptionColor OnChange Event
let descriptionColorValue = () => descriptionColor.value;
descriptionColor.addEventListener("input", descriptionColorValue);

// backgroundColor OnChange Event
let backgroundColorValue = () => backgroundColor.value;
backgroundColor.addEventListener("input", backgroundColorValue);

let titleSizeValue = () => `${titleSize.value}px`;
titleSize.addEventListener("input", titleSizeValue);

let descriptionSizeValue = () => `${descriptionSize.value}px`;
descriptionSize.addEventListener("input", descriptionSizeValue);

let noteDemoHandler = () => {
  h2Elem.style.color = titleColorValue();
  notePreviewDescriptionText.style.color = descriptionColorValue();
  notePreview.style.backgroundColor = backgroundColorValue();
  h2Elem.style.fontSize = titleSizeValue();
  console.log(notePreviewDescriptionText.style.fontSize);
  notePreviewDescriptionText.style.fontSize = descriptionSizeValue();
};

demoInputs.forEach((inputs) => {
  inputs.addEventListener("input", noteDemoHandler);
});
// set demo value on load
window.addEventListener("load", noteDemoHandler);
// add and remove button action

let addBtn = document.getElementById("save") as HTMLButtonElement;
let clearBtn = document.getElementById("clear") as HTMLButtonElement;

let notesLocalStorage: any = [];
// save Button
let addBtnAction = () => {
  let date = new Date();
  let notesDate = `اضافه شده در ${date.toLocaleDateString("fa-IR")} ساعت ${date
    .getHours()
    .toLocaleString("fa-IR")}:${date.getMinutes().toLocaleString("fa-IR")}`;

  if (!noteTitleInput.value) {
    alert("عنوان نمیتواند خالی باشد");
  } else {
    let appendToStorage: {
      id: number;
      title: string;
      description: string;
      titleColor: string;
      descriptionColor: string;
      backgroundColor: string;
      titleSize: string;
      descriptionSize: string;
      date: string;
    } = {
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

let setLocalStorage = (noteArray: any) => {
  localStorage.setItem("notes", JSON.stringify(noteArray));
};

// click to delete note
let deleteNote = (noteid: number) => {
  let noteIndex = JSON.parse(localStorage.getItem("notes")!);

  notesLocalStorage = noteIndex;

  let removeNote = notesLocalStorage.findIndex(function (note: any) {
    return note.id === noteid;
  });

  notesLocalStorage.splice(removeNote, 1);

  setLocalStorage(notesLocalStorage);
  notesGenerator(notesLocalStorage);
};

// add New Notes Function
let noteAdded = document.querySelector(".notes-added") as HTMLDivElement;
let notesGenerator = (noteArray: any) => {
  noteAdded.innerHTML = "";
  let border;
  noteArray.forEach((note: any) => {
    if (!note.description) {
      border = "unset";
    } else {
      border = "2px dashed rgb(0 0 0 / 60%)";
    }

    noteAdded.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="note-father" data-noteid="${note.id}" style="
        background-color: ${note.backgroundColor}";>
        <i class="fas fa-trash-alt note"></i>
        <h2 class="note-preview-title note" style="
        color: ${note.titleColor};
        font-size:${note.titleSize}; 
        border-bottom: ${border};">${note.title}</h2>
        <div class="note-preview-description note">
        <p class="note-preview-description-text note-text" style="
        color: ${note.descriptionColor}; 
        font-size: ${note.descriptionSize}">${note.description}</p>
        </div>
        <span class="note-time">${note.date}</span>
        </div>`
    );
  });
  addDeleteBtnToNotes();
};

const addDeleteBtnToNotes = () => {
  const deleteBtns = document.querySelectorAll(".note-father") as NodeList;

  deleteBtns.forEach((btn: any) => {
    btn.addEventListener("click", () => {
      deleteNote(Number(btn.dataset.noteid));
    });
  });
};
// get local storage on load
let getDataOnLoad = () => {
  let noteIndex = JSON.parse(localStorage.getItem("notes")!);

  if (!noteIndex) {
    notesLocalStorage = [];
  } else {
    notesLocalStorage = noteIndex;
  }

  notesGenerator(notesLocalStorage);
};
window.addEventListener("load", getDataOnLoad);

// Clear Button
let clearBtnAction = () => {
  noteTitleInput.value = "";
  noteDescription.value = "";
};
clearBtn.addEventListener("click", clearBtnAction);

// dark mode
let darkMode = document.querySelector(".night-mode") as HTMLDivElement;
let modeIcon = document.getElementById("theme") as HTMLElement;
let darkTheme = false;

let darkModeBtn = () => {
  if (!darkTheme) {
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.add("fa-moon");
    document.body.classList.remove("dark-mode");
    darkTheme = true;
    localStorage.setItem("theme", "light");
  } else {
    modeIcon.classList.remove("fa-moon");
    modeIcon.classList.add("fa-sun");
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    darkTheme = false;
  }
};
darkMode.addEventListener("click", darkModeBtn);

let windowOnLoadTheme = () => {
  let currentTheme = localStorage.getItem("theme");
  if (currentTheme === null || currentTheme === "light") {
    darkTheme = false;
    darkModeBtn();
  } else {
    darkTheme = true;
    darkModeBtn();
  }
};
window.addEventListener("load", windowOnLoadTheme);

// inputs keydown event
noteTitleInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    noteDescription.focus();
  }
});

noteDescription.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addBtnAction();
  }
});
