var authorEl = document.getElementById('author');
var titleEl = document.getElementById('title');
var subjectEl = document.getElementById('subject');
// use google book api to pull data based on search term
function bookSearch (searchTerm){
    var bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm;
    // user url to search
    fetch(bookUrl)
    .then(function(response){ 
        if(response.ok){
            return response.json();
        } else {
            alert("Error: " + response.statusText);
        }
    })   
    .then(function(data){
        $('#foundBooks').empty();
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
    .catch(function(error){        
        console.log("Unable to connect to find books")
    });
}

function displayBookInfo(author, pageCount, publishDate, title, subtitle){
    // get found books section
    var bookList = document.getElementById("foundBooks");
    var cardCol = document.createElement('div');
    cardCol.classList.add("cell", "medium-6", "grid-padding-y", "grid-padding-x")
    bookList.appendChild(cardCol);
    
    // create div to hold card
    var card = document.createElement('div');
    card.className = 'card';
    
    cardCol.appendChild(card)
    // create div to title of card
    var cardTitle = document.createElement('div');
    cardTitle.className = 'card-divider';
    cardTitle.textContent = title;
    card.appendChild(cardTitle);


    // create div of card content
    var cardBody = document.createElement('div');
    cardBody.className = 'card-section';
    card.appendChild(cardBody);
    // sometimes subtitle does not exist, this will only load the information if it is not undefined
    if(typeof subtitle !== 'undefined'){
        console.log(subtitle)
        var pSubtitle = document.createElement('p');
        pSubtitle.textContent = subtitle;
        cardBody.appendChild(pSubtitle);
    }

    var pAuthor = document.createElement('p');
    pAuthor.textContent = "Written by: " + author;
    cardBody.appendChild(pAuthor);
    
    var pPageCount = document.createElement('p');
    pPageCount.textContent = "Number of Pages: " + pageCount;
    cardBody.appendChild(pPageCount);

    var pDate = document.createElement('p');
    pDate.textContent = "Published: " + publishDate;
    cardBody.appendChild(pDate);

}



function authorSearch(event){
    event.preventDefault();
    var authorText = document.getElementById("authorText");
    var authorVal = authorText.value.trim();
    var searchText = "inauthor:" + authorVal;
    bookSearch(searchText);

    authorText.value = "";
}

function subjectSearch(event){
    event.preventDefault();
    var subjectText = document.getElementById("subjectText");
    var subjectVal = subjectText.value.trim();
    var searchText = "subject:" + subjectVal;
    bookSearch(searchText);

    subjectText.value = "";
}

function titleSearch (event){
    event.preventDefault();
    var titleText = document.getElementById("titleText");
    var titleVal = titleText.value.trim();
    var searchText = "intitle:" + titleVal;
    bookSearch(searchText);

    titleText.value = "";
}



authorEl.addEventListener("click", authorSearch);
titleEl.addEventListener("click", titleSearch);
subjectEl.addEventListener("click", subjectSearch);



