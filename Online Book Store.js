let searchResultsEl = document.getElementById("searchResults");
let searchInputEl = document.getElementById("searchInput");
let selectDisplayCountEl = document.getElementById("selectDisplayCount");
let finalResultEl = document.getElementById("finalResult");
let spinnerEl = document.getElementById("spinner");

let options = {
    method: "GET"
};
let bookCount = "10";
let url = "https://apis.ccbp.in/book-store?title=kalam&maxResults=30";

function gotoFetch() {
    searchResultsEl.textContent = "";
    fetch(url, options)
        .then(function(response) {
            return response.json();
        }).then(function(jsonData) {
            console.log(jsonData);
            spinnerEl.classList.add("d-none");
            if (jsonData.search_results[0] === undefined) {

                finalResultEl.textContent = "No results Found";
                finalResultEl.classList.remove("d-none");
                //console.log("zero elements");
            } else {
                finalResultEl.textContent = "Popular Books";
                finalResultEl.classList.remove("d-none");
                //console.log("non-zero Elements");
                addBookmarks(jsonData.search_results);
            }

        });
}
selectDisplayCountEl.addEventListener("change", function(event) {
    bookCount = selectDisplayCountEl.value;
    let userBook = searchInputEl.value;
    if (userBook === "") {
        userBook = "kalam";
    }
    bookCount = selectDisplayCountEl.value;
    url = "https://apis.ccbp.in/book-store?title=" + userBook + "&maxResults=" + bookCount;
    spinnerEl.classList.remove("d-none");
    finalResultEl.textContent = "";
    gotoFetch();
});

function createBookmark(item) {
    let {
        title,
        imageLink,
        author
    } = item;
    //console.log(title,imageLink,author) ;
    let bookContainer = document.createElement("div");
    bookContainer.classList.add("text-center", "book-container", "col-5", "mr-1");

    let imgCon = document.createElement("div");
    imgCon.classList.add("book-img-style");

    let BookImg = document.createElement("img");
    BookImg.src = imageLink;

    let authorName = document.createElement("p");
    authorName.textContent = author;
    authorName.style.fontWeight = "bold";

    imgCon.appendChild(BookImg);
    bookContainer.appendChild(imgCon);
    bookContainer.appendChild(authorName);
    searchResultsEl.appendChild(bookContainer);



}

function addBookmarks(bookmarkObj) {
    searchResultsEl.textContent = "";
    for (let item of bookmarkObj) {
        createBookmark(item);
    }
}
searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        //console.log(event.key);
        if (event.target.value === "") {
            url = "https://apis.ccbp.in/book-store?title=kalam&maxResults=30";
        } else {
            let userBook = searchInputEl.value;
            bookCount = selectDisplayCountEl.value;
            url = "https://apis.ccbp.in/book-store?title=" + userBook + "&maxResults=" + bookCount;
        }
        spinnerEl.classList.remove("d-none");
        gotoFetch();

    }
});