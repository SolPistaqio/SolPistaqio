import React from 'react';
import './calc.css'

const programs = [
    {
        name: 'Cyprus',
        type: 'residence',
        timeMin: 7,
        timeMax: 7,
        timeMeasure: 'years',
        investment: 330000,
        investmentTypes: ['Real Estate'],
        investmentV: 'or',
        needToLive: false,
    },
    {
        name: 'Greece',
        type: 'residence',
        timeMin: 7,
        timeMax: 7,
        timeMeasure: 'years',
        investment: 250000,
        investmentTypes: ['Real Estate'],
        investmentV: 'or',
        needToLive: true,
    },
    {
        name: 'Portugal',
        type: 'residence',
        timeMin: 5,
        timeMax: 5,
        timeMeasure: 'years',
        investment: 350000,
        investmentTypes: ['Real Estate', 'Donation'],
        investmentV: 'or',
        needToLive: false,
    },
    {
        name: 'Malta',
        type: 'residence',
        timeMin: 6,
        timeMax: 6,
        timeMeasure: 'years',
        investment: 330000,
        investmentTypes: ['Real Estate', 'Donation'],
        investmentV: 'and',
        needToLive: true,
    },
    {
        name: 'Malta',
        type: 'citizenship',
        timeMin: 12,
        timeMax: 14,
        timeMeasure: 'months',
        investment: 1150000,
        investmentTypes: ['Real Estate', 'Donation', 'Bonds'],
        investmentV: 'and',
        needToLive: true,
    },
    {
        name: 'Cyprus',
        type: 'citizenship',
        timeMin: 6,
        timeMax: 6,
        timeMeasure: 'months',
        investment: 2150000,
        investmentTypes: ['Real Estate', 'Donation'],
        investmentV: 'and',
        needToLive: true,
    }
]

class ProgramChoise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          time: 'Notspec',
          money: 'Notspec',
          type: 'Notspec',
          needToLive: 'Notspec'
      };
        
      }
    render(){
        return(
            <div id="demo">
                <h2>Minimum time to EU citizenship</h2>
                <ul>
                {programs.map(program => <li>{program.timeMin} {program.timeMeasure}</li>)}
                </ul>
                <h2>Minimum investment</h2>
                <ul>
                {programs.map(program => <li>{program.investment} EUR</li>)}
                </ul>
                <h2>Invetsment Type</h2>
                <ul>
                {programs.map(program => <li>{program.investmentTypes}</li>)}
                </ul>
                <h2>Need to reside</h2>
                <ul>
                    <li>Yes</li>
                    <li>No</li>
                </ul>
                <button>Get my program</button>
                <button>Clear</button>
                <div >
                {programs.map(program => (<div className="program" > <h3>{program.name} {program.type}</h3> <a href="/"><p>Learn more -></p></a> </div>))}
                    
                </div>
            </div>
        )
    }
};

export default ProgramChoise;