import React from 'react';
import { connect } from 'react-redux'
import { fetchLocationsSuccess } from '../actions/location'
import { fetchStatSuccess } from '../actions/stat'
import { fetchCitiesSuccess } from '../actions/city'
import { currentUser } from '../actions/auth'
import ClimateMap from './ClimateMap'
import Geocode from "react-geocode";
import climScores from './climScores.json'
import NewsCard from './NewsCard';

class Rankings extends React.Component {

  state = {
    climateScores: climScores,
  }
  
  componentDidMount(){
    const token = localStorage.getItem('token')
    console.log(token)
    if (!token) {
      this.props.history.push('/login')
    } else {
      const reqObj = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch('http://localhost:3001/current_user', reqObj)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.props.currentUser(data)
      })
      if (this.props.auth !== null){

        fetch('http://localhost:3001/locations')
        .then(resp => resp.json())
        .then(locations => {
          console.log(this.props)
          console.log(this.state)
          const usersLocations = locations.filter(loc => loc.user_id === this.props.auth.id)
          this.props.fetchLocationsSuccess(usersLocations)
        })
      }
      // fetch('http://localhost:3001/users')
      // .then(resp => resp.json())
      // .then(data => {
      //   this.props.fetchUsersSuccess(data)
      // })
      fetch('https://api.waqi.info/map/bounds/?latlng=85,-180,-85.05115,180&token=87b2bba6a5b2e26c577ffc48e297eaed82a8408c')
      .then(resp => resp.json())
      .then(stations => {
        let y = stations.data
        let x = stations.data.slice(0,1000)
        console.log(y)
        this.props.fetchStatSuccess(x)
      })
      fetch('https://newsapi.org/v2/everything?q=climate%20change&apiKey=cdcfd508f0a3409cb71b20f0d5bba38e')  
      .then(resp => resp.json())
      .then(news => {
        console.log(news.articles)
      })
    }
  }

  renderNews = () => {
    console.log('step 1')
    return <NewsCard/>
  }

  render(){ 
    console.log(this.props.stats)
    this.renderNews()
    // if (this.props.stats.length !== 0){
    return (
      <div>
       <NewsCard/>
       <h1>Rankings</h1>
      </div>)
    // } else {
    //   return null
    // }
  };
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    current_user: state.currentUser,
    locations: state.locations,
    stats: state.stats,
    cities: state.cities,
  }
}

const mapDispatchToProps = {
  fetchLocationsSuccess,
  fetchStatSuccess,
  fetchCitiesSuccess,
  currentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Rankings);


