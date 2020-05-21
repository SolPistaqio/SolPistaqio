import React from 'react';
import {getVenues, getForecast, getPhotos} from './apisearch.js';
import './parks.css';


class RenderWalk extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            city : 'Riga',
            venues : [],
            forecast : {},
            searched: false,
            pic: ''
      };
      this.handleData=this.handleData.bind(this);
      this.handleClick=this.handleClick.bind(this);
      this.handleEnter=this.handleEnter.bind(this);
      }
      handleData(e){
       // console.log(e.target.value);
        const searchCity = e.target.value;
        this.setState({
            city: searchCity
        });
      }
      

      search(city){
       // console.log('searching for ' + city);
       
        this.setState({
            searched: false,
            venues : [],
              })
        
        getVenues(city).then(vResult => {
            if (vResult !== undefined && vResult !== {}){
       this.setState({
           venues : vResult, 
           searched: true,
             })}
            else {
                this.setState({
                    venues : [],
                      })
                alert('Please try entering city again');
            
        }});
        
      }

      setForecast(vResult){
          this.setState(
            {forecast : vResult}
          )
      }
      
      handleEnter(e){
         const city = this.state.city
         if (e.key === 'Enter') {
            //console.log('search on Enter for '+ city);
            this.search(this.state.city);
          } 
      }
      
      handleClick(e){ 
        e.preventDefault();
        this.search(this.state.city);
           
      }
      
    render(){
        if(this.state.venues.length>0 && this.state.searched) {
           // console.log(this.state.venues);
            return (<div className='parkCont'> <div className='parks'>
                <h2>Enter a city where you want to walk in</h2>
                <input onChange={this.handleData} onKeyPress={this.handleEnter}/>
            <button onClick={this.handleClick}>Search</button>
            </div><div>
                <RenderVenue setForecast={this.setForecast} venues={this.state.venues} forecast = {this.state.forecast}/>
            </div>
            </div>)
        } else if (this.state.venues.length < 1 && this.state.searched) {
                return (<div className='parkCont'> 
                <p>Sorry, there are no parks there</p>
                <p>Please try again.</p>
            <div className='parks'>
             <h2>Enter a city where you want to walk in</h2>
            <input onChange={this.handleData} onKeyPress={this.handleEnter}/>
            <button onClick={this.handleClick}>Search</button>
            </div>
            </div>)
            }
        else {
            return (<div className='parkCont'>
            <div className='parks'>
             <h2>Enter a city where you want to walk in</h2>
            <input onChange={this.handleData} onKeyPress={this.handleEnter}/>
            <button onClick={this.handleClick}>Search</button>
            </div></div>)
    }}

};

class RenderPark extends React.Component {
    render(){
       // console.log('all parks incoming')
        return (<div>
            <ul>
            {this.props.venues.map(park => {
                const href = 'https://maps.google.com/?q=' +park.location.lat+ ','+ park.location.lng; 
                return <div key={park.name}> 
                    
                <li > {park.name} <a href={href} target='_blank'rel="noopener noreferrer">Directions-></a> </li>
                </div>
            })}
        </ul>
        </div>)
    
}}

class RenderWeather extends React.Component {
    timeConverter(UNIX_timestamp){
        const a = new Date(UNIX_timestamp * 1000);
        const hour = a.getHours();
        const min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); 
        const time = hour + ':' + min;
        return time;
      }
    
    render(){
      //console.log(this.props.weather);
        if(this.props.weather === {} || !this.props.weather.coord){
            return <p>Weather report is not available for this city</p>
        } else if (this.props.weather){
            const src = 'https://openweathermap.org/img/wn/'+this.props.weather.weather[0].icon+'@2x.png';
            return ( <div className='weather'>

        <img src={src} />
        <p>{this.props.weather.weather[0].main} {Math.floor(this.props.weather.main.temp- 273.15)}C</p>
        <p>Sunset {this.timeConverter(this.props.weather.sys.sunset)} PM</p>
        

            </div>
            )
        }else{
            return <p>Weather report is not available for this city</p>
        }
    }
};

class RenderVenue extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pic: '',
            weather: {},
            s: false
      }
    }

      componentDidMount(){
       // console.log('here comes the photo!')
        getPhotos(this.props.venues[0].id).then(pResult =>
            this.setState({
                pic : pResult
                  })); 
        
      //  console.log('control forecast incoming')         
        getForecast(this.props.venues[0].location.city).then(vResult => 
            this.setState({
            weather: vResult,
            s: true
        }))
        
        
      }
        
render(){
    //const src = 'https://openweathermap.org/img/wn/'+this.props.forecast.weather[0].icon+'@2x.png';
    //const href = 'https://maps.google.com/?q=' +this.props.venues[0].location.lat+ ','+ this.props.venues[0].location.lng;
    //const photo = this.props.venues[0].photo;
    const city = this.props.venues[0].location.city;
  // console.log(this.state.weather);
   
   if (this.state.s)
    {return (<div className='parks'>
    <div className='title'><h3 >{city} </h3></div>
    <RenderWeather className='weather' weather={this.state.weather}
   // weather={this.props.forecast}
    />
      <div className='parkinfo' >
       
        <img src={this.state.pic} />
         
       <RenderPark venues={this.props.venues}/>
       
        </div>
    </div>)}
    else {
        return (<div className='parks'>
    <div className='title'><h3 >{city} </h3></div>
      <div className='parkinfo' >
       <img src={this.state.pic} />
       <RenderPark  venues={this.props.venues}/>
        
        </div>
    </div>)
    }
}
};
export default RenderWalk;
