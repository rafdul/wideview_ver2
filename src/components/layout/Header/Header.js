import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import Badge from '@material-ui/core/Badge';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './Header.module.scss';


import { connect } from 'react-redux';
import { getAllOrders } from '../../../redux/ordersRedux';


const Component = ({className, productsInCart}) => {

  const amountInCart = JSON.parse(localStorage.getItem('booking'));


  return(
    <div className={clsx(className, styles.root)}>
      <div className={styles.container}>
        <div className={styles.container__logo}>
          <Link to={'/'}>
            <img src="/images/logo.svg" alt="logo" title="logo" className={styles.image}/>
          </Link>
        </div>
        <div className={styles.container__menu}>
          <Navbar bg="light" variant="light" className={styles.list}>
            <Nav className={clsx('mr-auto', styles.list_flex)} >
              <Nav.Link as={Link} to={'/products/seaside'} className={styles.list_item}>Seaside</Nav.Link>
              <Nav.Link as={Link} to={'/products/cities'} className={styles.list_item}>Cities</Nav.Link>
              <Nav.Link as={Link} to={'/products/mountains'} className={styles.list_item}>Mountains</Nav.Link>
              <Nav.Link as={Link} to={'/products/countryside'} className={styles.list_item}>Countryside</Nav.Link>
            </Nav>
          </Navbar>
        </div>
        <div className={styles.container__cart}>
          <Link to={'/cart'} className={styles.link}>
            <Badge color="secondary" badgeContent={amountInCart === null ? null : amountInCart.length}>
              <FontAwesomeIcon icon={faShoppingCart} className={styles.icon}/>
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  productsInCart: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const mapStateToProps = state => ({
  productsInCart: getAllOrders(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
