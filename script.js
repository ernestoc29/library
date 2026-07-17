const container = document.querySelector(".container");

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ?? false;

    this.info = function() {
        const status = this.read ? "already read" : "not read yet"

        return `${this.title} by ${this.author}, ${this.pages} pages, ${status}`
    };
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
}