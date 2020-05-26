import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const Navbar = ({ title, icon }) => {
  return (
    <div className='navbar bg-primary'>
      <Link to='/'>
        <h1>
          <i className={icon} /> {title}
        </h1>
      </Link>
      <ul>
        <li>
          <Link to='/'>
            <strong>Home</strong>
          </Link>
        </li>
        <li>
          <Link to='/about'>
            <strong>About</strong>
          </Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'ContactKeeper',
  icon: 'fas fa-address-book',
};

export default Navbar;
