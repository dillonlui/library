let library = document.querySelector('#library');

// Sample Objects

// let myLibrary = [
//     {
//         title: 'The Bible',
//         author: 'God',
//         pages: 1000,
//         isRead: true,
//     },
//     {
//         title: 'Greek for Life',
//         author: 'Merkle',
//         pages: 300,
//         isRead: false,
//     }
// ];

class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        pages = '0',
        isRead = 'false'
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook)
    saveLocal();
    return true;
}

function removeBook(bookTitle) {
    myLibrary = myLibrary.filter((book) => book.title !== bookTitle)
    saveLocal();
}

// Book Grid

function clearGrid() {
    while (library.firstChild) {
        library.removeChild(library.firstChild);
    }
}

function finishedReading(value) {
    if (value == true) {
        return 'Book completed.'
    } else {
        return 'Book incomplete.'
    }
}

function createCard(libraryBook) {
    let book = libraryBook
    let card = document.createElement('div');
    card.className = 'card m-2';
    card.style = 'width: 18rem';
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    let cardTitle = document.createElement('div');
    cardTitle.className = 'd-flex justify-content-between';
    cardBody.appendChild(cardTitle);
    let bookTitle = document.createElement('h5');
    bookTitle.className = 'card-title';
    bookTitle.textContent = `${book.title}`
    cardTitle.appendChild(bookTitle);
    let bookClose = document.createElement('button');
    bookClose.type = 'button'
    bookClose.className = 'btn-close closeBtn';
    cardTitle.appendChild(bookClose);
    let cardSubtitle = document.createElement('h6');
    cardSubtitle.className = 'card-subtitle mb-2 text-muted';
    cardSubtitle.textContent = `${book.author}`;
    cardBody.appendChild(cardSubtitle);
    let cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = `${book.pages} pages. ${finishedReading(book.isRead)}`;
    cardBody.appendChild(cardText);
    card.appendChild(cardBody);
    library.appendChild(card);
}


function showLibrary() {
    clearGrid(library);
    for (let i = 0; i < myLibrary.length; i++) {
        createCard(myLibrary[i])
    }
}

library.addEventListener('click', function (e) {
    if (e.target.classList.contains('closeBtn')) {
        removeBook(e.target.previousElementSibling.innerText);
        e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode);
    }
})
// Modal Form

let myModal = new bootstrap.Modal(document.getElementById('addBook'), {
    keyboard: false
})
const form = document.querySelector(".newBookForm");
form.addEventListener("submit", addBook);

function addBook(e) {
    e.preventDefault();
    addBookToLibrary(getBookFromInput());
    clearGrid();
    showLibrary();
    myModal.toggle();
}

function getBookFromInput() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#isRead").checked;
    return new Book(title, author, pages, isRead);
}

// Local Storage

function saveLocal() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function restoreLocal() {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    if (myLibrary === null) myLibrary = [];
    showLibrary();
}

restoreLocal();

