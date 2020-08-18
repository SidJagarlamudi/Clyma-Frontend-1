import React from 'react';
import { Link } from 'react-router-dom';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dashboard from './Dashboard'
import Login from './Login'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { logoutUser } from '../actions/auth'
import { connect } from 'react-redux'
import Rankings from './Rankings'



const NavBar = props => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#FFFFFF',
      },
      secondary: {
        main: '#f44336',
      },
    },
  });

  const tabNameToIndex = {
    0: "home",
    1: "login",
    2: 'rankings'
  }
  const indexToTabName = {
    home: 0,
    login: 1,
    rankings: 2
  };

  const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);

  const handleChange = (event, newValue) => {
    history.push(`${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <div className='menu'>
        <Tabs value={selectedTab} onChange={handleChange} indicatorColor="primary">
          <Tab label="Home" />
          { 
          props.auth ?
          <Tab label="Logout" />
          :
          <Tab label="Login" />
        }
          <Tab label="Rankings"/>
        </Tabs>
        </div>
      </AppBar>
      {selectedTab === 0 && <Dashboard {...props}/>}
      {selectedTab === 1 && <Login {...props}/>}
      {selectedTab === 2 && <Rankings {...props}/>}
      </ThemeProvider>
  );
};

const handleLogout = () => {
  this.props.logoutUser()
  localStorage.removeItem('token')
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = {
  logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
