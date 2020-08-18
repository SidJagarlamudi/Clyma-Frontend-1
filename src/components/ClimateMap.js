import React, { Component } from "react";
import { GoogleApiWrapper, Map, Marker, InfoWindow} from 'google-maps-react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
import Geocode from "react-geocode";
import ClimateScore from './ClimateScore'
import Grid from '@material-ui/core/Grid';
import { Dropdown, Checkbox, Image, Segment } from 'semantic-ui-react'
import mapStyles from './mapStyles'
import Markers from './Markers'
import {HorizontalBar, Bar, Line} from 'react-chartjs-2';
import xyz from './xyz.jpg'
import LessThan25AQI from '../images/LessThan25AQI.jpg'
import LessThan50AQI from '../images/LessThan50AQI.jpg'
import LessThan100AQI from '../images/LessThan100AQI.jpg'
import LessThan150AQI from '../images/LessThan150AQI.jpg'
import LessThan200AQI from '../images/LessThan200AQI.jpg'
import LessThan300AQI from '../images/LessThan300AQI.jpg'
import Over300AQI from '../images/Over300AQI.jpg'
import { fetchCitiesSuccess } from "../actions/city";
import UserLocations from './UserLocations'
import { createLocationSuccess } from '../actions/location'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import SaveIcon from '@material-ui/icons/Save';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';


export class ClimateMap extends Component {
  constructor(){
    super()
    this.timer = null
  }
  state = {
    searchText: '',
    showClimateScore: false,
    coords: {
      lat: -23.304354,
      lng: 151.916417
    },
    address: 'Wilson Island, Australia',
    allScores: false,
    showAQI: true,
    hoveredPinStat: {},
    hoveredCoords: {
      lat: '',
      lng: ''
    },
    showInfo: false,
    activeMarker: {},
    selectedPlace: {},
    data: false,
    markersRendered: false,
    showUserLocations: false,
    hovered: false,
  }

  mouseEnterHandler = (marker,e) => {
    this.setState({ hovered: true, activeMarker: marker });
  }

  mouseLeaveHandler = (marker) => {
    this.setState({ hovered: false });
  }

  // shouldComponentUpdate( nextProps, nextState ){
  //   if (this.state.coords !== nextState.coords){
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  componentWillUnmount() {
    this.clearTimer();
  }

  onTimeout = () => {
    console.log(this.state.activeMarker)
    fetch(`https://api.waqi.info/feed/geo:${this.state.activeMarker.info.lat};${this.state.activeMarker.info.lon}/?token=87b2bba6a5b2e26c577ffc48e297eaed82a8408c`)
      .then(resp => resp.json())
      .then(data => {
        if (this.state.showUserLocations){
          this.setState({
            data: data.data,
            showUserLocations: false
          })
        } else {
          this.setState({
            data: data.data
          })
        }
        console.log(data)
      })
  };

  clearTimer = () => {
    clearTimeout(this.timer);
  };

