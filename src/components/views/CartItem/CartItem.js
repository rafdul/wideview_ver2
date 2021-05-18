import React from 'react';
import PropTypes from 'prop-types';
import { PlusMinusSwitcher } from '../../features/PlusMinusSwitcher/PlusMinusSwitcher';

import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
// import { } from '../../../redux/apartmentsRedux';
import { fetchOrdersEdit, fetchOrdersDeleteOne } from '../../../redux/ordersRedux';

import styles from './CartItem.module.scss';

class Component extends React.Component {

  state = {
    apartments: {
      category: this.props.category,
      name: this.props.name,
      city: this.props.city,
      nights: this.props.nights,
      from: this.props.from,
      people: this.props.people,
      priceFromNight: this.props.priceFromNight,
      totalPrice: this.props.totalPrice,
      image: this.props.image,
      message: '',
      dataOrder: this.props.dataOrder,
      idOrder: this.props.idOrder,
      status: this.props.status,
    },
  }

  setNight = (nights) => {
    const {apartments} = this.state;
    const priceForNight = apartments.priceFromNight;
    // console.log('apartments w setnight1:', apartments);
    // console.log('nights in order:', nights);

    this.setState(
      {
        apartments: {
          ...apartments,
          nights: parseInt(nights),
          totalPrice: priceForNight * parseInt(nights),
          status: 'edited',
        },
      },
    );

    const {editInCart} = this.props;
    editInCart(
      {
        apartments: {
          ...apartments,
          nights: parseInt(nights),
          totalPrice: priceForNight * parseInt(nights),
          status: 'edited',
        },

      },
    );

    //z wykorzystanie localStorage
    const ordersFromStorage = JSON.parse(localStorage.getItem('booking'));
    const findedOrderFromStorage = ordersFromStorage.find(el => el.idOrder === this.props.idOrder);
    const findedOrderIndex = ordersFromStorage.indexOf(findedOrderFromStorage);

    findedOrderFromStorage.nights = parseInt(nights);
    findedOrderFromStorage.totalPrice = findedOrderFromStorage.priceFromNight * parseInt(nights);
    findedOrderFromStorage.status = 'edited';
    ordersFromStorage.splice(findedOrderIndex, 1, findedOrderFromStorage);

    localStorage.setItem('booking', JSON.stringify(ordersFromStorage));
  }

  handleChange = (event) => {
    const {apartments} = this.state;

    this.setState(
      {
        apartments: {
          ...apartments,
          message: event.target.value,
          status: 'edited',
        },
      },
    );

    const {editInCart} = this.props;
    editInCart(
      {
        apartments: {
          ...apartments,
          message: event.target.value,
          status: 'edited',
        },
      },
    );

    const ordersFromStorage = JSON.parse(localStorage.getItem('booking'));
    const findedOrderFromStorage = ordersFromStorage.find(el => el.idOrder === this.props.idOrder);
    const findedOrderIndex = ordersFromStorage.indexOf(findedOrderFromStorage);

    findedOrderFromStorage.message = event.target.value;
    ordersFromStorage.splice(findedOrderIndex, 1, findedOrderFromStorage);

    localStorage.setItem('booking', JSON.stringify(ordersFromStorage));

  };

  deleteFromCart = (event) => {
    // event.preventDefault();

    const {apartments} = this.state;
    const {deleteReservation} = this.props;
    deleteReservation(apartments);

    //z wykorzystaniem localStorage
    const ordersFromStorage = JSON.parse(localStorage.getItem('booking'));
    const findedOrderIndex = ordersFromStorage.findIndex(el => el.idOrder === this.props.idOrder);

    ordersFromStorage.splice(findedOrderIndex, 1);

    localStorage.setItem('booking', JSON.stringify(ordersFromStorage));
  }

  render() {
    const { nights, totalPrice, people, from, name, city, image } = this.props;
    // const {apartments} = this.state;
    // console.log('this.state.apartments:', this.state.apartments);
    // console.log('totalPrice', totalPrice);

    const ordersFromStorage = JSON.parse(localStorage.getItem('booking'));
    // console.log('ordersFromStorage:', ordersFromStorage);
    const findedOrderFromStorage = ordersFromStorage.find(el => el.idOrder === this.props.idOrder);

    return(
      <Paper elevation={3} className={styles.root}>
        <Card >
          <div className={styles.cart}>
            <div className={styles.cart__imagebox}>
              <img src={image} alt={name}/>
            </div>
            <div className={styles.cart__namebox}>
              <div className={styles.cart__decoration}>{name} in {city}</div>
              <div>(booking for {people} people from {from})</div>
            </div>
            <div className={styles.cart__nightsbox} >
              <div>Nights:</div>
              <PlusMinusSwitcher setAmount={this.setNight} defaultVal={nights} />
            </div>
            <div className={styles.cart__pricebox}>
              <div>Price:</div>
              <div className={styles.cart__decoration}>${this.state.apartments.totalPrice === undefined ? totalPrice : this.state.apartments.totalPrice }</div>
            </div>
            <div className={styles.cart__deletebox} >
              <IconButton aria-label="delete" onClick={this.deleteFromCart}>
                <FontAwesomeIcon icon={faTrashAlt} className={styles.deleteIcon}/>
              </IconButton>
            </div>
          </div>
          <div className={styles.infobox}>
            <Accordion>
              <AccordionSummary
                expandIcon={<FontAwesomeIcon icon={faAngleDown} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={styles.accordion_summary}>Write your message to us</Typography>
              </AccordionSummary>
              <AccordionDetails className={styles.accordion_details}>
                <TextField
                  className={styles.textarea}
                  id="outlined-multiline-static"
                  label="Important for reservation (max. 60 characters)"
                  multiline
                  rows={2}
                  variant="outlined"
                  onChange={this.handleChange}
                  inputProps={{ maxLength: 60 }}
                  value={findedOrderFromStorage.message}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        </Card>
      </Paper>
    );
  }
}

Component.propTypes = {
  status: PropTypes.string,
  editInCart: PropTypes.func,
  deleteReservation: PropTypes.func,
  dataOrder: PropTypes.string,
  idOrder: PropTypes.string,

  nights: PropTypes.number,
  totalPrice: PropTypes.number,
  people: PropTypes.number,
  from: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  city: PropTypes.string,
  priceFromNight: PropTypes.number,
  image: PropTypes.string,
  message: PropTypes.string,
};

const mapStateToProps = (state, key) => ({

});

const mapDispatchToProps = dispatch => ({
  deleteReservation: reservation => dispatch(fetchOrdersDeleteOne(reservation)),
  editInCart: reservation => dispatch(fetchOrdersEdit(reservation)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as CartItem,
  Container as CartItem,
  Component as CartItemComponent,
};
