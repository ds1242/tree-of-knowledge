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

            // need function here to display information 
            // function displayBookInfo(author, pageCount, publishDate, title, subtitle)

        }
        

    })
}
bookSearch();