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
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class NewsFeed extends React.Component {

  state = {
    newsArticles: []
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
      fetch('https://myclimate.herokuapp.com/current_user', reqObj)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.props.currentUser(data)
      })
      fetch('https://newsapi.org/v2/everything?q=climate%20change&apiKey=cdcfd508f0a3409cb71b20f0d5bba38e')  
      .then(resp => resp.json())
      .then(news => {
        console.log(news.articles)
        this.setState({
          newsArticles: news.articles
        })
      })
    }
  }

  renderFirst3rd = () => {
    const length = this.state.newsArticles.length
    const one3rd = length / 3
    const roundedUp = Math.ceil(one3rd)
    const first3rd = this.state.newsArticles.slice(0, roundedUp)
    console.log(first3rd)
    return first3rd.map((article)=>{
      return <NewsCard article={article}/>
    })
  }

  renderSecond3rd = () => {
    const length = this.state.newsArticles.length
    const one3rd = length / 3
    const roundedUp = Math.ceil(one3rd)
    const second3rd = this.state.newsArticles.slice(roundedUp, roundedUp * 2)
    return second3rd.map((article)=>{
      return <NewsCard article={article}/>
    })
  }

  renderThird3rd = () => {
    const length = this.state.newsArticles.length
    const one3rd = length / 3
    const roundedUp = Math.ceil(one3rd)
    const third3rd = this.state.newsArticles.slice(roundedUp * 2, roundedUp * 3)
    return third3rd.map((article)=>{
      return <NewsCard article={article} />
    })
  }

  handleSelect = (e) => {
    if (e.target.value == 1){
      const ascendingArr = this.state.newsArticles.sort((a, b) => {
        let firstDate = new Date(a.publishedAt)
        let secondDate = new Date(b.publishedAt)
        return firstDate - secondDate
      })
      this.setState({
        newsArticles: ascendingArr
      })
    } else {
      const decArr = this.state.newsArticles.sort((a, b) => {
        let firstDate = new Date(a.publishedAt)
        let secondDate = new Date(b.publishedAt)
        return secondDate - firstDate
      })
      this.setState({
        newsArticles: decArr
      })
    }
  }

  render(){ 
      return (
        <div style={{backgroundColor: '#424242'}}>
        <FormControl>
        <InputLabel style={{color:'white'}} htmlFor="grouped-native-select">Filter By:</InputLabel>
        <Select style={{color:'white'}} native defaultValue="" id="grouped-native-select" onChange={this.handleSelect}>
          <option aria-label="None" value="" />
          <optgroup label="Date Published" className='maybe'>
            <option value={1}>↑ Ascending (Oldest to Newest)</option>
            <option value={2}>↓ Descending (Newest to Oldest)</option>
          </optgroup>
        </Select>
      </FormControl>
      <p>&nbsp;</p>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={0}
            >
          <Grid item xs>
            {this.renderFirst3rd()}
            </Grid>
            <Grid item xs>
            {this.renderSecond3rd()}
            </Grid>
            <Grid item xs>
            {this.renderThird3rd()}
            </Grid>


          </Grid>
        </div>)
  };
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    current_user: state.currentUser,
  }
}

const mapDispatchToProps = {
  currentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);


