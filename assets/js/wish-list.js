var authorTitleArr = JSON.parse(localStorage.getItem("authorTitleArr")) || []

function loadLocalStorage (){
    for(var i = 0; i < authorTitleArr.length; i++){
        title = authorTitleArr[i].titleVal;
        subtitle = authorTitleArr[i].titleVal;
        author = authorTitleArr[i].titleVal;
        pageCount = authorTitleArr[i].pageCountVal;
        publishDate = authorTitleArr[i].publishDateVal;
        createCards(title, subtitle, author, pageCount, publishDate);
    }
}

function createCards (title, subtitle, author, pageCount, publishDate){
    var bookList = document.querySelector(".results-list");
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
}


if(authorTitleArr){
    loadLocalStorage();
} else {
    console.log('no wish list data');
}
