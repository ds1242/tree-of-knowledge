    var bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=bestseller&maxResults=40';
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