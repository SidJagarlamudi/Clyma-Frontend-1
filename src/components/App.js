import React, { Fragment } from 'react';
import '../App.css';
import NavBar from './NavBar';
import { Route, Switch, useRouteMatch, useLocation } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Loading from "./loading.js"
import Login from './Login';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';


function App() {
  // const match = useRouteMatch()
  // const location = useLocation()

  return (
    
    <BrowserRouter forceRefresh={true}>
    <div className="App">
    {/* <Redirect exact from="/home" to="/home/about" /> */}
    <Route exact path="/:page?" render={props => <NavBar {...props} />} />
    {/* <Route
          path="/"
          render={({ location }) => (
            <Fragment>
              <div className='menu'>
              <Tabs value={location.pathname} indicatorColor="primary">
                <Tab label="Item One" value="/" component={Link} to='dashboard' />
                <Tab label="Item Two" value="/tab2" component={Link} to='login' />
              </Tabs>
              </div>
              <Switch>
              <Route show={false} path='/home' component={Dashboard} />
              <Route path='/login' component={Login} />
              </Switch>
            </Fragment>
          )}
        /> */}
    {/* <AppBar position="static"> */}
    {/* <NavBar icon="logo" title="ClyMate" description="climate app" /> */}
    {/* <Loading /> */}
    {/* <Tabs value={this.props.history.location.path} >
    <Tab component={Link} label="Page One" to="/dashboard"  />
    <Tab component={Link} label="Page Two" to="/login"  />

    </Tabs>
    </AppBar>
      <Switch>
        <Route show={false} path='/home' component={Dashboard} />
        <Route path='/login' component={Login} />
      </Switch> */}
    </div>
    </BrowserRouter>
  );
}

export default App;
