console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");

const books = [
  {
    id: 1,
    title: "Name of the Wind",
    author: "Patrick Rothfuss",
    read: true,
  },
];

class Book {
  constructor(id, title, author, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.read = read;
    this.favorite = false;
  }
}

class Library {
  constructor(books) {
    this.nextId = books.length;
    this.books = books;
  }

  addBook(book) {
    if(!book) {
      // Select the inputs from the form -- title, author, and read
      var title = document.getElementById("title");
      var author = document.getElementById("author");
      var read = document.getElementById("read");
      // Increment book count property
      this.nextId++;
      // Create an instance from my book class with the input values
      var newBook = new Book(
        this.nextId,
        title.value,
        author.value,
        read.checked
      );
      // Push the new book instance into the books array
      this.books.push(newBook);
    }
    // Select the table body
    const tbody = document.getElementById("tableBody");
    // Create a new table row
    const newTr = document.createElement("tr");
    newTr.classList.add(book ? book.id : newBook.id);
    newTr.addEventListener("dblclick", (event) => {
      this.removeBook(book ? book.id : newBook.id);
    });
    newTr.addEventListener("click", (event) => {
      this.markFavorite(book ? book.id : newBook.id);
    });
    // Create three new table data cells
    const newTitle = document.createElement("td");
    const newAuthor = document.createElement("td");
    const newRead = document.createElement("td");
    // Add text content to td's with book values
    newTitle.textContent = book ? book.title : newBook.title;
    newAuthor.textContent = book ? book.author : newBook.author;
    const newCheckbox = document.createElement("input");
    newCheckbox.classList.add(book ? book.id : newBook.id);
    newCheckbox.type = "checkbox";
    newCheckbox.checked = book ? book.read : read.checked;
    newCheckbox.disabled = book ? book.read : read.checked;
    newCheckbox.addEventListener("click", (event) => {
      this.markRead(event.target, book ? book.id : newBook.id);
    });
    newRead.appendChild(newCheckbox);
    // Append the td's to the tr
    newTr.appendChild(newTitle);
    newTr.appendChild(newAuthor);
    newTr.appendChild(newRead);
    // Append the tr to the body
    tbody.appendChild(newTr);
  }

  markRead(checkbox, id) {
    this.books.forEach((book) => {
      if(id === book.id) {
        book.read = true;
        checkbox.checked = true;
        checkbox.disabled = true;
      }
    });
  }

  markFavorite(bookId) {
    this.books.forEach((book) => {
      if(book.id === bookId) {
        book.favorite = !book.favorite;
      }
    });
    document.getElementsByClassName(bookId)[0].classList.toggle("favorite");
  }

  removeBook(bookId) {
    // Reassign the books array after filtering out the remove book
    this.books = this.books.filter(({ id }) => bookId !== id);
    // Remove the book from the DOM
    const tbody = document.getElementById("tableBody");
    tbody.removeChild(document.getElementsByClassName(bookId)[0]);
  }
}

const library = new Library(books);
if(books.length > 0) {
  library.books.forEach((book) => {
    library.addBook(book);
  });
}

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  library.addBook();
});
