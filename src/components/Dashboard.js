import React from 'react';
import { connect } from 'react-redux'
import { fetchLocationsSuccess } from '../actions/location'
import { fetchStatSuccess } from '../actions/stat'
import { fetchCitiesSuccess } from '../actions/city'
import { currentUser } from '../actions/auth'
import ClimateMap from './ClimateMap'
import climScores from './climScores.json'

class Dashboard extends React.Component {

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
      fetch('https://api.waqi.info/map/bounds/?latlng=85,-180,-85.05115,180&token=87b2bba6a5b2e26c577ffc48e297eaed82a8408c')
      .then(resp => resp.json())
      .then(stations => {
        let y = stations.data
        let x = stations.data.slice(0,1000)
        console.log(y)
        this.props.fetchStatSuccess(x)
      })
    //   fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=1000-largest-us-cities-by-population-with-geographic-coordinates&q=&rows=1000&sort=-rank&facet=city&facet=state')
    //   .then(resp => resp.json())
    //   .then(cities => {
    //     this.props.fetchCitiesSuccess(cities.records)
    //   })
    //   console.log(this.props)
    //   console.log(this.state)
    // }
    }
  }

  render(){ 
    console.log(this.props)
    if (this.props.stats.length !== 0){
    return (
      <div>
       
        <ClimateMap cities={this.props.cities} climateScores={this.state.climateScores}/>
      </div>)
    } else {
      return null
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


