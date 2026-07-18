const libraryContainer = document.querySelector(".library");

const myLibrary = [{title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 295, read: false}, {title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 295, read: true}];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ?? false;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
}

myLibrary.forEach(book => {
    const bookDiv = document.createElement("div");

    const titleDisplay = document.createElement("p");
    const authorDisplay = document.createElement("p");
    const pagesDisplay = document.createElement("p");
    const readDisplay = document.createElement("p");

    titleDisplay.textContent = book.title;
    authorDisplay.textContent = book.author;
    pagesDisplay.textContent = book.pages;

    if (book.read === false) {
        readDisplay.textContent = "Not yet read"
    } else {
        readDisplay.textContent = "Already read"
    };

    bookDiv.appendChild(titleDisplay);
    bookDiv.appendChild(authorDisplay);
    bookDiv.appendChild(pagesDisplay);
    bookDiv.appendChild(readDisplay);

    libraryContainer.appendChild(bookDiv);
})