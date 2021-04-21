var authorEl = document.getElementById('author');
var titleEl = document.getElementById('title');
var subjectEl = document.getElementById('subject');
// use google book api to pull data based on search term
function bookSearch (searchTerm){
    var bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm;
    // user url to search
    fetch(bookUrl)
    .then(function(response){
 
        return response.json();
    })   
    .then(function(data){
        for(var i = 0; i < data.items.length; i++){
            var author = data.items[i].volumeInfo.authors;
            var pageCount = data.items[i].volumeInfo.pageCount;
            var publishDate = data.items[i].volumeInfo.publishedDate;
            var title = data.items[i].volumeInfo.title;
            var subtitle = data.items[i].volumeInfo.subtitle;            
            //function to display information 
            displayBookInfo(author, pageCount, publishDate, title, subtitle)
        }        
    })
}

function displayBookInfo(author, pageCount, publishDate, title, subtitle){
    // create display card(foundation so possibly something else)
    // append to found books
    // button to save to wishlist with local storage
    // save to recent search page (do we only want a few results displayed?)
    console.log(title, subtitle, author, pageCount,publishDate);
}



function authorSearch(event){
    event.preventDefault();
    var authorText = document.getElementById("authorText");
    var authorVal = authorText.value.trim();
    var searchText = "inauthor:" + authorVal;
    bookSearch(searchText);
}

function subjectSearch(event){
    event.preventDefault();
    var subjectText = document.getElementById("subjectText");
    var subjectVal = subjectText.value.trim();
    var searchText = "subject:" + subjectVal;
    bookSearch(searchText);
}

function titleSearch (event){
    event.preventDefault();
    var titleText = document.getElementById("titleText");
    var titleVal = titleText.value.trim();
    var searchText = "intitle:" + titleVal;
    bookSearch(searchText);
}



authorEl.addEventListener("click", authorSearch);
titleEl.addEventListener("click", titleSearch);
subjectEl.addEventListener("click", subjectSearch);



