import React, { Component } from 'react';
import classes from  './App.css';
import Person from '../components/Persons/Person/Person';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';


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
    let persons = null;
    let btnclass = '';
    if (this.state.showPersons)
    {
      persons = (
        <div>
          {this.state.persons.map((person,index) =>
          {
            return <ErrorBoundary key={person.id}><Person click={() => this.personDeleteHandler(index)} name={person.name}
                    age={person.age}  change={(event) => this.nameChangeHandler(event,person.id)}/></ErrorBoundary>
          })}
        </div>
      );
      btnclass = classes.Red;
    }
     let assignedClasses = [];
     if (this.state.persons.length <= 2){
       assignedClasses.push(classes.red);
     }
     if (this.state.persons.length <=1){
       assignedClasses.push(classes.bold);
     }
    return (
        <div className={classes.App}>
          <h1> Hi , I am here</h1>
          <p className={assignedClasses.join(' ')}> This is really working</p>
          <button className={btnclass} onClick={this.togglePersonHandler}>Switch name</button>
          {persons}
        </div>
      //React.createElement('div',{className:'App'},React.createElement('h1',null,'Hi I\'am Here'))
    );
  }
}

export default App;
