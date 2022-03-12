import './App.css';
import React, { Component }  from 'react';
import AddBook from './components/add_book';
import Books from './components/books';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Update from './components/update';


function App() {
  return (

    <Router>
      
      <div style={{padding:"50px"}} >
        
        <div>
          <Route exact path='/create' component={AddBook} />
        </div>
        <div style={{ marginTop: 20 }}>
          <Route exact path='/' component={Books} />
        </div>
        <Route path='/update' component={Update} />
      </div> 
      
    </Router>
  );
}

export default App;
