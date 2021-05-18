import React from 'react';
import PropTypes from 'prop-types';
import { CartItem } from '../../views/CartItem/CartItem';
import { FormReservation } from '../../features/FormReservation/FormReservation';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

import clsx from 'clsx';

import { connect } from 'react-redux';
// import { } from '../../../redux/apartmentsRedux';
import { getAllOrders, getLoadingOrders  } from '../../../redux/ordersRedux';

import styles from './Cart.module.scss';

class Component extends React.Component {

  state = {
    order: this.props.ordersFromCart,
    open: false,
  }

  formOpen = (event) =>{
    event.preventDefault();
    this.setState({open: true});
  }

  render() {
    const { className, loadingOrders } = this.props;
    const { open } = this.state;
    // console.log('formularz w Cart', open);
    // console.log('ordersFromCart:', ordersFromCart);

    const cartContent = JSON.parse(localStorage.getItem('booking'));
    // console.log('cartContent:', cartContent);

    return(
      <div className={clsx(className, styles.root)}>
        <div className={styles.container}>

          {!loadingOrders.done
            ?
            <h2 className={
              cartContent === null
                ? styles.title__empty
                : (cartContent.length < 1)
                  ? styles.title__empty
                  : styles.title
            }>
              {(cartContent === null)
                ? 'Your cart is empty'
                : (cartContent.length < 1)
                  ? 'Your cart is empty'
                  : 'Finish your reservation'
              }
            </h2>
            :
            <div className={styles.container__success}>
              <FontAwesomeIcon icon={faCheckCircle} className={styles.iconSuccess} />
              <h2 className={styles.titleSuccess}>Thanks for your booking!</h2>
            </div>
          }

          <Grid item xs={12}>

            {/* wersja bez localStorage*/}
            {/* {ordersFromCart.map(item => (
              <CartItem key={item.apartments._id} {...item} >
                {console.log('apartment', item)}
              </CartItem>
            ))} */}

            {/* wersja z localStorage*/}
            {cartContent === null ? null : cartContent.map(item => (
              <CartItem key={item._id} {...item} >
                {console.log('item w cartContent', item)}
              </CartItem>
            ))}


            {cartContent === null ? null : cartContent.length > 0
              ?
              (<Paper elevation={3} >
                <Card>
                  {open
                    ?
                    (
                      <FormReservation bookedApartment={cartContent}/>
                    )
                    :
                    (
                      <div className={styles.cart + ' ' + styles.total_price}>
                        <div className={styles.text}>Total price:</div>
                        <div className={styles.text}>
                          ${cartContent.length > 0
                            ? cartContent.map(item => item.totalPrice).reduce((prev, curr) => prev + curr)
                            : 0
                          }
                        </div>
                        <div className={styles.btnBook}>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={event => this.formOpen(event)}
                            className={styles.btn_custom}
                          >
                            Book it!
                          </Button>

                        </div>
                      </div>
                    )
                  }
                </Card>
              </Paper>)
              :
              null
            }
          </Grid>
        </div>

      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  loadingOrders: PropTypes.object,
  ordersFromCart: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const mapStateToProps = state => ({
  ordersFromCart: getAllOrders(state),
  loadingOrders: getLoadingOrders(state),
});

const mapDispatchToProps = dispatch => ({

});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Cart,
  Container as Cart,
  Component as CartComponent,
};
