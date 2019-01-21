import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';


class App extends Component {

  state = {
    persons : [
      {id :'abc',name:"alpha",age:"23"},
      {id :'abcd',name:"beta",age:"29"},
      {id :'abcde',name:"theta",age:"21"}
    ],
    showPersons : false
  }


  togglePersonHandler = () => {
    const doesShow = this.state.showPersons
    this.setState({
      showPersons : !doesShow
    })
  }
  nameChangeHandler = (event,id) => {
  //  console.log("called");
  const personIndex = this.state.persons.findIndex(p => {return p.id === id});

  const person = {...this.state.persons[personIndex]}
  person.name = event.target.value;
  const persons = [...this.state.persons];

  persons[personIndex] = person;
  this.setState({
    persons : persons
  })
  }

  personDeleteHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personIndex,1);
    this.setState({persons : persons});
  }
  render() {
    const style = {
      backgroundColor : 'green',
      color:'white',
      font : 'inherit',
      border: '1px solid blue',
      padding : '8px',
      cursor : 'pointer',
    }
    let persons = null;
    if (this.state.showPersons)
    {
      persons = (
        <div>
          {this.state.persons.map((person,index) =>
          {
            return <Person click={() => this.personDeleteHandler(index)} name={person.name}
                    age={person.age} key={person.id} change={(event) => this.nameChangeHandler(event,person.id)}/>
          })}
        </div>
      );
      style.backgroundColor = 'red';
    }
     let classes = [];
     if (this.state.persons.length <= 2){
       classes.push('red');
     }
     if (this.state.persons.length <=1){
       classes.push('bold');
     }
    return (
        <div className="App">
          <h1> Hi , I am here</h1>
          <p className={classes.join(' ')}> This is really working</p>
          <button style = {style} onClick={this.togglePersonHandler}>Switch name</button>
          {persons}
        </div>
      //React.createElement('div',{className:'App'},React.createElement('h1',null,'Hi I\'am Here'))
    );
  }
}

export default App;
