import React from "react";
import { Fade } from "react-reveal";
import Clymanew from '../images/Clymanew.png'

class LandingPage extends React.Component {


  render(){
    return <div>
      <Fade left duration={2000} distance="40px">
        <div className='lp-logo'>
          <img style={{width: '650px'}} src={Clymanew} alt='logo'></img>
        </div>
      </Fade>
    <img src='https://www.tmrow.com/static/5c33e6e4f32b13a7a70c2a4612f31647/097fa/climatestage-background1.jpg' alt='bg'></img>
    </div>
  }
}


export default LandingPage