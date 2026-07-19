const libraryContainer = document.querySelector(".library");

const dialog = document.querySelector(".add-book-dialog")
const openBtn = document.querySelector(".add");
const cancelBtn = document.querySelector(".close");
const form = document.querySelector("form");

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function() {
    this.read = !this.read
};

dialog.addEventListener("close", () => {
    form.reset();
})

openBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
    form.reset();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = Number(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);

    renderLibrary();

    dialog.close();
    form.reset();
})


function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function renderLibrary() {
    libraryContainer.innerHTML = "";

    myLibrary.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.dataset.id = book.id;
        bookDiv.classList.add("book");

        const btnContainer = document.createElement("div");
        btnContainer.classList = "btn-container"

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove Book";
        deleteBtn.classList.add("book-btn");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            myLibrary = myLibrary.filter(item => item.id !== bookDiv.dataset.id);
            renderLibrary();
        })

        const toggleReadBtn = document.createElement("button");
        toggleReadBtn.textContent = "Toggle Read";
        toggleReadBtn.classList.add("book-btn");
        toggleReadBtn.classList.add("toggle-btn")
        toggleReadBtn.addEventListener("click", () => {
            book.toggleRead();
            renderLibrary();
        })

        const toggleIcon = document.createElement("span");
        toggleIcon.classList.add("material-symbols-outlined");
        toggleIcon.textContent = "visibility";

        const deleteIcon = document.createElement("span");
        deleteIcon.classList.add("material-symbols-outlined");
        deleteIcon.textContent = "delete";
        
        const titleDisplay = document.createElement("p");
        const authorDisplay = document.createElement("p");
        const pagesDisplay = document.createElement("p");
        const readDisplay = document.createElement("p");

        titleDisplay.classList.add("title");
        authorDisplay.classList.add("author");
        pagesDisplay.classList.add("pages");
        readDisplay.classList.add("status");

        titleDisplay.textContent = book.title;
        authorDisplay.textContent = `By ${book.author}`;
        pagesDisplay.textContent = `${book.pages} pages`;

        if (book.read) {
            readDisplay.textContent = "Already read";
            bookDiv.classList.add("book-read");
        } else {
            readDisplay.textContent = "Not yet read";
            bookDiv.classList.add("book-unread");
        }

        bookDiv.appendChild(titleDisplay);
        bookDiv.appendChild(authorDisplay);
        bookDiv.appendChild(pagesDisplay);
        bookDiv.appendChild(readDisplay);

        bookDiv.appendChild(btnContainer);
        btnContainer.appendChild(toggleReadBtn);
        btnContainer.appendChild(deleteBtn);

        toggleReadBtn.appendChild(toggleIcon);
        deleteBtn.appendChild(deleteIcon);

        libraryContainer.appendChild(bookDiv);
    })
}

renderLibrary();