import './index.css'
import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

const BookCard = props => {
  const {
    bookDetails: {
      id = '',
      readStatus = 'Unknown',
      authorName = 'Unknown Author',
      coverPic = '',
      title = 'Unknown Title',
      rating = 'N/A',
    } = {},
  } = props

  return (
    <Link
      to={`/books/${id}`}
      className="book-link"
      aria-label={`Book ${title}`}
    >
      <li className="book-item-container">
        <div className="book-item">
          <img
            src={coverPic}
            alt={title ? `Cover of ${title}` : 'Book Cover'}
            className="cover-pic"
          />
          <div className="book-details">
            <h1 className="book-title">{title}</h1>
            <p className="book-author">{authorName}</p>
            <p className="book-rating">
              Avg Rating
              <BsFillStarFill
                color="#FBBF24"
                size={16}
                className="star-icon"
              />{' '}
              {rating}
            </p>
            <p className={`book-status ${readStatus.toLowerCase()}`}>
              Status: <span className="book-status-color">{readStatus}</span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default BookCard
