import React from 'react';
import './game.css'

const bad = ['0x1F354','0x1F35F','0x1F355','0x1F96E','0x1F361','0x1F366','0x1F369','0x1F36A','0x1F9C1','0x1F36C'];
const good = ['0x1F957','0x1F966','0x1F96C','0x1F952','0x1F955','0x1F346','0x1F951','0x1F345','0x1F363','0x1F360'];
const location = ['one', 'two','three','four','five','six','seven','eight','nine']


function getItemsNeeded(level) {
   // console.log('the level is ' + level)
    const start = 4;
    let neededItems = 5;
    if (level<6){
        neededItems = start + level;
    } else if (level<8){
        neededItems = level + 2
    } else if (level<10) {
        neededItems = level - 3
    } else {
        return 9
    }
   // console.log('we will have '+neededItems+ ' items this round');
    return neededItems
    
}

function getNumberOfBad (level){
    if (level<6){
        return level + 2
    } else if (level<8) {
        return level - 2
    } else {
        return Math.floor(Math.random() * Math.floor(4)) + 1
    }
}

function getRandomRange (itemsNeeded, max){
    let range = [];
    while(range.length<itemsNeeded) {
    const randomNumber = Math.floor(Math.random() * Math.floor(max));
    if(range.indexOf(randomNumber) === -1) range.push(randomNumber);
    }
    return range
}

class FoodItem extends React.Component{
    constructor(props) {
        super(props);
this.handleFoodChoise=this.handleFoodChoise.bind(this); 
      }

    handleFoodChoise(e){
       // console.log('you made your choice ' + this.props.foodItem.fType)
        this.props.foodChoise(this.props.foodItem)

        
    }
render(){
    return (<span  onClick={this.handleFoodChoise} role="image"  className={this.props.locations[this.props.food.indexOf(this.props.foodItem)]}>{String.fromCodePoint(this.props.foodItem.pic)}</span>)
}
}


class Gamefield extends React.Component{

    constructor(props) {
        super(props);
this.handleRestart=this.handleRestart.bind(this); 
      }
    
    getfood(itemsNeeded, level) {
        const badN = getNumberOfBad(level);
        const goodN = itemsNeeded - badN;
       // console.log('from '+itemsNeeded+' number of items you get '+goodN+ ' of good and '+badN+ ' of bad')

        let food = [];
        //get good food
        const goodRange = getRandomRange(goodN, 10);
        goodRange.forEach(index=>
            food.push(
                {pic: good[index],
                fType: 'good'}
                )
            )
        
        //add bad food
        const badRange = getRandomRange(badN, 10);
        badRange.forEach(index=>
            food.push(
                {pic: bad[index],
                fType: 'bad'}
                )
            )
       // console.log(food);
        return food
        
    }

    getLocation (itemsNeeded){
        const range = getRandomRange(itemsNeeded, 9);
        let locations = [];
        range.forEach(index=> {
            locations.push(location[index])
        })
       // console.log(locations);
        return locations
    }

    handleRestart(e){
        this.props.restart()
    }
    
    render(){
        const level = this.props.level;
        const itemsQ = getItemsNeeded(level);
        const food = this.getfood(itemsQ, level);
        const locations = this.getLocation(itemsQ);
        const affection = Math.abs(this.props.affection);

        if (level <10 && affection < 3){
        return  (<div className='grid'>
            {food.map(foodItem => {
                
                return <FoodItem foodChoise={this.props.foodChoise} key ={foodItem.pic} food={food} locations={locations} foodItem={foodItem}/>
                
            })}

        </div>)}
        else if(affection>=3) {
            return (<div className='grid' >
            <h2>Spinat is not going to be your friend</h2>
            <button onClick={this.handleRestart}>Try again</button>
            </div>)
        } else if (level>= 10 && this.props.affection === -1 ||this.props.affection === -2) {
            return (<div className='grid' >
                <h2>Spinat is your friend FOREVER!</h2>
                <button onClick={this.handleRestart}>Try again</button>
                </div>) 
        }
        else {
            return (<div className='grid' >
                <h2>Spinat is not going to be your friend</h2>
                <button onClick={this.handleRestart}>Try again</button>
                </div>)
        }
    }
}

export default Gamefield;



