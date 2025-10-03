const error = document.querySelector(".error-msg");
const myLibrary = [];

class Book {
  constructor(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

const library = document.querySelector(".library");

function displayLibrary() {
  library.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Read:</strong> ${book.isRead ? "Yes" : "No"}</p>
        <button class="toggle-read" data-id="${book.id}">Toggle Read</button>
        <button class="remove-book" data-id="${book.id}">Remove</button>
        `;

    library.appendChild(bookCard);

    // Toggle Read Button
    bookCard.querySelector(".toggle-read").addEventListener("click", () => {
      book.isRead = !book.isRead;
      displayLibrary();
    });

    // Remove Book Button
    bookCard.querySelector(".remove-book").addEventListener("click", () => {
      const index = myLibrary.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        displayLibrary();
      }
    });
  });
}

const modalBtn = document.querySelector(".modal-btn");
const modalOverlay = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");

modalBtn.addEventListener("click", function () {
  modalOverlay.classList.add("open-modal");
});

closeBtn.addEventListener("click", function () {
  modalOverlay.classList.remove("open-modal");
});

//close modal when clicking outside the modal content
modalOverlay.addEventListener("click", function (e) {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("open-modal");
  }
});

//close modal when pressing the Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalOverlay.classList.contains("open-modal")) {
    modalOverlay.classList.remove("open-modal");
  }
});

const bookForm = document.querySelector(".book-form");
bookForm.addEventListener("submit", addBook);

function addBook(e) {
  e.preventDefault();

  let messages = [];

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pageNum = parseInt(document.getElementById("pages").value);
  const isRead = document.getElementById("isRead").checked; // assumes checkbox with id="isRead"

  // validation
  if (!title) {
    messages.push("Please enter a title");
  }

  if (!author) {
    messages.push("Please enter the author's name");
  }

  if (messages.length > 0) {
    error.innerHTML = messages.map(msg => `<p>${msg}.</p>`).join('');;
    return;
  }

  // clear previous error/s
  error.textContent = "";

  // add book
  addBookToLibrary(title, author, pageNum, isRead);
  displayLibrary();
  bookForm.reset();
  modalOverlay.classList.remove("open-modal");
}

displayLibrary();
