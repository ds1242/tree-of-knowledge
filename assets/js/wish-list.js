var authorTitleArr = JSON.parse(localStorage.getItem("authorTitleArr")) || []

function loadLocalStorage (){
    for(var i = 0; i < authorTitleArr.length; i++){
        title = authorTitleArr[i].titleVal;
        subtitle = authorTitleArr[i].titleVal;
        author = authorTitleArr[i].titleVal;
        pageCount = authorTitleArr[i].pageCountVal;
        publishDate = authorTitleArr[i].publishDateVal;
        displayBookInfo(author, pageCount, publishDate, title, subtitle);
    }
}

if(authorTitleArr){
    loadLocalStorage();
} else {
    console.log('no wish list data');
}
