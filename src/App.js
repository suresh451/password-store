import {Component} from 'react'
import {v4} from 'uuid'

import './App.css'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    isShow: false,
  }

  onAddPasswords = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()

    const newPassword = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsiteInput = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  deleteItem = id => {
    const {passwordsList} = this.state
    const newList = passwordsList.filter(eachValue => eachValue.id !== id)
    this.setState({passwordsList: newList})
  }

  render() {
    const {
      website,
      password,
      username,
      passwordsList,
      isShow,
      searchInput,
    } = this.state
    const newList = passwordsList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            className="app-logo"
            alt="app logo"
          />
        </div>
        <div className="first-div">
          <div className="input-elements">
            <h1>Add New Password</h1>
            <div>
              <form className="form-elements" onSubmit={this.onAddPasswords}>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="webiste-img"
                  />
                  <input
                    type="text"
                    placeholder="Enter Website"
                    onChange={this.onChangeWebsiteInput}
                    value={website}
                  />
                </div>

                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    className="webiste-img"
                    alt="username"
                  />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    onChange={this.onChangeUsernameInput}
                    value={username}
                  />
                </div>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    className="webiste-img"
                    alt="password"
                  />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={this.onChangePasswordInput}
                    value={password}
                  />
                </div>
                <button type="submit">Add</button>
              </form>
            </div>
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              className="password-img"
              alt="password manager"
            />
          </div>
        </div>
        <div>
          <div className="password-search">
            <div>
              <h1>Your Passwords</h1>
              <p>{newList.length}</p>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="webiste-img"
                alt="search"
              />
              <input
                type="search"
                placeholder="search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div>
            <input type="checkbox" id="check" onChange={this.showPassword} />
            <label htmlFor="check">Show passwords</label>
          </div>
          <div>
            {newList.length === 0 ? (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no Passwords"
                />
                <p>No Passwords</p>
              </div>
            ) : (
              <ul>
                {newList.map(eachValue => (
                  <li id={eachValue.id} key={eachValue.id}>
                    <p className="initial">{eachValue.initialValue}</p>
                    <div>
                      <p>{eachValue.websiteName}</p>
                      <p>{eachValue.userName}</p>
                      {!isShow && (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                        />
                      )}
                      {isShow && <p>{eachValue.Password}</p>}
                      <div>
                        <button
                          type="button"
                          onClick={() => this.deleteItem(eachValue.id)}
                          data-testid="delete"
                        >
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                            className="webiste-img"
                            alt="delete"
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
