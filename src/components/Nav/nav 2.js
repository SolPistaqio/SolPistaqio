import React from 'react';
import './nav.css'

class NavBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          class: 'big'
      };
        this.displayMenu = this.displayMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.switchStyle = this.switchStyle.bind(this)
      }

    displayMenu() {
        this.setState({
            class: 'small'
        })
    }

    hideMenu() {
        this.setState({
            class: 'big'
        })
    }

    switchStyle(){
        if(this.state.style === 'big'){
            this.displayMenu()
        } else {
            this.hideMenu()
        }
    }


    render(){
        return (
            <div className='navbar'>
                <a href="#bio"><h1 >Sol</h1></a>
                <button onMouseEnter= {this.displayMenu} onClick={this.switchStyle}>Sol's Burger</button>
                <ul className = {this.state.class} >
                    <a href="#bio" className='hide' ><li onClick = {this.hideMenu}>About Sol</li></a>
                    <a href="#chart"><li onClick = {this.hideMenu}>Cool graph I can do with API data</li></a>
                    <a href="#test"><li onClick = {this.hideMenu}>Test to email app</li></a>
                    <a href="#walk"><li onClick = {this.hideMenu}>Park app</li></a>
                    <a href="#game" ><li onClick = {this.hideMenu}>Awesome game about true love</li></a>
                </ul>
            </div>
        )
    }
}

export default NavBar;