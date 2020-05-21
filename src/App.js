import React from 'react';
import './App.css';
import './reset.css';
import Coolchart from './components/Infograph/infograph';
import MyBio from './components/Story/story';
import Test from './components/Test/test';
import NavBar from './components/Nav/nav';
import RenderWalk from './components/Parks and weather/parks';
import Game from './components/game/game';

/*
<NavBar />
<div className='app'>
<div id="bio"><MyBio className='bio' /></div>

<div id="chart"><Coolchart className='chart' /></div>
<div id="test" ><Test className='form'/></div>
<div id="walk"><RenderWalk  /> </div>
<div id="game"><Game  /> </div>
</div>
*/

const content = [
  {
    type: 'graph',
    info: 'API Data Get and Graph Display',
    desc: 'This app gets financial data and displays it on a graph'
  },

  {
    type: 'mail',
    info: 'Forms, Tests and Subscriptions',
    desc: 'This app gathers data and sends an email based on the info provided'
  },

  {
    type: 'park',
    info: 'API Data Get and List Display',
    desc: 'This app displays parks in a chosen city'
  },

  {
    type: 'igame',
    info: 'Interactive browser game',
    desc: 'This app is a simple browser game'
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'none',
      appToShow: 'none'
  };
    this.giveDesc = this.giveDesc.bind(this);
    this.hideDesc = this.hideDesc.bind(this);
    this.showApp = this.showApp.bind(this);
    this.hideApp = this.hideApp.bind(this);
  }

  showApp(e){
    if (e==='graph'){
    this.setState(
     {appToShow: <Coolchart className='chart' />}
   )} else if (e==='igame'){
   this.setState(
    {appToShow: <Game  />}
  ) }
  else if (e === 'park'){
    this.setState(
      {appToShow: <RenderWalk  />}
    )
  } else if (e === 'mail'){
    this.setState(
      {appToShow: <Test className='form'/>}
    )
  }
   }

  hideDesc(){
    this.setState(
     { active: 'none'}
    )
  }

  giveDesc(e){
    this.setState(
      { active: e}
     )
  }
  hideApp(){
    this.setState(
      { 
        appToShow: 'none',
        active: 'none'
    }
     )
  }
  render() {
    if (this.state.appToShow === 'none')
    {return (
   <div >
<div className="head">
<h1>Sol Dvortsova</h1>

<p>Hi, I'm starting out as JS programmer. Look what I can do:</p>
</div>
<div className="works" >
{content.map(item => {
  if (item.type === this.state.active){
  return (<div key={item.type} className={item.type} 
   onMouseLeave = {this.hideDesc}
   onClick = {() => this.showApp(item.type)}
  >
  <p className='desc'>{item.desc}</p>
</div>)}
else {
  return (<div key={item.type} className={item.type} 
    onMouseOver={() => this.giveDesc(item.type)} 
    onMouseLeave = {this.hideDesc}
    onClick = {() => this.showApp(item.type)}
    >
    <p className='info'>{item.info}</p>
  </div>)

}
})}
    
</div>
<div className="footer">
<p  >If you want to hire me, let me know.</p>
<a href="mailto: solvita.dvortsova@icloud.com?Subject=Hi Sol!" target="_top"><button>Contact via email</button></a>
<a href="https://t.me/BlockchainSol"><button>Contact via Telegram</button></a>
</div>
      
    </div>
  )} else {
    return (
    <div >
      <div className="head">
      <button onClick={this.hideApp}>Back to main</button>
      </div>
      {this.state.appToShow}
      </div>
    )
  }
  
  
  ;}
};

export default App;
