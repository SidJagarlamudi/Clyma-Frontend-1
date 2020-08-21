import React, { PureComponent } from "react";
import { connect } from 'react-redux'
import { Marker } from "google-maps-react";



class MyMarkers extends PureComponent {  

  render() {
    const google = this.props.google
        let iw = 70,
        ih = 94;
    return this.props.stats.map((statObj, key) => {
      if (statObj.aqi !== '-')
      return (
        <Marker
          info={statObj}
          position={{lat: statObj.lat, lng: statObj.lon}}
          // onClick={this.props.onMarkerClick}
          id={statObj.uid}
          onMouseover={this.props.mouseEnterHandler}
          onMouseout={this.props.mouseLeaveHandler}
          {...this.props}
          icon={{
            url: `https://waqi.info/mapicon/${statObj.aqi}.30.png`,
            anchor: new google.maps.Point(iw / 4, ih / 2 - 5),
            size: new google.maps.Size(iw / 2, ih / 2),
            scaledSize: new google.maps.Size(iw / 2, ih / 2)
          }}
        />
      );
    });
  }
}
const mapStateToProps = (state) => {
  return {
    stats: state.stats,
  }
}

export default connect(mapStateToProps, null)(MyMarkers);


