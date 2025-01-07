import {Component} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {
    booksList: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBooksData()
  }

  getBooksData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    try {
      const jwtToken = Cookies.get('jwt_token')
      const {match} = this.props
      const {params} = match
      const {id} = params
      const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`

      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const response = await fetch(apiUrl, options)
      const data = await response.json()

      if (response.ok) {
        const updatedData = {
          id: data.book_details.id,
          aboutAuthor: data.book_details.about_author,
          aboutBook: data.book_details.about_book,
          authorName: data.book_details.author_name,
          coverPic: data.book_details.cover_pic,
          readStatus: data.book_details.read_status,
          title: data.book_details.title,
          rating: data.book_details.rating,
        }
        this.setState({
          booksList: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      console.error('Error in getBooksData:', error)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="books-details-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {booksList} = this.state
    const {
      id,
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      readStatus,
      title,
      rating,
    } = booksList
    return (
      <div className="container">
        <div className="book_details_container">
          <div className="book-container">
            <img src={coverPic} className="book_details_cover_pic" />
            <div className="book-data-height">
              <h1>{title}</h1>
              <p>{authorName}</p>
              <p className="book-rating-details">
                Avg Rating{' '}
                <BsFillStarFill
                  color="#FBBF24"
                  size={16}
                  className="star-icon"
                />{' '}
                {rating}
              </p>
              <p>
                Status: <span className="book-status-color">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr />
          <div className="book-data">
            <p className="about_author">About Author</p>
            <p className="about_author_content">{aboutAuthor}</p>
            <p className="about_book">About Book</p>
            <p className="about_book_content">{aboutBook}</p>
          </div>
        </div>
      </div>
    )
  }

  renderBooksDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
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
        <section className="book_details_section">
          <div>{this.renderBooksDetails()}</div>
        </section>
        <div className="footer">
          <Footer />
        </div>
      </>
    )
  }
}

export default BookDetails
