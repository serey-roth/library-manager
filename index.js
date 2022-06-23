const title = document.getElementById("title")
const author = document.getElementById("author")
const numberOfPages = document.getElementById("number-pages")
const yearPublished = document.getElementById("year-published")
const addBtn = document.getElementById("add-btn")
const tableContent = document.getElementById("info-table").getElementsByTagName('tbody')[0];

function Book(title, author, pages, year) {
    this.title = title
    this.author = author
    this.pages = pages
    this.year = year
}

function addBookToLibrary(lib, title, author, pages, year) {
    lib.push(new Book(title, author, pages, year))
}

function displayBook(book) { 
    let row = tableContent.insertRow();
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    let cell3 = row.insertCell(2)
    let cell4 = row.insertCell(3)
    cell1.innerHTML = book.title
    cell2.innerHTML = book.author
    cell3.innerHTML = book.pages
    cell4.innerHTML = book.year
}

function displayLibrary(lib) {
    if (lib) {
        for (let i = 0; i < lib.length; i++) {
            displayBook(lib[i])
        }
    }
}

function getLibrary() {
    let fromStorage = localStorage.getItem("myLibrary")
    if (fromStorage) {
        fromStorage = fromStorage.replace(/\},\{/g, "\}+\{").substring(1, 
            fromStorage.length - 1)
        let lib = []
        let arr = fromStorage.split("+")
        for (let i = 0; i < arr.length; i++) {
            let info = makeBookInfo(arr[i]).split(",")
            addBookToLibrary(lib, removeDoubleQuotes(info[0]), 
            removeDoubleQuotes(info[1]), 
            Number.parseInt(removeDoubleQuotes(info[2])), 
            Number.parseInt(removeDoubleQuotes(info[3])))
        }
        return lib
    } else {
        return []
    }
}

function makeBookInfo(string) {
    let newString = string.replace(/\"[a-z]+\":/g, "")
    return newString.substring(1, newString.length - 1)
}

function removeDoubleQuotes(string) {
    return string.replace(/\"/g, "")
}

function saveLibrary(lib) {
    localStorage.setItem("myLibrary", JSON.stringify(lib))
}

let myLibrary = getLibrary()
displayLibrary(myLibrary)

addBtn.addEventListener("click", function(e) {
    e.preventDefault()
    if (!(title.value === "" || author.value === "")) {
        addBookToLibrary(myLibrary, title.value, author.value, 
            numberOfPages.value, yearPublished.value)
        displayBook(myLibrary[myLibrary.length - 1], myLibrary.length)
        saveLibrary(myLibrary)
    }
})

