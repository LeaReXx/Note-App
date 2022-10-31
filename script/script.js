let $ = document;

let accordion = $.querySelectorAll(".accordion");
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

class NewNote {
  constructor(
    title,
    description,
    titleColor,
    descriptionColor,
    backgroundColor,
    titleSize,
    descriptionSize,
    date
  ) {
    this.title = title;
    this.description = description;
    this.titleColor = titleColor;
    this.descriptionColor = descriptionColor;
    this.backgroundColor = backgroundColor;
    this.titleSize = titleSize;
    this.descriptionSize = descriptionSize;
    this.date = date;
  }
}

class NoteInputs {
  constructor() {
    // input title and description
    this.noteTitleInput = $.getElementById("note-title");
    this.noteDescription = $.getElementById("note-description");
    // note cancel and save btns
    this.saveBtn = $.querySelector("#save");
    this.clearBtn = $.querySelector("#clear");
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
    this.noteSave();
    this.getNotesOnLoad();
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

  noteInputCleaner() {
    this.noteTitleInput.value = "";
    this.noteDescription.value = "";
  }

  noteTimeAdded() {
    return new persianDate().format("اضافه شده در DD MMMM YYYY ساعت HH:mm");
  }

  noteSave() {
    this.saveBtn.addEventListener("click", () => {
      if (!this.noteTitleInput.value.trim()) {
        alert("عنوان نمیتواند خالی باشد!");
      } else {
        this.allNotes.push(
          new NewNote(
            this.noteTitleInput.value,
            this.noteDescription.value,
            this.titleColor.value,
            this.descriptionColor.value,
            this.backgroundColor.value,
            this.titleSize.value,
            this.descriptionSize.value,
            this.noteTimeAdded()
          )
        );
      }
      console.log(this.allNotes);
      this.noteInputCleaner();
    });
  }

  getNotesOnLoad() {
    this.allNotes = JSON.parse(localStorage.getItem("notes")) || [];
    saveToLocalStorage()
  }

  saveToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(this.allNotes));
  }
}
new NoteInputs();
