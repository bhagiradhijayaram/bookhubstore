import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'
import Header from '../Header'
import TopRatedBook from '../TopRatedBook'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    topRatedBooks: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBooksData()
  }

  getBooksData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      this.setState({
        topRatedBooks: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="books-details-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {topRatedBooks} = this.state
    console.log(topRatedBooks)

    if (!Array.isArray(topRatedBooks)) {
      console.error('topRatedBooks must be an array:', topRatedBooks)
      return <p>No books available.</p>
    }

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {topRatedBooks.map(eachBook => (
            <TopRatedBook bookDetails={eachBook} key={eachBook.id} />
          ))}
        </Slider>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dasvdkncm/image/upload/v1735378473/Group_7522_z4yhnu.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something went wrong, Please try again.</p>
      <button type="button" className="try-again-button">
        Try Again
      </button>
    </div>
  )

  renderBooksDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="main-container">
            <div className="favorite-books-container">
              <h1 className="favorite-books-heading">
                Find Your Next Favorite Books?
              </h1>
              <p className="favorite-books-paragraph">
                You are in the right place. Tell us what titles or genres you
                have enjoyed in the past, and we will give you surprisingly
                insightful recommendations.
              </p>
              <Link to="/bookshelves" className="book-link">
                <button className="find-books-button desktop" type="button">
                  Find Books
                </button>
              </Link>
            </div>
            <section className="top-rated-books-section">
              <div className="top-rated-books-header">
                <h2 className="top-rated-heading">Top Rated Books</h2>
                <Link to="/bookshelves" className="book-link">
                  <button className="find-books-button mobile" type="button">
                    Find Books
                  </button>
                </Link>
              </div>
              {this.renderBooksDetails()}
            </section>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
