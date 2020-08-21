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
                this.renderLoadingGIF()
              ):( 
                null
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
