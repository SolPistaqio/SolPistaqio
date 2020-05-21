import React from 'react';
import './story.css';


class MyBio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lePic: './expectation.png',
      clicked: false
  };
    this.changePhoto = this.changePhoto.bind(this);
    this.changePhotoBack = this.changePhotoBack.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  changePhoto = () => {
    if (this.state.clicked === false) {this.setState({lePic: './me.jpg'});}
  }

  changePhotoBack = () => {
    if (this.state.clicked === false) {this.setState({lePic: './expectation.png'});}
  }

  handleClick = () => {
    this.setState({lePic: './me.jpg', clicked: true});
  }

  render() {
    let lePic = this.state.lePic;
    const Title = 'Hire good programmer in Riga';
    return  (
    <div className="white">
    <div className="container"><div className="story">
    <h2>Hi! My name's Sol and I'm your dream programmer</h2>
    <p>Even if you don't dream about awesome programmers at night you probably want someone who:</p>
    <ul>
        <li>Can help you with your frontend needs (JS, REACT, CSS, HTML)</li>
        <li>Will help you integrate with whatever</li>
        <li>Understands SEO and Marketing</li>
        <li>Is super easy to deal with. No nerd-speak. Unless you want to ;)</li>
    </ul>
    <p>I'm not a designer. I can't design to save my life. But if you want to see how I handle css press the button below at your own risk</p>
    <button>Turn on the DESIGN O_O</button>
    </div>
    <div className="pic">
        <img  className="pic" onClickCapture = {this.handleClick} onMouseEnter={this.changePhoto} onMouseLeave = {this.changePhotoBack} 
     src = {lePic}
     alt = {Title}
    />
    </div>
   </div>
   </div>);
  }
};


  

export default MyBio;
