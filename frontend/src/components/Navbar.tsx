import { Link } from 'react-router-dom';
import './style.css';

export const Navbar = () => {
  return (
    <ul>
      <li>
        <Link to='/todo'>Today's to do list</Link>
      </li>
      <li>
        <Link to='/quiita'>what i learned - connect to qiita</Link>
      </li>
      <li>
        <Link to='/inspiration'>Inspirational quotes</Link>
      </li>
    </ul>
  );
};
