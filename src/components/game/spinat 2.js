import React from 'react';
import './game.css'

const img = ['./0png']
class Spoink extends React.Component{

    
    render(){
        const affection = this.props.affection;
        if (affection>=-3 && affection<=3){
        const src = './'+affection+'.png'

        //const src = img[0]
        return (<div>
        <img src={src}/>
        </div>)}
        else {
            return {}
        }
    }
}

export default Spoink;