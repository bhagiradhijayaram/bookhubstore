import './index.css'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import {Component} from 'react'
import Header from '../Header'
import BookCard from '../BookCard'
import SideBar from '../SideBar'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  emptyResult: 'EMPTYRESULT',
}

class Bookshelves extends Component {
  state = {
    allBooksList: [],
    apiStatus: apiStatusConstants.initial,
    searchValue: '',
    readStatus: 'ALL',
    label: 'All Books',
    activeId: false,
  }

  componentDidMount() {
    this.getBooksData()
  }

  getBooksData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchValue, readStatus} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${readStatus}&search=${searchValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        if (data.books.length > 0) {
          const updatedData = data.books.map(eachBook => ({
            id: eachBook.id,
            readStatus: eachBook.read_status,
            authorName: eachBook.author_name,
            coverPic: eachBook.cover_pic,
            title: eachBook.title,
            rating: eachBook.rating,
          }))
          this.setState({
            allBooksList: updatedData,
            apiStatus: apiStatusConstants.success,
          })
        } else {
          this.setState({apiStatus: apiStatusConstants.emptyResult})
        }
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  handleActiveShelve = (value, label) => {
    this.setState({readStatus: value, label}, this.getBooksData)
  }

  onSearchKeyDown = event => {
    if (event.key === 'Enter') {
      this.getBooksData()
    }
  }

  handleSearchChange = event => {
    this.setState({searchValue: event.target.value, activeId: true})
  }

  // activeIdClassName = activeId ? 'active' : ''

  renderLoadingView = () => (
    <div className="books-details-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dasvdkncm/image/upload/v1735378473/Group_7522_z4yhnu.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.getBooksData}
      >
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {allBooksList} = this.state
    return (
      <ul className="bookshelves-books-container">
        {allBooksList.map(eachBook => (
          <BookCard bookDetails={eachBook} key={eachBook.id} />
        ))}
      </ul>
    )
  }

  renderNoVideosView = () => {
    const {searchValue} = this.state
    return (
      <div className="failure-view-container">
        <img
          src="https://res.cloudinary.com/dasvdkncm/image/upload/v1735985849/Asset_1_1_ybk0qj.png"
          alt="no videos"
          className="no-videos-image"
        />
        <p className="no-videos-para">
          Your search for {searchValue} did not find any matches.
        </p>
      </div>
    )
  }

  renderBooksDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.emptyResult:
        return this.renderNoVideosView()
      default:
        return null
    }
  }

  render() {
    const {searchValue, label} = this.state
    return (
      <>
        <Header />
        <section className="bookshelves-section">
          <div className="bookshelves-container">
            <aside className="side-bar">
              <h1 className="bookshelves">Bookshelves</h1>
              <SideBar handleActiveShelve={this.handleActiveShelve} />
            </aside>
            <main className="main-content">
              <div className="header-bar">
                <h1 className="books-category-title">{label} Books</h1>
                <div className="bookshelves-mobile-view">
                  <SideBar handleActiveShelve={this.handleActiveShelve} />
                </div>
                <div className="search-bar">
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search"
                    aria-label="Search books input"
                    value={searchValue}
                    onChange={this.handleSearchChange}
                    onKeyDown={this.onSearchKeyDown}
                  />
                  <button
                    type="button"
                    className="search-button"
                    aria-label="Search"
                    onClick={this.getBooksData}
                    data-testid="searchButton"
                  >
                    <BsSearch size={20} />
                  </button>
                </div>
              </div>
              {this.renderBooksDetails()}
            </main>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

export default Bookshelves
