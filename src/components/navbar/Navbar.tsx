import './style.css'
import { Link } from 'react-scroll';

export const Navbar = () => {

  return (
    <div className="navbar">
        <ul className="navbar-items">
            <li className="navbar-item">
                <Link to="about-us" smooth={true} duration={500}>О нас</Link>
            </li>
            <li className="navbar-item">
                <Link to="how-it-works" smooth={true} duration={500}>Как это работает</Link>
            </li>
            <li className="navbar-item">
                <Link to="reviews" smooth={true} duration={500}>Отзывы</Link>
            </li>
            <li className="navbar-item">
                <Link to="contacts" smooth={true} duration={500}>Контакты</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar;
