import React from 'react';
import Dogs from './signups.js';
import './test.css'

let other = [{
    title: 'What is your name?',
    display: false,
    type: 'text',
    name: 'name',
    id: 4,
    options: [{
    idAndValue: 'name',
    label: "Name"
    }]
},
{
    title: 'What is your email?',
    display: false,
    type: 'text',
    name: 'email',
    id: 5,
    options: [{
    idAndValue: 'emal',
    label: "Email"
    }]
 }]

let questions = [
    { title : 'Do you like warm and fuzzy pets?',
     display: true,
     type: "radio",
     name: "fuzzy",
     id: 1,
     options: [{
         idAndValue: 'yes',
         label: "Yes"
     }, {
         idAndValue: 'no',
         label: "No"
     }]},
     {title : 'What kind?',
     display: false,
     type: "radio",
     name: "pet",
     id: 2,
     options: [{
         idAndValue: 'dog',
         label: "Dog"
     }, {
         idAndValue: 'hamster',
         label: "Hamster"
     }, 
     {
         idAndValue: 'cat',
         label: "Cat"
     }]},{
     title : 'Okay. What kind of furless pets you like?',
     display: false,
     type: "radio",
     name: "pet",
     id: 3,
     options: [{
         idAndValue: 'pig',
         label: "Pig"
     }, {
         idAndValue: 'lizard',
         label: "Lizard"
     }, 
     {
         idAndValue: 'snake',
         label: "Snake"
     },
     {
        idAndValue: 'babie',
        label: "Baby"
    },
    ]},
    
 ];

 class RenderQuestionOption extends React.Component {
    constructor(props) {
        super(props);
this.handleChange=this.handleChange.bind(this);
this.handleContactChange = this.handleContactChange.bind(this); 
      }

    handleChange(e) {
       // console.log(e.target);
        const value = e.target.value;
       const field = e.target.name;
      this.props.changeQuestion(field,value);
      }

    handleContactChange (e) {
        console.log(e.target.value);
        console.log(e.target.name);
        const variable = e.target.name;
        const value = e.target.value;
        this.props.changeContacts(variable, value);
    }
     render (){
         let option = this.props.option;
         let question = this.props.question;
         if (question.type !== 'text')
       { return (<div>
          <input key = {question.id} onClick = {this.handleChange} type={question.type} id={option.idAndValue} name={question.name} value={option.idAndValue}  />
         <label for={option.idAndValue}>{option.label}</label> 
        </div>)} else {
            return(<div>
            <input required key = {question.id} onChange = {this.handleContactChange} type={question.type} id={option.idAndValue} name={question.name} 
            //value={option.idAndValue}  
            />
            <label for={option.idAndValue}>{option.label}</label> 
            </div>)
        }
     }
 };

 class RenderOptions extends React.Component {
    render () {
        return (<div> 
            {this.props.options.options.map(option => <RenderQuestionOption  changeQuestion = {this.props.changeQuestion} question = {this.props.options} option = {option}/>)}
            </div>
            )
    
    }
 };
 class RenderQuestion extends React.Component {
    render (){
        if (this.props.number.fur === "Notspec" && this.props.question.id === 1){
            console.log(this.props.number);
        return (<div>
        <p>{this.props.question.title}</p>
            <RenderOptions  changeQuestion = {this.props.changeQuestion} options = {this.props.question}/>
            </div>
            )} else if (this.props.number.fur === "yes" && this.props.question.id === 2){
                return <div>
                <p>{this.props.question.title}</p>
                    <RenderOptions changeQuestion = {this.props.changeQuestion} options = {this.props.question}/>
                    </div>
            }
         else if (this.props.number.fur === "no" && this.props.question.id === 3){
            return <div>
            <p>{this.props.question.title}</p>
                <RenderOptions  changeQuestion = {this.props.changeQuestion} options = {this.props.question}/>
                
                </div>
        }  else if (this.props.number.pet !== "Notspec" && this.props.question.id >3 ){
            return <div>
            <p>{this.props.question.title}</p>
                <RenderOptions  changeQuestion = {this.props.changeQuestion} options = {this.props.question}/>

                </div>
       

        }  else {
            return <div></div>
        }
        
      }
        
};

class Ending extends React.Component{
    render(){
        let pet = '';
        const lizard = './lizard.gif';
        const pig = './pig.gif';
        const snake = './snake.gif';
        const baby = './baby.gif';
        const dog = './puppy.gif';
        const cat = './cat.gif';
        const hamster = './hamster.gif';

        const choice = this.props.pet;

        switch (choice) {
            case 'lizard':
                pet = lizard;
                break; 
            case 'pig':
                pet = pig;
                break; 
            case 'lizard':
                pet = lizard;
                break; 
            case 'snake':
                pet = snake;
                break; 
            case 'babie':
                pet = baby;
                break; 
            case 'dog':
                pet = dog;
                break;
            case 'cat':
                pet = cat;
                break;
            case 'hamster':
                pet = hamster;
                break;
        }
        const src = pet;

        return (<div>
            <p>Check your email (possibly spam) for important message from {this.props.pet}s</p>
            <img src={src}/> 
            </div>)
    }
}
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          fur: 'Notspec',
          question: 1,
          pet: "Notspec",
          submitted: false
      };
        this.changeQuestion = this.changeQuestion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.endForm = this.endForm.bind(this);
      }
      
      changeQuestion(field, value) {
        
        if(field === "fuzzy") {
        this.setState({fur: value});
        
        } else if (field === "pet") {
       this.setState({pet: value});
       
      } else {
      console.log(value);
       };

  };

  handleSubmit(e){
    e.preventDefault();
    console.log(e.target);
    console.log(this.state);
    this.setState({
        submitted: true 
    })
  }

  endForm(){
    const newV = true
    this.setState({
        submitted: newV 
    })
}


    
    render(){
        let submit;
        if (this.state.pet !== "Notspec"
        ){
            submit = <Dogs end ={this.endForm}pet = {this.state.pet}/>
        }
        else submit = <div></div>
        if(this.state.submitted === false)
        {return (<div className= 'form' >
        <form onSubmit={this.handleSubmit}>
            {questions.map(question =>  <RenderQuestion  changeQuestion = {this.changeQuestion} number = {this.state} question = {question}/>)}
            <br/>
        </form> 
        {submit}
        </div>)}
        else {
            return (<div className= 'form' >
            <Ending pet = {this.state.pet}/>
            </div>)
        }
    }
};

export default Test;