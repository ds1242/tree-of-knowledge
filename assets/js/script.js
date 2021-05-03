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

// start map //

// var stores = {
//     "type": "FeatureCollection",
//     "query": [
//     "bookstores"
//     ],
//     "features": [
//     {
//     "id": "poi.807453933585",
//     "type": "Feature",
//     "place_type": [
//     "poi"
//     ],
//     "relevance": 0.95,
//     "properties": {
//     "foursquare": "4c7019b3d7fab1f7f5605dc9",
//     "landmark": true,
//     "address": "135 N 545 W",
//     "category": "bookstore, book shop, shop",
//     "text": "Deseret Book"
//     },
//     "text": "Deseret Book",
//     "place_name": "Deseret Book, 135 N 545 W, West Bountiful, Utah 84010, United States",
//     "center": [
//     -111.893448,
//     40.891003
//     ],
//     "geometry": {
//     "coordinates": [
//     -111.893448,
//     40.891003
//     ],
//     "type": "Point"
//     },
//     "context": [
//     {
//     "id": "neighborhood.275085",
//     "text": "Wayne Cooper"
//     },
//     {
//     "id": "postcode.5966955103480940",
//     "text": "84010"
//     },
//     {
//     "id": "place.7947184679692280",
//     "text": "West Bountiful"
//     },
//     {
//     "id": "district.13226022120464670",
//     "wikidata": "Q26631",
//     "text": "Davis County"
//     },
//     {
//     "id": "region.5297500142670350",
//     "wikidata": "Q829",
//     "short_code": "US-UT",
//     "text": "Utah"
//     },
//     {
//     "id": "country.19678805456372290",
//     "wikidata": "Q30",
//     "short_code": "us",
//     "text": "United States"
//     }
//     ]
//     },
//     {
//     "id": "poi.94489294889",
//     "type": "Feature",
//     "place_type": [
//     "poi"
//     ],
//     "relevance": 0.95,
//     "properties": {
//     "foursquare": "4b5e649cf964a520d98c29e3",
//     "landmark": true,
//     "address": "340 S 500 W",
//     "text": "Barnes & Noble",
//     "category": "bookstore, book shop, shop"
//     },
//     "text": "Barnes & Noble",
//     "place_name": "Barnes & Noble, 340 S 500 W, West Bountiful, Utah 84010, United States",
//     "center": [
//     -111.894098,
//     40.885856
//     ],
//     "geometry": {
//     "coordinates": [
//     -111.894098,
//     40.885856
//     ],
//     "type": "Point"
//     },
//     "context": [
//     {
//     "id": "neighborhood.278411",
//     "text": "Tanglewood Acres"
//     },
//     {
//     "id": "postcode.5966955103480940",
//     "text": "84010"
//     },
//     {
//     "id": "place.7947184679692280",
//     "text": "West Bountiful"
//     },
//     {
//     "id": "district.13226022120464670",
//     "wikidata": "Q26631",
//     "text": "Davis County"
//     },
//     {
//     "id": "region.5297500142670350",
//     "wikidata": "Q829",
//     "short_code": "US-UT",
//     "text": "Utah"
//     },
//     {
//     "id": "country.19678805456372290",
//     "wikidata": "Q30",
//     "short_code": "us",
//     "text": "United States"
//     }
//     ]
//     },
//     {
//     "id": "poi.764504285659",
//     "type": "Feature",
//     "place_type": [
//     "poi"
//     ],
//     "relevance": 0.95,
//     "properties": {
//     "foursquare": "4b0586a7f964a520426922e3",
//     "landmark": true,
//     "address": "510 Main St",
//     "text": "Dolly's Bookstore",
//     "category": "bookstore, book shop, shop"
//     },
//     "text": "Dolly's Bookstore",
//     "place_name": "Dolly's Bookstore, 510 Main St, Park City, Utah 84060, United States",
//     "center": [
//     -111.496063,
//     40.644489
//     ],
//     "geometry": {
//     "coordinates": [
//     -111.496063,
//     40.644489
//     ],
//     "type": "Point"
//     },
//     "context": [
//     {
//     "id": "neighborhood.2103864",
//     "text": "Old Town"
//     },
//     {
//     "id": "postcode.15345401668203880",
//     "text": "84060"
//     },
//     {
//     "id": "place.10791674996692240",
//     "wikidata": "Q482993",
//     "text": "Park City"
//     },
//     {
//     "id": "district.4982699978591080",
//     "wikidata": "Q484563",
//     "text": "Summit County"
//     },
//     {
//     "id": "region.5297500142670350",
//     "wikidata": "Q829",
//     "short_code": "US-UT",
//     "text": "Utah"
//     },
//     {
//     "id": "country.19678805456372290",
//     "wikidata": "Q30",
//     "short_code": "us",
//     "text": "United States"
//     }
//     ]
//     },
//     {
//     "id": "poi.532576029559",
//     "type": "Feature",
//     "place_type": [
//     "poi"
//     ],
//     "relevance": 0.95,
//     "properties": {
//     "foursquare": "4ad4f291f964a52028fe20e3",
//     "landmark": true,
//     "address": "1511 S 1500 E",
//     "text": "The King's English Bookshop",
//     "category": "bookstore, book shop, shop"
//     },
//     "text": "The King's English Bookshop",
//     "place_name": "The King's English Bookshop, 1511 S 1500 E, Salt Lake City, Utah 84105, United States",
//     "center": [
//     -111.847866,
//     40.736896
//     ],
//     "geometry": {
//     "type": "Point",
//     "coordinates": [
//     -111.847866,
//     40.736896
//     ]
//     },
//     "context": [
//     {
//     "id": "neighborhood.2106534",
//     "text": "Wasatch Hollow"
//     },
//     {
//     "id": "postcode.9418559101431400",
//     "text": "84105"
//     },
//     {
//     "id": "place.6848933112302480",
//     "wikidata": "Q23337",
//     "text": "Salt Lake City"
//     },
//     {
//     "id": "district.11340436017683800",
//     "wikidata": "Q484556",
//     "text": "Salt Lake County"
//     },
//     {
//     "id": "region.5297500142670350",
//     "wikidata": "Q829",
//     "short_code": "US-UT",
//     "text": "Utah"
//     },
//     {
//     "id": "country.19678805456372290",
//     "wikidata": "Q30",
//     "short_code": "us",
//     "text": "United States"
//     }
//     ]
//     },
//     {
//     "id": "poi.833223669004",
//     "type": "Feature",
//     "place_type": [
//     "poi"
//     ],
//     "relevance": 0.95,
//     "properties": {
//     "foursquare": "4ad4f291f964a5202afe20e3",
//     "landmark": true,
//     "address": "151 S 500 E",
//     "category": "bookstore, book shop, shop",
//     "text": "Golden Braid Bookstore"
//     },
//     "text": "Golden Braid Bookstore",
//     "place_name": "Golden Braid Bookstore, 151 S 500 E, Salt Lake City, Utah 84102, United States",
//     "center": [
//     -111.876309,
//     40.765757
//     ],
//     "geometry": {
//     "coordinates": [
//     -111.876309,
//     40.765757
//     ],
//     "type": "Point"
//     },
//     "context": [
//     {
//     "id": "neighborhood.2102828",
//     "text": "Central City"
//     },
//     {
//     "id": "postcode.10746829549261410",
//     "text": "84102"
//     },
//     {
//     "id": "place.6848933112302480",
//     "wikidata": "Q23337",
//     "text": "Salt Lake City"
//     },
//     {
//     "id": "district.11340436017683800",
//     "wikidata": "Q484556",
//     "text": "Salt Lake County"
//     },
//     {
//     "id": "region.5297500142670350",
//     "wikidata": "Q829",
//     "short_code": "US-UT",
//     "text": "Utah"
//     },
//     {
//     "id": "country.19678805456372290",
//     "wikidata": "Q30",
//     "short_code": "us",
//     "text": "United States"
//     }
//     ]
//     }
//     ], }
    var storeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/bookstores.json?proximity=-111.5531,%2040.9218479&access_token=pk.eyJ1IjoidGVsbGVyd2V0emVsIiwiYSI6ImNrbnh6ZWU5dzBvcTMybnBwMDlyMTEyNjAifQ.vDHwC8Gy_qK8AGL2qFzhVw';
    var stores = fetch(storeURL)
    .then(function(response){ 
      if(response.ok){
          return response.json();
      } else {
          alert("Error: " + response.statusText);
      }
    })   
    .then(function(stores){
      
      stores.features.forEach(function(store, i){
        store.properties.id = i;
      });
    
      map.on('load', function (e) {
        /* Add the data to your map as a layer */
        map.addLayer({
          "id": "locations",
          "type": "circle",
          /* Add a GeoJSON source containing place coordinates and information. */
          "source": {
            "type": "geojson",
            "data": stores
          }
        });
        buildLocationList(stores);
      });
    });
    // stores.features.forEach(function(store, i){
    //     store.properties.id = i;
    //   });

    //   map.on('load', function (e) {
    //     /* Add the data to your map as a layer */
    //     map.addLayer({
    //       "id": "locations",
    //       "type": "circle",
    //       /* Add a GeoJSON source containing place coordinates and information. */
    //       "source": {
    //         "type": "geojson",
    //         "data": stores
    //       }
    //     });
    //     buildLocationList(stores);
    //   });

      function buildLocationList(data) {
        data.features.forEach(function(store, i){
          /**
           * Create a shortcut for `store.properties`,
           * which will be used several times below.
          **/
          var prop = store.properties;
      
          /* Add a new listing section to the sidebar. */
          var listings = document.getElementById('listings');
          var listing = listings.appendChild(document.createElement('div'));
          /* Assign a unique `id` to the listing. */
          listing.id = "listing-" + data.features[i].properties.id;
          /* Assign the `item` class to each listing for styling. */
          listing.className = 'item';
      
          /* Add the link to the individual listing created above. */
          var link = listing.appendChild(document.createElement('a'));
          link.href = '#map';
          link.className = 'title';
          link.id = "link-" + prop.id;
          link.innerHTML = data.features[i].text + "<br />" + prop.address;

          link.addEventListener('click', function(e){
            for (var i = 0; i < data.features.length; i++) {
              if (this.id === "link-" + data.features[i].properties.id) {
                var clickedListing = data.features[i];
                flyToStore(clickedListing);
                createPopUp(clickedListing);
              }
            }  
            var activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            this.parentNode.classList.add('active');
          });
        });
        function flyToStore(currentFeature) {
          map.flyTo({
            center: currentFeature.geometry.coordinates,
            zoom: 15
          });
  
        }
      }
      
      
      function createPopUp(currentFeature) {
        var popUps = document.getElementsByClassName('mapboxgl-popup');
        /** Check if there is already a popup on the map and if so, remove it */
        if (popUps[0]) popUps[0].remove();
        
        var popup = new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML('<h3>' +  currentFeature.text + '</h3>' +
            '<h4>' + currentFeature.properties.address + '</h4>')
          .addTo(map);
      }

      

      map.on('click', function(e) {
        /* Determine if a feature in the "locations" layer exists at that point. */
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['locations']
        });
        
        /* If yes, then: */
        if (features.length) {
          var clickedPoint = features[0];
          
          /* Fly to the point */
          flyToStore(clickedPoint);
          
          /* Close all other popups and display popup for clicked store */
          createPopUp(clickedPoint);
          
          /* Highlight listing in sidebar (and remove highlight for all other listings) */
          var activeItem = document.getElementsByClassName('active');
          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }
          var listing = document.getElementById('listing-' + clickedPoint.properties.id);
          listing.classList.add('active');
        }
      });

      // end map //