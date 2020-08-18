import React from "react";
import FadeIn from "react-fade-in";
import "bootstrap/dist/css/bootstrap.css";
import loadingGIF from './loadingGIF.gif'

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: undefined
    };
  }

  componentDidMount() {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(json => {
          this.setState({ loading: true });
          setTimeout(() => {
            this.setState({ done: true });
          }, 1000);
        });
    }, 1500);
  }

  // componentDidUpdate(){
  //   unmountComponentAtNode(document.getElementById('loader'))
  // }

  renderLoadingGIF = () => {
    return <div>
      <img src={loadingGIF} alt='-'></img>
    </div>
  }

  render() {
    return (
      <div id='loader'>
        {!this.state.done ? (
          <FadeIn>
            <div className="d-flex justify-content-center align-items-center">
              {!this.state.loading ? (
                // <Lottie options={defaultOptions} height={700} width={9000} />
              // ) : (
                this.renderLoadingGIF()
              ):( 
                null
              //   <Lottie options={defaultOptions2} height={700} width={900} />
              )}
            </div>
          </FadeIn>
        ) : (
          null
        )}
      </div>
    );
  }
}
