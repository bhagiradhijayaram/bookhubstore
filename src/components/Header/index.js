import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineMenuFold} from 'react-icons/ai'

import './index.css'
import {useState} from 'react'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const [toggleMenu, setToggleMenu] = useState(false)

  const onToggleMenu = () => {
    setToggleMenu(prevState => !prevState)
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dasvdkncm/image/upload/v1735264376/Group_7731_yvnb6c.png"
              alt="website logo"
            />
          </Link>

          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onToggleMenu}
          >
            <AiOutlineMenuFold size={30} />
          </button>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dasvdkncm/image/upload/v1735264376/Group_7731_yvnb6c.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/bookshelves" className="nav-link">
                BookShelves
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      {toggleMenu && (
        <div className="nav-menu-mobile">
          <ul className="nav-menu-list-mobile">
            <li className="nav-menu-item-mobile">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item-mobile">
              <Link to="/bookshelves" className="nav-link">
                BookShelves
              </Link>
            </li>
            <li className="nav-menu-item-mobile">
              <button
                type="button"
                className="logout-mobile-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default withRouter(Header)
