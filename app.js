// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Adding a book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");

  // Creatin a table element
  const row = document.createElement("tr");
  console.log(row);
  // Insert cols
  row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
    `;

  list.appendChild(row);
};

// Show Alert
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement("div");
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));

  // Get parent
  const container = document.querySelector(".container");
  // Get form
  const form = document.querySelector("#book-form");
  // Insert alert
  container.insertBefore(div, form);

  // Timeout after 3 sec
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};
// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event Listener
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Getting form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const booklists = new UI();

  // Validatison
  if (title === "" || author === "" || isbn === "") {
    booklists.showAlert("Please fill in all fields before subming", "error");
  } else {
    // Adding a book to the list
    booklists.addBookToList(book);

    // show success
    booklists.showAlert("Book Added!", "success");

    // Clear fields
    booklists.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
  const booklists = new UI();
  booklists.deleteBook(e.target);

  //Showing message
  booklists.showAlert("The book is remove", "success");
  e.preventDefault();
});
