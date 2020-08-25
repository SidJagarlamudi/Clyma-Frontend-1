import React from 'react';
import '../App.css';
import NavBar from './NavBar';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage'



function App() {
  // const match = useRouteMatch()
  // const location = useLocation()
 
  
  return (
    <BrowserRouter forceRefresh={true}>
    <div className="App">
    {/* <Redirect exact from="/home" to="/home/about" /> */}
    <Route exact path="/:page?" render={props => <NavBar {...props} />} />
    <Route path='/' exact component={ LandingPage }/>
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
