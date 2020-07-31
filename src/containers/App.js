import React, { Component } from 'react';
import './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {
  
  //Explanation udemu Section 7 / 90. Component creation lifecycle
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }
  state = {
    persons: [
      { id:'1', name: 'Milan', age: 28 },
      { id:'2', name: 'Zoran', age: 29 },
      { id:'3', name: 'Vitomir', age: 26 }
    ],
    //otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0, 
    authenticated: false
  }
  
  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }
  
  // componentWillMount(){
  //   console.log('[App.js] componentWillMount');
  // }
  
  componentDidMount(){
    console.log('[App.js] componentDidMount');
    //http request
  }
  
  deletePersonHandler = (personsIndex) => {
    const persons = [...this.state.persons];
    // console.log(persons);
    persons.splice(personsIndex, 1);
    this.setState({persons: persons});
  }
  
  nameChangedHandler = (event, id) => {
    
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    
    const person = {
      ...this.state.persons[personIndex]
    };
    
    // const person = Object.assign({}, this.state.persons[personIndex]);
    
    person.name = event.target.value;
    
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    
    this.setState((prevState, props) => {
      return{
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  };
  
  
  
  
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }
  
  loginHandler=()=> {
    this.setState({authenticated: true});
  }
  
  render() {
    console.log('[App.js] render')
    let persons = null;
    
    if (this.state.showPersons) {
      persons = (
        <Persons 
        persons={this.state.persons} 
        clicked={this.deletePersonHandler} 
        changed={this.nameChangedHandler} 
        isAuthenticated={this.state.authenticated}
        />
        );
      }
      
      return (
        <Auxiliary>
        <button onClick={() => {this.setState({showCockpit: false});
      }}>Remove Cockpit</button>
          <AuthContext.Provider value={{
            authenticated: this.state.authenticated, 
            login: this.loginHandler
            }}
          >
          {this.state.showCockpit ? 
            <Cockpit 
              persons={this.state.persons}
              title={this.props.appTitle}
              clicked={this.togglePersonsHandler}
            /> : null }
            {persons}
            </AuthContext.Provider>
        </Auxiliary>
        );
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
      }
    }
    
    export default withClass(App, 'App');
    