import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <footer className="footer-section">
    <div className="d-flex gap-3">
      <FaGoogle aria-label="Google" />
      <FaTwitter aria-label="Twitter" />
      <FaInstagram aria-label="Instagram" />
      <FaYoutube aria-label="YouTube" />
    </div>
    <p className="contact-us">Contact us</p>
  </footer>
)

export default Footer