  componentDidUpdate() {
    if (this.state.hovered) {
      this.timer = setTimeout(this.onTimeout, 500);
    } else {
      this.clearTimer();
    }
  }

  

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lng = position.coords.longitude
      let currentLocation = {lat: lat,lng: lng}
      this.setState({
        coords: currentLocation
      })
    })
    fetch(`https://api.waqi.info/feed/geo:${this.state.coords.lat};${this.state.coords.lng}/?token=87b2bba6a5b2e26c577ffc48e297eaed82a8408c`)
    .then(resp => resp.json())
    .then(data => console.log(data.data))
    
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.coords=== nextState.coords) {
  //     return false;
  //   } else {
  //   return true;
  //   }
  // }

  mapCLicked = (mapProps, map, event) => {
    console.log(event)
  }

  onMarkerDragEnd = (coord) => {
    const { latLng } = coord;
    const newLat = latLng.lat();
    const newLon = latLng.lng();
    // this.setState({
    //   coords: {
    //     lat: newLat,
    //     lng: newLon
    //   }
    // })
    console.log(this.state.coords)
    this._score.state.coords.lat = newLat
    this._score.state.coords.lng = newLon
    this._map.map.setCenter({lat: newLat, lng: newLon})    
    // fetch(`https://climate-score.p.rapidapi.com/${newLat}/${newLon}`, {
    // 	"method": "GET",
    // 	"headers": {
	  // 	"x-rapidapi-host": "climate-score.p.rapidapi.com",
	  // 	"x-rapidapi-key": "c5855f8358mshe884588b34ae70ep1a1627jsn5e1e97c23a80"
    //   }
    // })
    // .then(resp => resp.json())
    // .then(data => {
    //   console.log(data)
    //   this.setState({
    //     allScores: {
    //       ClimateScore: data.ClimateScore,
    //       DroughtScore: data.DroughtScore,
    //       FireScore: data.FireScore,
    //       SeaLevelScore: data.SeaLevelScore,
    //       StormScore: data.StormScore,
    //       TempScore: data.TempScore,
    //     },
    //   })
    // })
    // .catch(err => {
    //   this.setState({
    //     allScores: false,
    //   })
    //   console.log(err)})
    Geocode.setApiKey("AIzaSyDmc1KD6Xr80d3hduc4Q2MObw1uotQuY-8");
    Geocode.fromLatLng(newLat, newLon).then(
      response => {
        const newAddress = response.results[0].formatted_address;
        this._score.state.address = newAddress
      },
      error => {
        console.error(error);
      }
    );
    fetch(`https://api.waqi.info/feed/geo:${newLat};${newLon}/?token=87b2bba6a5b2e26c577ffc48e297eaed82a8408c`)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      this._score.state.aqi = data.data.aqi})  
  };

  handleSubmit = (value) => {
    Geocode.setApiKey("AIzaSyDmc1KD6Xr80d3hduc4Q2MObw1uotQuY-8");
    Geocode.fromAddress(`${value.description}`).then(
      response => {
      const { lat, lng } = response.results[0].geometry.location;

      this.setState({
        coords: {
          lat: lat,
          lng: lng
        }
      })
      this._map.map.setCenter({lat: lat, lng: lng})  
      this._marker.marker.setPosition({lat: lat, lng: lng}) 
      console.log(this._search) 
      this._search.clearValue()
      fetch(`https://climate-score.p.rapidapi.com/${lat}/${lng}`, {
        "method": "GET",
        "headers": {
        "x-rapidapi-host": "climate-score.p.rapidapi.com",
        "x-rapidapi-key": "c5855f8358mshe884588b34ae70ep1a1627jsn5e1e97c23a80"
        }
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.setState({
          allScores: {
            ClimateScore: data.ClimateScore,
            DroughtScore: data.DroughtScore,
            FireScore: data.FireScore,
            SeaLevelScore: data.SeaLevelScore,
            StormScore: data.StormScore,
            TempScore: data.TempScore,
          },
        })
      })
      .catch(err => {
        this.setState({
          allScores: false,
      })})
      console.log(this.state.coords)
      Geocode.fromLatLng(lat, lng).then(
      response => {
        // const newAddress = response.results[0].formatted_address;
        // this._score.state.address = newAddress
      
      },
      error => {
        console.error(error);
      });
      fetch(`https://api.waqi.info/feed/geo:${lat};${lng}/?token=87b2bba6a5b2e26c577ffc48e297eaed82a8408c`)
      .then(resp => resp.json())
      .then(locationData => {
        console.log(locationData)
        this.setState({
          data: locationData.data
        })
      })  
      // Geocode.setApiKey("AIzaSyDmc1KD6Xr80d3hduc4Q2MObw1uotQuY-8");
    })
  }

  renderClimateScores = () => {
    return this.props.climateScores.map((score)=>{
      const numberString = score.ClimateScore.toString()
      const google = this.props.google
      let iw = 83,
      ih = 107
      return <Marker position={{lat: score.lat, lng: score.lng}}
      icon={{
        url: `https://waqi.info/mapicon/${numberString}.50.png`,
        anchor: new google.maps.Point(iw / 4, ih / 2 - 5),
        size: new google.maps.Size(iw / 2, ih / 2),
        scaledSize: new google.maps.Size(30, 40)
      }}
      />
    })
  }  
  
  labelClicked = (e) => {
    console.log('working')
    console.log(e.nativeEvent.target.innerHTML)
    if (e.nativeEvent.target.innerHTML === 'Climate Score™'){
      this.setState({
        showAQI: false
      })
    } else {
      this.setState({
        showAQI: true
      })
    }
  }

  markerHover = () => {
    const google = this.props.google
    if (this._marker.marker.getAnimation() !== null) {
      this._marker.marker.setAnimation(null);
    } else {
      this._marker.marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
  mouseOut = e => {
    this.setState({
      showInfo: false
    })
  }

  onMarkerClick = (marker, e) => {
    console.log(marker)
    fetch(`https://api.waqi.info/feed/geo:${marker.info.lat};${marker.info.lon}/?token=87b2bba6a5b2e26c577ffc48e297eaed82a8408c`)
      .then(resp => resp.json())
      .then(data => {
        if (this.state.showUserLocations){
          this.setState({
            data: data.data,
            showUserLocations: false
          })
        } else {
          this.setState({
            data: data.data
          })
        }
        console.log(data)
      })
  }  
  
  onMarkerHover = (props, marker, e) => {

    console.log(marker)
    console.log(e)
    this.setState({
      activeMarker: marker,
      showInfo: true
    })
  }

  // showInfo = () => {
  //   console.log('works')
  // }


  addLocation = () => {
    console.log('I WAS CLICKED!!!!')
    if (this.state.data !== false){
      const newLocation = {name: this.state.data.city.name, user_id: this.props.auth.id, lat:this.state.data.city.geo[0], lng:this.state.data.city.geo[1]}
      const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newLocation)
      }
      fetch('http://localhost:3001/locations', reqObj)
      .then(resp => resp.json())
      .then(newLocation => {
        this.props.createLocationSuccess(newLocation)
      })
    }
  }
    
  goToLocation = (location) => {
    console.log('I was clickEd!!')
    console.log(location)
    this._map.map.setCenter({lat: location.lat, lng: location.lng})  
    fetch(`https://api.waqi.info/feed/geo:${location.lat};${location.lng}/?token=87b2bba6a5b2e26c577ffc48e297eaed82a8408c`)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          data: data.data,
          showUserLocations: false
        })
        console.log(data)
      })
  }

  showMyList = () => {
    console.log('YAYY you are a coding GOD')
    this.setState({
      showUserLocations: true
    })
  }

  showStats = () => {
    this.setState({
      showUserLocations: false
    })
  }

  render() {
    let o3Data
    let pm10Data
    let days
    let hours
    let minutes 
    if (this.state.data !== false ){
      let now = new Date().getTime();
      let newDate = new Date(this.state.data.time.iso).getTime()
      let distance = newDate - now;
      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      if (this.state.data.forecast.daily !== undefined && 'o3' in this.state.data.forecast.daily){
        let labelArr = [], avgArr = [], minArr = [], maxArr = []
        for(let i=0;i<this.state.data.forecast.daily.o3.length;i++){
          labelArr.push((new Date(this.state.data.forecast.daily.o3[i].day)).toString().substring(0, 10))
          avgArr.push(this.state.data.forecast.daily.o3[i].avg)
          minArr.push(this.state.data.forecast.daily.o3[i].min)
          maxArr.push(this.state.data.forecast.daily.o3[i].max)
        }
        o3Data = {
          labels: labelArr, 
          datasets: [
            {
              label: "max",
              backgroundColor: '#f7ff66',
              borderColor: "#f7ff66",
              borderWidth: 0,
              data: maxArr,
              fill: "1",
              radius: 1,
            },
            {
              label: "avg",
              backgroundColor: '#4a9eff',
              borderColor: '#4a9eff',
              borderWidth: 1,
              data: avgArr,
              fill: "-1",line: false,
              radius: 5
            },
            {
              label: "min",
              backgroundColor: '#87ff9f',
              borderColor: "#87ff9f",
              borderWidth: 0,
              data: minArr,line: false,
              fill: '1',
              radius: 1,
            }
          ],
        }
      }
      if (this.state.data.forecast.daily !== undefined && 'pm10' in this.state.data.forecast.daily){
        let labelArr = [], avgArr = [], minArr = [], maxArr = []
        for(let i=0;i<this.state.data.forecast.daily.pm10.length;i++){
          labelArr.push((new Date(this.state.data.forecast.daily.pm10[i].day)).toString().substring(0, 10))
          avgArr.push(this.state.data.forecast.daily.pm10[i].avg)
          minArr.push(this.state.data.forecast.daily.pm10[i].min)
          maxArr.push(this.state.data.forecast.daily.pm10[i].max)
        }
        pm10Data = {
          labels: labelArr, 
          datasets: [
            {
              label: "max",
              backgroundColor: '#f7ff66',
              borderColor: "#f7ff66",
              borderWidth: 0,
              data: maxArr,
              fill: "1",
              radius: 1,
            },
            {
              label: "avg",
              backgroundColor: '#4a9eff',
              borderColor: '#4a9eff',
              borderWidth: 1,
              data: avgArr,
              fill: "-1",line: false,
              radius: 5
            },
            {
              label: "min",
              backgroundColor: '#87ff9f',
              borderColor: "#87ff9f",
              borderWidth: 0,
              data: minArr,line: false,
              fill: '1',
              radius: 1,
            }
          ],
        }
      }  
    }
    const mapOptions = [
      {
        key: 'Climate Score',
        text: 'Climate Score™',
        value: 'Climate Score',
      },
      {
        key: 'Air Quality Index',
        text: 'Air Quality Index',
        value: 'Air Quality Index',
      }
    ] 
    let response
    if (this.state.data !== false){
      if(this.state.data.aqi <= 25){
        response = 'Great Quality!'
      } else if (this.state.data.aqi <= 50){
        response = 'Good'
      } else {
        response = 'HIGH'
      }
    }
    let FlexImage
    if (this.state.data !== false && this.state.data.aqi <= 25){
      FlexImage = LessThan25AQI
    } else if (this.state.data !== false && this.state.data.aqi <= 50){
      FlexImage = LessThan50AQI
    } else if (this.state.data !== false && this.state.data.aqi <= 100){
      FlexImage = LessThan100AQI
    } else if (this.state.data !== false && this.state.data.aqi <= 150){
      FlexImage = LessThan150AQI
    } else if (this.state.data !== false && this.state.data.aqi <= 200){
      FlexImage = LessThan200AQI
    } else if (this.state.data !== false && this.state.data.aqi <= 300){
      FlexImage = LessThan300AQI
    } else if (this.state.data !== false && this.state.data.aqi > 300){
      FlexImage = Over300AQI
    }

    const darkTheme = createMuiTheme({
      palette: {
        type: 'dark',
      },
    });
    let saveDisabled
    if (this.state.data !== false && this.props.locations !== [] && this.props.locations.some(loc => loc.name === this.state.data.city.name)) {
      saveDisabled = true
    }
   
    return(
      <ThemeProvider theme={darkTheme}>
      <div className='nav'>
    
     <Grid 
       container
       direction="row"
       justify="flex-start"
       alignItems="flex-start"
     container spacing={0}>
       <div className='search'>
      <GooglePlacesAutocomplete 
        ref={(search) => this._search = search}
        onSelect={this.handleSubmit}
        inputStyle={{'background-color': '#424242', color: '#FFFFFF','border-radius': '1px'}}
              
                                      placeholder='🔎 Search Anywhere!'
                                      // suggestionsStyles={{container: {width: '50%',height: '100%','border-radius': '1px'}}}
                                    />
                                      </div>
                                      <div className='score'>
                                      <ClimateScore ref={(score)=>this._score = score} map={this._map} onMarkerDragEnd={this.onMarkerDragEnd}
     scores={this.state.allScores}/>
     </div>
      <Grid item xs={8} >
        <div className='location'>
      <Map  ref={(map) => this._map = map}
            google={this.props.google}
            styles={mapStyles}
            disableDefaultUI={true}
            streetViewControl={true}
            zoomControl={true}
            mapTypeControl={true}
            mapTypeControlOptions={{
              position: this.props.google.maps.ControlPosition.TOP_CENTER
            }}
            zoomControlOptions={{
              style: this.props.google.maps.ZoomControlStyle.DEFAUL,
              position: this.props.google.maps.ControlPosition.LEFT_CENTER
            }}
            streetViewControlOptions={{
              position: this.props.google.maps.ControlPosition.LEFT_CENTER
            }}
            onCenterChanged={()=>{
            }}
            initialCenter={this.state.coords}
            center={this.state.coords}
            onClick={this.mapCLicked} 
            zoom={14}
            >
        <div className='filter'>
        <Dropdown
          closeOnChange
          inline
          options={mapOptions}
          onChange={this.labelClicked}
          defaultValue={mapOptions[1].value}
          />
        </div>
        {this.state.showAQI ? 
        <Markers 
                // onMouseover={this.onMarkerHover}
                // onMouseout={this.mouseOut}
                onClick={this.onMarkerClick}
                onMouseover={this.mouseEnterHandler}
                onMouseout={this.mouseLeaveHandler}
        >
        </Markers>
        : null}
        {!this.state.showAQI ? this.renderClimateScores() : null}
        <Marker ref={(marker)=>this._marker = marker}
                // onClick={this.onMarkerClick}
                name={'Current location'} 
                draggable={true}
                hovered={this.state.hovered}
                // onMouseover={this.mouseEnterHandler}
                // onMouseout={this.mouseLeaveHandler}
                // onMouseover={()=>this.markerHover()}
                initialCenter={this.state.coords}
                position={this.state.coords}
                onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}/>
        <InfoWindow
          marker={this.state.activeMarker}
          maxWidth={175}
          onMouseover={()=>this.showInfo()}
          style={{'background-color': '#000000'}}
          visible={this.state.showInfo}>
          <div >
          <h4>{this.state.showInfo? this.state.activeMarker.info.station.name:null} </h4>
          </div>
        </InfoWindow>
      </Map>
      </div>
      </Grid>
      <Grid item xs={4}>
      <div className='hello'>         
      {!this.state.showUserLocations ?  
       <Card variant="outlined" style={{maxHeight: 700, overflow: 'auto'}}>
        <CardContent>
          <div className='next'>
          <IconButton color="white" aria-label="next" disabled>
        <ArrowBackIosIcon />
        </IconButton>
          </div>
          <div className='next2'>
        <IconButton onClick={this.showMyList} color="white" aria-label="next">
          <ArrowForwardIosIcon />
          </IconButton>
          </div>
          <Typography variant="h5" component="h2">
            <br></br>
          {this.state.data !== false ? this.state.data.city.name:null}
          </Typography>
          <Typography  color="textSecondary">
          {this.state.data !== false ? + '' + -hours + ' hrs & ' + -minutes + ' mins ago - ' + this.state.data.time.s:null}
          </Typography>
          <Typography  color="textSecondary" gutterBottom>
          {this.state.data !== false ? 'Air Quality Index: ' + this.state.data.aqi :null}
          </Typography>
          {this.state.data !== false && this.state.data.forecast.daily !== undefined ? 
          <div>
          <Line
            data={o3Data}
            options={{
              responsive: true,
              scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor:'white'
                    }
                }],
                xAxes: [{
                  ticks: {
                      beginAtZero:true,
                      fontColor:'white'
                  }
              }]
            },
              tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: { 
                  label: function(tooltipItem) {
                    return Number(tooltipItem.yLabel) + " µg/m³";}
                },
                displayColors: true,
              },
              title: {
                display:true,
                text:'Ozone (O3) Forecast',
                fontSize:12,
                fontColor: '#FFFFFF'
              },
              legend:{
                display:false,
                position:'top'
              }
            }}
          /> 
          <Line
            data={pm10Data}
            options={{
              responsive: true,
              scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor:'white'
                    }
                }],
                xAxes: [{
                  ticks: {
                      beginAtZero:true,
                      fontColor:'white'
                  }
              }]
            },
              tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: { 
                  label: function(tooltipItem) {
                    return Number(tooltipItem.yLabel) + " µg/m³";}
                },
                displayColors: true,
              },
              title: {
                display:true,
                text:'Small Particles (pm10 Forecast)',
                fontSize:12,
                fontColor: '#FFFFFF'
              },
              legend:{
                display:false,
                position:'top'
              }
            }}
          />
          <Line
            data={pm10Data}
            options={{
              responsive: true,
              scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor:'white'
                    }
                }],
                xAxes: [{
                  ticks: {
                      beginAtZero:true,
                      fontColor:'white'
                  }
              }]
            },
              tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: { 
                  label: function(tooltipItem) {
                    return Number(tooltipItem.yLabel) + " µg/m³";}
                },
                displayColors: true,
              },
              title: {
                display:true,
                text:'Small Particles (pm10 Forecast)',
                fontSize:12,
                fontColor: '#FFFFFF'
              },
              legend:{
                display:false,
                position:'top'
              }
            }}
          />
          </div>
          
          : null }
        </CardContent>
        <CardActions>
        <div className='save'>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={saveDisabled}
          onClick={this.addLocation}
          startIcon={<SaveIcon />}
        >
          Save Location
        </Button>
        </div>
        </CardActions>
        </Card>
      : null}
      {this.state.showUserLocations ?  
       <Card variant="outlined" style={{maxHeight: 700, overflow: 'auto'}}>
        <CardContent>
          <Typography vcolor="textSecondary" gutterBottom>
            Saved Locations
          </Typography>
        <div className='next'>
       
          <IconButton onClick={this.showStats} color="white" aria-label="next" >
        <ArrowBackIosIcon />
        </IconButton>
          </div>
          <div className='next2'>
        <IconButton color="white" aria-label="next" disabled>
          <ArrowForwardIosIcon />
          </IconButton>
          </div>
          <UserLocations clicked={this.goToLocation}/>
          </CardContent>
        </Card>
      : null}
      {/* <UserLocations goToLocation={this.goToLocation}
      /> */}
      {/* <Card  fluid color='blue'>
      <Card.Header><h3>{this.state.data !== false ? this.state.data.city.name:null}</h3></Card.Header>
    <Image src={FlexImage} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{this.state.data !== false ? 'Air Quality Index: ' + this.state.data.aqi :null}</Card.Header>
      <Card.Meta>updated {this.state.data !== false ? + '' + -hours + ' hrs & ' + -minutes + ' mins ago - ' + this.state.data.time.s:null}</Card.Meta>
      <Card.Description>
      {this.state.data !== false && this.state.data.forecast.daily !== undefined ? <Line
          data={config}
          options={{
            responsive: true,
            tooltips: {
              mode: 'index',
              intersect: false,
              callbacks: { 
                label: function(tooltipItem) {
                  return Number(tooltipItem.yLabel) + " µg/m³";}
              },
              displayColors: true,
            },
            title: {
              display:false,
              text:'Local Air Quality pm10 Forecast',
              fontSize:20
            },
            legend:{
              display:false,
              position:'top'
            }
          }}
        /> : null }
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a onClick={this.addLocation}>
        <Icon name='user' 
              />
        Add {this.state.data !== false ? this.state.data.city.name:null} To Favorites
      </a>
    </Card.Content>
    <UserLocations goToLocation={this.goToLocation}/>
    </Card> */}

      </div>
      </Grid>
    </Grid>
    {/* <Grid >
    <Grid.Row> */}
      
     
      {/* <div className='location'> */}
 

   


    
   
      {/* </Grid.Column>
    </Grid.Row>
    </Grid> */}
    </div>
    </ThemeProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    locations: state.locations,
    stats: state.stats
  }
}

const mapDispatchToProps = {
  createLocationSuccess
}

const WrappedContainer = GoogleApiWrapper({
  apiKey: ('AIzaSyDmc1KD6Xr80d3hduc4Q2MObw1uotQuY-8')
})(ClimateMap)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedContainer)