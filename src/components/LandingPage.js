import React from "react";
import { Fade } from "react-reveal";
import Clymanew from '../images/Clymanew.png'
import Particles from 'react-particles-js';


class LandingPage extends React.Component {


  render(){
    return <div>
      <Fade left duration={2000} distance="40px">
        <div className='lp-logo'>
          <img style={{width: '650px'}} src={Clymanew} alt='logo'></img>
        </div>
      </Fade>
      <div class='part-cntr'>
      <Particles
      style={{width: '100%', height: '100%'}}
    canvasClassName={'particles'}
    params={{
	    "particles": {
	        "number": {
	            "value": 60,
	            "density": {
	                "enable": true,
	                "value_area": 1500
	            }
	        },
	        "line_linked": {
	            "enable": true,
	            "opacity": 0.1
	        },
	        "move": {
	            "direction": "right",
	            "speed": 0.10
	        },
	        "size": {
	            "value": 1
	        },
	        "opacity": {
	            "anim": {
	                "enable": true,
	                "speed": 1,
	                "opacity_min": 0.05
	            }
	        }
	    },
	    "interactivity": {
	        "events": {
            "onhover": {
              "enable": true,
              "mode": "connect"
          },
	            "onclick": {
	                "enable": true,
	                "mode": "push"
	            }
	        },
	        "modes": {
	            "push": {
	                "particles_nb": 1
              },
              "connect": {
                'opacity': 5,
            }
          }
	    },
	    "retina_detect": true
	}} /></div>
    <img src='https://www.tmrow.com/static/5c33e6e4f32b13a7a70c2a4612f31647/097fa/climatestage-background1.jpg' alt='bg'></img>
    </div>
  }
}


export default LandingPage