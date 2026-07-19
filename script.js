const libraryContainer = document.querySelector(".library");

const dialog = document.querySelector(".add-book-dialog")
const openBtn = document.querySelector(".add");
const cancelBtn = document.querySelector(".close");
const form = document.querySelector("form");

let myLibrary = [
    new Book("The Hobbit", "J.R.R. Tolkien", 295, false),
    new Book("To Kill a Mockingbird", "Harper Lee", 281, true)
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

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

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove Book"
        deleteBtn.addEventListener("click", () => {
           myLibrary = myLibrary.filter(item => item.id !== bookDiv.dataset.id);
           console.log(myLibrary)
           bookDiv.remove();
        })

        const titleDisplay = document.createElement("p");
        const authorDisplay = document.createElement("p");
        const pagesDisplay = document.createElement("p");
        const readDisplay = document.createElement("p");

        titleDisplay.textContent = book.title;
        authorDisplay.textContent = `By ${book.author}`;
        pagesDisplay.textContent = `${book.pages} pages`;

        if (book.read === false) {
            readDisplay.textContent = "Not yet read"
        } else {
            readDisplay.textContent = "Already read"
        };

        bookDiv.appendChild(titleDisplay);
        bookDiv.appendChild(authorDisplay);
        bookDiv.appendChild(pagesDisplay);
        bookDiv.appendChild(readDisplay);

        bookDiv.appendChild(deleteBtn);
        libraryContainer.appendChild(bookDiv);

        console.log(book.title);
    })
}

renderLibrary();