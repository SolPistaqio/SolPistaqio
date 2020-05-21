
 function getVenues(city) {
  const clientId = 'JR4J5UNKZQLHYDALGZA2FO2LUSNZRNKXZ5O5K2TWVST3PEYZ';
  const clientSecret = 'OOEWMJ4EWHA3G1ABVY42QXLIXJ1XGN0UHWUTC05J0HXOOK5H';
  const url = 'https://api.foursquare.com/v2/venues/explore?near=';
  //const city = $input.val();
  const urlToFetch = url + city + '&limit=50&client_id='+ clientId + '&client_secret='+clientSecret+'&v=20200225';
  return fetch(urlToFetch).then(response => {
      if (response.ok) {return response.json()
      } 
      //throw new Error('Request failed!');
      return {}
    }, networkError => {
      console.log(networkError.message)
    }).then(response=>{
      //console.log(response);
      if(response.response
        //.groups[0]
        ){
          const venues = response.response.groups[0].items.map(item => item.venue);
          const parks = venues.filter(venue => venue.categories[0].name ==="Park" || venue.categories[0].name ==="Trail" );
      return parks}
    })    
      };
  function getPhotos (venueID) {
    const clientId = 'JR4J5UNKZQLHYDALGZA2FO2LUSNZRNKXZ5O5K2TWVST3PEYZ';
    const clientSecret = 'OOEWMJ4EWHA3G1ABVY42QXLIXJ1XGN0UHWUTC05J0HXOOK5H';
    const url = 'https://api.foursquare.com/v2/venues/'+venueID+'/photos';
    const urlToFetch = url  + '?limit=1&client_id='+ clientId + '&client_secret='+clientSecret+'&v=20200225';
    return fetch(urlToFetch).then(response => {
      if (response.ok) {
        return response.json()
      } 
        throw new Error('Request failed!');
      
    }, networkError => {
      console.log(networkError.message)
    }).then(jsonResponse=>{
      //console.log(jsonResponse);
      return jsonResponse
    }).then(jsonResponse=>{
      if (jsonResponse.response.photos.count >0 ){
      const photo = jsonResponse.response.photos.items[0].prefix + '300x500' + jsonResponse.response.photos.items[0].suffix;
      //console.log(photo);
      return photo}
    else console.log('No photo found for venue N 1')
  return ''})
  }


      
      function getForecast (city){
        const openWeatherKey = '24baa893cee78ee225eca9d32759df14';
        const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
        //const city = $input.val();
        const urlToFetch = weatherUrl +'?q='+city+'&APPID='+openWeatherKey;
      
        return fetch(urlToFetch).then(response => {
          if (response.ok) {
            return response.json()
          } 
          return {}
          
        }, networkError => {
          console.log(networkError.message)
        }).then(jsonResponse=>{
         // console.log(jsonResponse);
          return jsonResponse
        })
        
       /* return fetch(urlToFetch).then(response => {
          if(response.ok) {
            return response
          } return {}
        }, networkError => {
          console.log(networkError.message)
        }).then(response => {
          if(response.status === 200){
            console.log(response);
          return response.json()}
          else {
            return {}
          }
        })*/
        
      }


export {getForecast, getVenues, getPhotos}
