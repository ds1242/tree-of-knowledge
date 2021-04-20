var API_KEY = 'AIzaSyA87lRRkp_fiRnysl5X0N7eRVo9V85IngU'



function bookSearch (){
    var bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=search+terms';
    
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