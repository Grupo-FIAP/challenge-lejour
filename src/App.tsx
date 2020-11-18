import Login from './Pages/Login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './Style/app.scss';
import Dashboard from './Pages/Dashboard/Dashboard';
import Usuarios from './Pages/Usuarios/Usuarios';
import Fornecedores from './Pages/Fornecedores/Fornecedores';
import Casamentos from './Pages/Casamentos/Casamentos';

import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path='/' component={Login} exact />
            <Route path='/dashboard' component={Dashboard} exact/>
            <Route path='/usuarios' component={Usuarios} exact/>
            <Route path='/casamentos' component={Casamentos} exact/>
            <Route path='/fornecedores' component={Fornecedores} exact/>
          </Switch>
        </Router>
      </>
    )
  }
}