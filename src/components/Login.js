import React from 'react';
import { loginSuccess } from '../actions/auth'
import { connect }  from 'react-redux'
import LoginBG from './LoginBG'

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      pw: '',
      email: '',
      showSignUp: false
    }
  }

  handleInputChange = (e) => { this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const reqObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(this.state)
    }

    fetch('https://myclimate.herokuapp.com/auth', reqObj)
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        localStorage.setItem('token', data.token)
        this.props.loginSuccess(data)
        this.props.history.push('/home')
      }
    })
  }

  showSignUp = () => {
    this.setState({
      showSignUp: !this.state.showSignUp
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    console.log('working!')
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    return (
      <div>
      <div className="login-comp">
        {this.state.showSignUp ? 
      <div class="signup-container">
    <section>
      <form onSubmit={this.handleFormSubmit} class='signup-form'>
        <label>
          <input onChange={this.handleChange} name="email" id="email" type="email" required />
          <div class="label-text">Email</div>
        </label>
        <label>
          <input onChange={this.handleChange} type="username" name="username" id="username" required />
          <div class="label-text">Username</div>
        </label>
        <label>
          <input onChange={this.handleChange} type="pw" name="pw" id="pw" required />
          <div class="label-text">Password</div>
        </label>
        <br></br>
        <button class='signup-btn' type="submit" value="Submit">Submit</button>
        <br></br>
        <a href style={{color: 'white'}} onClick={this.showSignUp}>or Log-In</a>
      </form>
    </section>
  </div>
        : null}
        {!this.state.showSignUp ? 
      <div className='login-form'>
          <span style={{color: 'white', fontSize: 'large'}}>Please Sign-in</span>
        <form class="form" onSubmit={this.handleSubmit.bind(this)}>
        <span><input name={'username'} type="text" placeholder="Username" onChange={this.handleInputChange} value={this.state.username}/>
			<input name={'password'} type="password" placeholder="Password" onChange={this.handleInputChange} value={this.state.password}/></span>
			<button type="submit" id="login-button">Login</button>
      <br></br>
      <br></br>
      <a href style={{color: 'white'}} onClick={this.showSignUp}>or Sign-Up</a>
      </form>
      </div>
        : null
      }
        </div>
        <LoginBG/>
      </div>
    );
  }
}
document.body.style = 'background: #424242;';

const mapDispatchToProps = {
  loginSuccess
}

export default connect(null, mapDispatchToProps)(Login)