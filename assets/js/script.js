var authorEl = document.getElementById('author');
var titleEl = document.getElementById('title');
var subjectEl = document.getElementById('subject');
var wishListButton = document.querySelector('#wish-list-add');
var authorTitleArr = JSON.parse(localStorage.getItem("authorTitleArr")) || []



// use google book api to pull data based on search term
function bookSearch (searchTerm){
    var bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm + '&maxResults=40';
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
        console.log(data);      
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
    card.setAttribute('id', 'test-id')
    
    cardCol.appendChild(card)
    // create div to title of card
    var cardTitle = document.createElement('div');
    cardTitle.className = 'card-divider';
    card.appendChild(cardTitle);
    var cardHead = document.createElement('h4');
    cardHead.setAttribute('id', 'card-head');
    cardHead.className = 'card-head';
    cardHead.textContent = title;
    cardTitle.appendChild(cardHead);


    // create div of card content and set title at top
    var cardBody = document.createElement('div');
    cardBody.className = 'card-section';
    cardBody.setAttribute('title',title);
    card.appendChild(cardBody);
    // sometimes subtitle does not exist, this will only load the information if it is not undefined
    if(typeof subtitle !== 'undefined'){
        var pSubtitle = document.createElement('p');
        pSubtitle.textContent = subtitle;
        cardBody.appendChild(pSubtitle);
    }
    // display book information on card
    var pAuthor = document.createElement('p');
    pAuthor.textContent = "Written by: " + author;
    cardBody.appendChild(pAuthor);
    
    var pPageCount = document.createElement('p');
    pPageCount.textContent = "Number of Pages: " + pageCount;
    cardBody.appendChild(pPageCount);

    var pDate = document.createElement('p');
    pDate.textContent = "Published: " + publishDate;
    cardBody.appendChild(pDate);

    // create wishlist buttons on cards
    var wishListButton = document.createElement('button')
    wishListButton.classList.add('button');
    wishListButton.setAttribute('type','submit');
    wishListButton.setAttribute('id', 'wish-list-add');
    wishListButton.setAttribute('author', author);
    wishListButton.setAttribute('subtitle', subtitle);
    wishListButton.setAttribute('page-count', pageCount);
    wishListButton.setAttribute('publish-date', publishDate);
    wishListButton.textContent = 'Add to Wishlist';
    
    cardBody.appendChild(wishListButton);

    wishListButton.addEventListener('click', addWishList);
}

function addWishList (){
    // get title and author name from id's attached to the cards
    var titleVal = $(this).parent().attr('title');
    var authorVal = $(this).attr('author');
    var subtitleVal = $(this).attr('subtitle');
    var publishDateVal = $(this).attr('publish-date');
    var pageCountVal = $(this).attr('page-count');
    // set title and author to a temp object
    var tempObj = {titleVal, subtitleVal, authorVal, publishDateVal,pageCountVal};
    // push that object to local storage array
    authorTitleArr.push(tempObj)
    // save array to local storage
    localStorage.setItem('authorTitleArr', JSON.stringify(authorTitleArr));   

}

function authorSearch(event){
    event.preventDefault();
    // get text input from user
    var authorText = document.getElementById("authorText");
    var authorVal = authorText.value.trim();
    // set search parameters needed for api
    var searchText = "inauthor:" + authorVal;
    bookSearch(searchText);
    // reset search box to empty
    authorText.value = "";
}

function subjectSearch(event){
    event.preventDefault();
    // get text input from user
    var subjectText = document.getElementById("subjectText");
    var subjectVal = subjectText.value.trim();
    // set search parameter for subject
    var searchText = "subject:" + subjectVal;
    bookSearch(searchText);
    // clear input box
    subjectText.value = "";
}

function titleSearch (event){
    event.preventDefault();
    // get input from user
    var titleText = document.getElementById("titleText");
    var titleVal = titleText.value.trim();
    // set search parameter and search google books api
    var searchText = "intitle:" + titleVal;
    bookSearch(searchText);
    // clear input
    titleText.value = "";
}


// event listeners for search buttons
authorEl.addEventListener("click", authorSearch);
titleEl.addEventListener("click", titleSearch);
subjectEl.addEventListener("click", subjectSearch);



