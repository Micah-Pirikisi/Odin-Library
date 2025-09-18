
const myLibrary = []; 

function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID(); 
    this.title = title; 
    this.author = author; 
    this.pages = pages; 
    this.isRead = isRead; 
}; 

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead); 
    myLibrary.push(newBook); 
}; 

const library = document.querySelector('.library')

function displayLibrary() {
    library.innerHTML = ''; 

    myLibrary.forEach((book) => {
        const bookCard = document.createElement('div'); 
        bookCard.classList.add('book-card'); 

        bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Read:</strong> ${book.isRead ? 'Yes' : 'No'}</p>
        <button class="toggle-read" data-id="${book.id}">Toggle Read</button>
        <button class="remove-book" data-id="${book.id}">Remove</button>
        `; 

        library.appendChild(bookCard); 
    }); 
}

const modalBtn = document.querySelector('.modal-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const closeBtn = document.querySelector('.close-btn');

modalBtn.addEventListener('click', function () {
  modalOverlay.classList.add('open-modal');
});

closeBtn.addEventListener('click', function () {
  modalOverlay.classList.remove('open-modal');
});

//close modal when clicking outside the modal content
modalOverlay.addEventListener('click', function (e) {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('open-modal');
  }
});

//close modal when pressing the Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modalOverlay.classList.contains('open-modal')) {
    modalOverlay.classList.remove('open-modal');
  }
});




addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
displayLibrary();