import React, { Component } from 'react';
import { Line} from 'react-chartjs-2';
import './infograph.css'
//import { defaults } from 'react-chartjs-2';
//import { render } from '@testing-library/react';

const apiKey = 'H02HDVYAO5KH6A0E';

const numberNeeded = 20;



function getStockdata(crypto ,currency, numberNeeded) {
    const url = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol='+crypto+'&market='+currency+'&apikey=' + apiKey
    return fetch(url).then(response => {
        if (response.ok) {
          return response.json()
        } 
          throw new Error('Request failed!');
        
      }, networkError => {
        console.log(networkError.message)
      }).then(jsonResponse=>{
       //console.log(jsonResponse);
         
        const data = 
        {labels: Object.keys(jsonResponse['Time Series (Digital Currency Daily)'])
        .reverse()
        .slice(-numberNeeded),
        label: jsonResponse['Meta Data']['3. Digital Currency Name'],
        data: Object.values(jsonResponse['Time Series (Digital Currency Daily)']).map(value => {return value['1a. open ('+jsonResponse['Meta Data']['4. Market Code']+')']}).
        reverse().
        slice(-numberNeeded).map(
                value => {return parseFloat(value)}),
        text : jsonResponse['Meta Data']['5. Market Name']+'/'+jsonResponse['Meta Data']['3. Digital Currency Name'],
        }
        return data
        
      })};


class Infograph extends Component {
constructor (props) {
    super(props);
    this.state = {
        days:50,
        crypto: 'ETH',
        currency: 'EUR'
    }
    
this.handleClick=this.handleClick.bind(this);
this.handleDayChange=this.handleDayChange.bind(this)

}

handleClick(e){
    this.props.search(this.state.crypto,this.state.currency, this.state.days)
}

handleDayChange(e){
    //console.log(e.target.name);
    const newValue = e.target.value;
    const category = e.target.name;
    if (category === 'days'){
    this.setState({
        days:newValue
    })} else if (category === 'crypto'){
        this.setState({
            crypto:newValue
        })
    } else if (category === 'currency'){
        this.setState({
            currency:newValue
        })
    }
}


render() {

  const crypto = ['ETH', 'BTC', 'TRX',  'BNB', 'XRP', 'BCH', 'LTC', 'NEO'];
  const currency = ['EUR', 'USD', 'RUB', 'CNY'];

  const choseCrypto = 
  <div>
      {crypto.map(crypto => {
       const labelKey = 'l' + {currency};
        if(crypto === this.state.crypto){
       return (<span>
       <input key={crypto} onClick={this.handleDayChange} type="radio" id={crypto} name="crypto" value={crypto} defaultChecked></input>
       <label key={labelKey} for={crypto}>{crypto}</label>
       </span>
       )} else { return (<span>
        <input key={crypto} onClick={this.handleDayChange} type="radio" id={crypto} name="crypto" value={crypto}></input>
        <label key={labelKey} for={crypto}>{crypto}</label>
        </span>
        )
       } 
      })}
  </div>;

  const choseDays = <div>
   <p>3 <input onClick={this.handleDayChange} type="range" id="days" name="days" step="1" min="3" max="100"></input>100 </p>
    <label for="days">Show for {this.state.days} days</label>
 
  </div>;

const choseCurrency =
<div>
{currency.map(currency => {
      const  labelKey = 'l' + {currency};
        if(currency === this.state.currency){
       return (<span>
       <input key={currency} onClick={this.handleDayChange} type="radio" id={currency} name="currency" value={currency} defaultChecked></input>
       <label key={labelKey} for={currency}>{currency}</label>
       </span>
       )} else { return (<span>
        <input key={currency} onClick={this.handleDayChange} type="radio" id={currency} name="currency" value={currency}></input>
       <label key={labelKey} for={currency}>{currency}</label>
        </span>
        )
       } 
      })}

  </div>;

  const data = {
    labels:  this.props.data.labels,
    datasets: [{
        label: this.props.data.label, 
        data: this.props.data.data,
    } ]
}
  if (this.props.show) { 
  return (
        <div className="chart child">
        <h1 >Crypto vs Fiat per day chart</h1>
            <Line 
                data= {data}
            
                options = {{
                    title: {
                        display: true,
                        text: this.props.data.text,
                        fontSize: 25
                    },
                    legend: {
                       display: false,
                       position: 'left'
                    }
                }}
            
            
            />
            <p>Choose currencies and time period you want to see</p>
            <div className = "options">
            {choseDays}
            {choseCrypto}
            {choseCurrency}
            </div>
            <button onClick={this.handleClick}>Get data</button>
        </div>)}
    else {return (<div className="chart child">
        <h1 >Crypto vs Fiat per day chart</h1>
        <p>Choose currencies and time period you want to see</p>
        <div className = "options">
        {choseDays}
        {choseCrypto}
        {choseCurrency}
        </div>
    <button onClick={this.handleClick}>Get data</button>
    </div>
    )}
}
};

class Coolchart extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            data: {},
            display: false
        }
    this.handleSearch = this.handleSearch.bind(this)
    }
    handleSearch(crypto ,currency, numberNeeded){
      return getStockdata(crypto ,currency,numberNeeded).then(response => this.setState({
           data: response,
           display: true
       }))
    }
    render() {
    //console.log(this.state.data);
      return ( <div>
      <Infograph show={this.state.display} data={this.state.data} search={this.handleSearch}/>
      </div>
      )
    }
}
export default Coolchart;