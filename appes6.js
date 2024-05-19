class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    console.log(row);
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>`;

    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement("div");

    // Add text
    div.className = `alert ${className}`;

    // Get parent
    div.appendChild(document.createTextNode(message));

    // Get parent
    const container = document.querySelector(".container");

    // Get form
    const form = document.querySelector("#book-form");

    // Insert alert
    container.insertBefore(div, form);

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete")
      target.parentElement.parentElement.remove();
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

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
    booklists.addBookToList(book);

    // show success
    booklists.showAlert("Book Added!", "success");

    // clear fields
    booklists.clearFields();
  }

  e.preventDefault();
});

document.getElementById("book-list").addEventListener("click", function (e) {
  const booklists = new UI();
  booklists.deleteBook(e.target);

  //Showing message
  booklists.showAlert("The book is remove", "success");
  e.preventDefault();
});
