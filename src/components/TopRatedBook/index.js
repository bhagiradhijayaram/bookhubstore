import './index.css'
import {Link} from 'react-router-dom'

const TopRatedBook = props => {
  const {bookDetails} = props
  const {id, authorName, title, coverPic} = bookDetails
  return (
    <Link to={`/books/${id}`} className="book-link">
      <div className="top-rated-book-container">
        <img
          src={coverPic}
          alt={`${title} cover`}
          className="top-rated-book-image"
        />
        <div className="book-title-author-container">
          <h1 className="top-rated-book-title">{title}</h1>
          <p className="top-rated-book-author-name">{authorName}</p>
        </div>
      </div>
    </Link>
  )
}

export default TopRatedBook
