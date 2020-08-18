import React, { Component } from "react";
import { connect } from 'react-redux'
import { deleteLocationSuccess } from '../actions/location'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import RoomIcon from '@material-ui/icons/Room';


export class UserLocations extends Component {

  handleDelete = (id) => {
    console.log('i was clicked!')
    const reqObj = {
      method: 'DELETE',
      headers: {
        'Content-Type':  'application/json',
      }
    }
    fetch(`http://localhost:3001/locations/${id}`, reqObj)
    .then(resp => resp.json())
    .then(data => {
      this.props.deleteLocationSuccess(id)
    })
  }

  render(){
    return this.props.locations.map((location)=>{
      return <div>
        <Card variant='outlined'>
          <CardContent>
        <span style={{'font-size': '18px'}}>{location.name}</span>
        <IconButton onClick={()=>this.handleDelete(location.id)} color="white" aria-label="delete">
        <DeleteIcon />
          </IconButton>
          <IconButton onClick={()=>this.props.clicked(location)} color="white" aria-label="delete">
        <RoomIcon />
          </IconButton>
        </CardContent>
        </Card>
      </div>
    })
  }

}

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
  }
}

const mapDispatchToProps = {
  deleteLocationSuccess
}
  
export default connect(mapStateToProps, mapDispatchToProps)(UserLocations);