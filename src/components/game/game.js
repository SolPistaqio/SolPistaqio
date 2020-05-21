import React from 'react';
import './game.css';
import Spoink from './spinat';
import Gamefield from './grid';

class Game extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            level: 1,
            affection: 0,
        }
       this.foodChoise=this.foodChoise.bind(this);
       this.restartGame=this.restartGame.bind(this);
    }

    foodChoise(foodItem){
        const newLevel = this.state.level + 1;
        let newAffection = this.state.affection;
        if(foodItem.fType === 'bad') {
            newAffection = newAffection -1
        } else {
            newAffection = newAffection + 1
        }
        this.setState(
            {
                level: newLevel,
                affection: newAffection
            }
        )
    }

    restartGame(){
        this.setState({
            level: 1,
            affection: 0,
        })
    }

render(){
    return (<div className="gameContainer">
        <h1> Try to make friends with Spinat by offering it food</h1>
        <p>Click on the food and see what the broccoli does </p>
        <div className='game'>
            
        <Gamefield restart={this.restartGame} affection={this.state.affection} foodChoise={this.foodChoise}  level={this.state.level} />
        <Spoink affection={this.state.affection} />
        </div>
        </div>
    )
}

}

export default Game;
