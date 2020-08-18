import React, { Component } from "react";


export class ClimateScore extends Component {

  state = {
    showCliamteScore: true,
    address: 'Wilson Island, Australia',
    aqi: '7',
    coords: {
      lat: -23.304354,
      lng: 151.916417
    }
  }
  
  componentDidMount(){
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {ClimateScore, DroughtScore, FireScore, SeaLevelScore, StormScore, TempScore} = this.props.scores
    const {lat, lng} = this.state.coords
    const newLat = parseFloat(lat).toFixed(4)
    const newLng = parseFloat(lng).toFixed(4)
    if (this.props.scores === false) {
      return <div><p>Latitude: {newLat+ '---'}Longitude: {newLng+ '---'}Location: {this.state.address+'|'}{this.state.aqi+'|'}</p></div>
    } else {
    return (
    <span >
      <p>Climate Score:{ClimateScore + '...'}Drought Score: {DroughtScore+ '...'} Fire Score: {FireScore+ '...'} Sea Level Score: {SeaLevelScore+ '...'} Storm Score: {StormScore+ '...'} Temperature Score: {TempScore}</p>
      <p>Latitude: {newLat + '---'}Longitude: {newLng+ '---'}Location: {this.state.address}</p>
    </span>)
    }    
  }      


} 

export default ClimateScore