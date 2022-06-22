import logo from './logo.svg';
import React, { Component, useState } from 'react';
import TodoList from './components/Todo/Todo';
import UserList from './components/Users/Users';
import { Navbar } from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import 

class App extends Component {

  state = {
    title: this.props?.title ? this.props.title : 'Default title'
  }
  

  render(){
    const {title} = this.state
    return(
      <>
      <Router>
        <Navbar>
          {/* <Todo /> */}
        </Navbar>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/todo' element={<Todo />}/>
          <Route path='/users' element={<Users />}/>
          <Route path='/account' element={<Home />}/>
        </Routes>
      </Router>
      </>
    )
  }
  
}

const Home = ()=> {
  return(
    <>
      <p>Home page</p>
    </>
  )
}

const Todo = ()=> {
  return(
    <>
      <TodoList uid={window.location.hash != '' ? window.location.hash.substring(1) : undefined} />
    </>
  )
}
const Users = ()=> {
  return(
    <>
      <UserList />
    </>
  )
}

export default App;