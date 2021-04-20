function bookSearch (){
    var bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
    
    fetch(bookUrl)
    .then(function(response){
        // console.log(response);
        return response.json();
    })   
    .then(function(data){
        console.log(data);

    })
}
bookSearch();