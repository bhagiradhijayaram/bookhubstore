import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          Password*
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          Username*
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    return (
      <section className="login-section">
        <div className="row">
          <div className="login-website-logo-desktop-img">.</div>
          <div className="right-container">
            <form className="form-container" onSubmit={this.submitForm}>
              <img
                src="https://res.cloudinary.com/dasvdkncm/image/upload/v1735221809/Rectangle_1467_e4wmmh.png"
                className="logo-mobile"
                alt="website login"
              />
              <img
                src="https://res.cloudinary.com/dasvdkncm/image/upload/v1735264376/Group_7731_yvnb6c.png"
                className=""
                alt="login website logo"
              />
              <div className="input-container">
                {this.renderUsernameField()}
              </div>
              <div className="input-container">
                {this.renderPasswordField()}
              </div>
              {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Login

// import {Component} from 'react'
// import {Redirect} from 'react-router-dom'
// import Cookies from 'js-cookie'
// import './index.css'

// class Login extends Component {
//   state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

//   onChangeUsername = event => {
//     this.setState({username: event.target.value})
//   }

//   onChangePassword = event => {
//     this.setState({password: event.target.value})
//   }

//   loginSuccess = jwtToken => {
//     Cookies.set('jwt_token', jwtToken, {expires: 30})
//     const {history} = this.props
//     history.replace('/')
//   }

//   loginFailure = errorMsg => {
//     this.setState({showErrorMsg: true, errorMsg})
//   }

//   onSubmitForm = async event => {
//     event.preventDefault()
//     const {username, password} = this.state
//     if (username === 'puneet' && password === 'puneet@2021') {
//       const userDetails = {username: 'rahul', password: 'rahul@2021'}
//       const options = {
//         method: 'POST',
//         body: JSON.stringify(userDetails),
//       }
//       const loginUrl = 'https://apis.ccbp.in/login'
//       const response = await fetch(loginUrl, options)
//       const data = await response.json()
//       if (response.ok) {
//         this.loginSuccess(data.jwt_token)
//       } else {
//         this.loginFailure(data.error_msg)
//       }
//     }
//   }

//   renderUsernameContainer = () => {
//     const {username} = this.state
//     return (
//       <div className="inputs-container">
//         <label htmlFor="username" className="label">
//           Username*
//         </label>
//         <br />
//         <input
//           type="text"
//           id="username"
//           value={username}
//           className="input-element"
//           placeholder="Ex-Puneet"
//           onChange={this.onChangeUsername}
//         />
//       </div>
//     )
//   }

//   renderPasswordContainer = () => {
//     const {password} = this.state
//     return (
//       <div className="inputs-container">
//         <label htmlFor="password" className="label">
//           Password*
//         </label>
//         <br />
//         <input
//           type="password"
//           id="password"
//           value={password}
//           className="input-element"
//           placeholder="Ex-puneet@2021"
//           onChange={this.onChangePassword}
//         />
//       </div>
//     )
//   }

//   render() {
//     const {showErrorMsg, errorMsg} = this.state

//     const jwtToken = Cookies.get('jwt_token')
//     if (jwtToken !== undefined) {
//       return <Redirect to="/" />
//     }
//     return (
//       <div className="login-responsive-container">
//         <div className="login-page-left-side-section">
//           <img
//             src="https://res.cloudinary.com/dovk61e0h/image/upload/v1662988550/Bookhub/Rectangle_1467_wzhge6_ykftzx.png"
//             className="login-page-image"
//             alt="website login"
//           />
//         </div>
//         <div className="login-page-right-side-section">
//           <div className="login-card">
//             <img
//               src="https://res.cloudinary.com/dovk61e0h/image/upload/v1662988538/Bookhub/bookhub_logo_hjkrwl.png"
//               className="login-website-logo"
//               alt="login website logo"
//             />
//             <form onSubmit={this.onSubmitForm} className="form-container">
//               {this.renderUsernameContainer()}
//               {this.renderPasswordContainer()}
//               {showErrorMsg ? (
//                 <p className="error-message">{errorMsg}</p>
//               ) : null}
//               <button type="submit" className="submit-button">
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
// export default Login
