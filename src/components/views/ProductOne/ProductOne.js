import React from 'react';
import PropTypes from 'prop-types';

// import { LocationPin } from '../../features/LocationPin/LocationPin';
import { PlusMinusSwitcher } from '../../features/PlusMinusSwitcher/PlusMinusSwitcher';
import { DatePicker } from '../../features/DatePicker/DatePicker';
import { Loading } from '../../common/Loading/Loading';
import { Error } from '../../common/Error/Error';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// import GoogleMapReact from 'google-map-react';

import uniqid from 'uniqid';
import clsx from 'clsx';
import styles from './ProductOne.module.scss';

import { connect } from 'react-redux';
import { fetchOnePublished, getOne } from '../../../redux/apartmentsRedux.js';
import { fetchOrdersToCart, getLoadingOrders } from '../../../redux/ordersRedux';


class Component extends React.Component {
  state = {
    order: {
      apartments: {},
    },
    statusProduct: {
      nights: false,
      people: false,
      date: false,
    },
    open: false,
    btnActive: false,
  }

  componentDidMount() {
    const { fetchOneApartment } = this.props;
    fetchOneApartment();
  }

  setNight = (nights) => {
    const {order} = this.state;

    this.setState(
      {order:
        {
          apartments:
          {
            ...order.apartments,
            nights: parseInt(nights),
            totalPrice: this.props.getOne.price * parseInt(nights),
          },
        },
      },
    );
    this.setState({btnActive: true});
    // console.log('order w setNight', order);
  }

  setPeople = (people) => {
    const {order} = this.state;

    this.setState(
      {order:
        {
          apartments:
          {
            ...order.apartments,
            people: people,
          },
        },
      },
    );
    this.setState({btnActive: true});
  }

  setDate = (date) => {
    const {order} = this.state;

    this.setState(
      {order:
        {
          apartments:
          {
            ...order.apartments,
            from: date.toLocaleDateString('en-US'),
          },
        },
      },
    );
  }

  submitForm = (event) => {
    // event.preventDefault();
    const {order, statusProduct} = this.state;
    const {saveReservation, getOne} = this.props;

    order.apartments._id = getOne._id;
    order.apartments.category = getOne.category;
    order.apartments.name = getOne.name;
    order.apartments.city = getOne.city;
    order.apartments.priceFromNight = getOne.price;
    order.apartments.image = getOne.image[0];
    order.apartments.status = 'addToCart';
    order.apartments.dataOrder = new Date().toISOString();
    order.apartments.idOrder = uniqid('order-');

    if(order.apartments.nights < 1) {
      this.setState({statusProduct: {...statusProduct, nights: true}});
    } else if(order.apartments.people < 1) {
      this.setState({statusProduct: {...statusProduct, people: true}});
    } else if(!order.apartments.from) {
      this.setState({statusProduct: {...statusProduct, date: true}});
    } else {
      this.setState({statusProduct: {...statusProduct, nights: false, people: false, date: false}});

      saveReservation(order);
      this.setState({btnActive: false});
      this.setState({open: true});

      console.log('order w ProductOne', order);

      // wykorzystanie localStorage
      const booking = [
        {
          _id: getOne._id,
          category: getOne.category,
          name: getOne.name,
          city: getOne.city,
          priceFromNight: getOne.price,
          image: getOne.image[0],
          status: 'addToCart',
          dataOrder: new Date().toISOString(),
          idOrder: uniqid('order-'),
          nights: order.apartments.nights,
          totalPrice: order.apartments.totalPrice,
          people: order.apartments.people,
          from: order.apartments.from,
        },
      ];
      console.log('booking do localstorage', booking);

      if(localStorage.getItem('booking') !== null) {
        // const storage = localStorage.getItem('booking');
        // console.log('storage', storage);
        const fromStorage = JSON.parse(localStorage.getItem('booking'));
        // console.log('fromStorage', fromStorage);
        fromStorage.push(booking[0]);
        localStorage.setItem('booking', JSON.stringify(fromStorage));
      } else {
        localStorage.setItem('booking', JSON.stringify(booking));
      }
    }
  }

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {className, getOne, loadingOrders } = this.props;
    const { order, statusProduct, open, btnActive } = this.state;
    // console.log('this.state.order w render', order);
    // console.log('getOne:', getOne);

    // fotki "zaślepkowe", gdy brakuje zdjęcia w bazie danych
    const plugImageFirst = '/images/offers/photo_test.jpg';
    const plugImageSecond = '/images/offers/photo_test2.jpg';
    const plugImageThird = '/images/offers/photo_test3.jpg';


    // const location = {
    //   address: getOne.name,
    //   lat: getOne.location === undefined ? 0 : getOne.location.lat,
    //   lng: getOne.location === undefined ? 0 : getOne.location.lng,
    // };

    if(loadingOrders && loadingOrders.active === true) {
      return(
        <Loading />
      );
    }
    else if(loadingOrders && loadingOrders.error === true) {
      return(
        <Error />
      );
    }
    else {
      return(
        <div className={clsx(className, styles.root)}>
          <div className={styles.container}>
            <h3 className={styles.title}>{getOne.name}</h3>
            <h5 className={styles.subtitle}>{getOne.city}</h5>
            <p className={styles.subtitle}>{getOne.description}</p>
            <Grid container>
              <Card className={styles.grid}>
                <section className={styles.big_image}>
                  <CardMedia
                    className={styles.image[0]}
                    component="img"
                    image={getOne.image === undefined ? plugImageFirst : getOne.image[0]}
                    title={`${getOne.name}_1`}
                  />
                </section>
                <section className={styles.big_text}>
                  <span className={styles.marketing_box}>
                    <h3 className={styles.marketing}>Exclusive relax from ${getOne.price}</h3>
                  </span>
                </section>
                <section className={styles.small_image}>
                  <CardMedia
                    className={styles.image}
                    component="img"
                    image={getOne.image === undefined ? plugImageSecond : getOne.image[1]}
                    title={`${getOne.name}_2`}
                  />
                </section>
                <section className={styles.small_text}>
                  <span className={styles.marketing_box}>
                    <h3 className={styles.marketing}>We are waiting for you</h3>
                  </span>
                </section>
                <section className={styles.medium_image}>
                  <CardMedia
                    className={styles.image}
                    component="img"
                    image={getOne.image === undefined ? plugImageThird : getOne.image[2]}
                    title={`${getOne.name}_3`}
                  />
                </section>

              </Card>
            </Grid>

            <Grid container>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} className={styles.cardbox}>
                  <Card >
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="h6" className={styles.text}>
                        Amenities
                      </Typography>
                      <Typography gutterBottom variant="body2" component="p" className={styles.text}>
                        {getOne.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}: {getOne.bedrooms}
                      </Typography>
                      <Typography gutterBottom variant="body2" component="p" className={styles.text}>
                        {getOne.kitchen === 1 ? 'Kitchen' : 'Kitchens'}: {getOne.kitchen}
                      </Typography>
                      <Typography gutterBottom variant="body2" component="p" className={styles.text}>
                        {getOne.balcony === 1 ? 'Balcony' : 'Balconies'}: {getOne.balcony}
                      </Typography>
                      <Typography gutterBottom variant="body2" component="p" className={styles.text}>
                        Swimpool: {getOne.swimpool}
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="h6" className={styles.text}>
                        Location
                      </Typography>
                      <Typography gutterBottom variant="body1" component="p" className={styles.text}>
                        {getOne.city}
                      </Typography>
                      <Paper variant="outlined">
                        {/* {location.address !== undefined
                          ?
                          <div className={styles.map}>
                            <GoogleMapReact
                              // defaultCenter={location}
                              center={location}
                              defaultZoom={15}
                            >
                              <LocationPin
                                lat={location.lat}
                                lng={location.lng}
                                text={location.address}
                              />
                            </GoogleMapReact>
                          </div>
                          :
                          null
                        } */}

                        <div className={styles.map}>
                          <iframe src={getOne.map} title={getOne.name + '-' + getOne} className={styles.map__item}/>
                        </div>

                      </Paper>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper elevation={3} className={styles.cardbox}>
                  <Card >
                    <CardContent className={styles.content}>
                      <Typography gutterBottom variant="h6" component="h6" className={styles.text}>
                        Make a booking!
                      </Typography>
                      <Typography gutterBottom variant="body1" component="p" className={styles.text}>
                        {getOne.name} in {getOne.city}
                      </Typography>
                      <div className={styles.content__flex}>
                        <div className={styles.name + ' ' + styles.date}>
                          <Typography gutterBottom variant="body1" component="p" className={styles.text}>
                            From:
                          </Typography>
                        </div>
                        <div className={styles.choose}>
                          <DatePicker setDate={this.setDate} />
                        </div>
                        {statusProduct.date && !order.apartments.from
                          ? <span className={styles.content__alert + ' ' + styles.content__alert_date}>You have to choose date from</span>
                          : null
                        }
                      </div>
                      <div className={styles.content__flex}>
                        <div className={styles.name}>
                          <Typography gutterBottom variant="body1" component="p" className={styles.text}>
                            Nights:
                          </Typography>
                        </div>
                        <div className={styles.choose}>
                          <PlusMinusSwitcher setAmount={this.setNight} />
                        </div>
                        {statusProduct.nights  && order.apartments.nights === 0
                          ? <span className={styles.content__alert}>You have to choose amount of nights</span>
                          : null
                        }
                      </div>
                      <div className={styles.content__flex}>
                        <div className={styles.name}>
                          <Tooltip title={`max. ${getOne.bedrooms *2 } people`}>
                            <Typography gutterBottom variant="body1" component="p" className={styles.text}>
                              People <FontAwesomeIcon icon={faInfoCircle} className={styles.fontIcon}/> :
                            </Typography>
                          </Tooltip>
                        </div>
                        <div className={styles.choose}>
                          <PlusMinusSwitcher maxValue={`${getOne.bedrooms *2}`} setAmount={this.setPeople} />
                        </div>
                        {statusProduct.people && order.apartments.people === 0
                          ? <span className={styles.content__alert}>You have to choose amount of people</span>
                          : null
                        }
                      </div>
                      <div className={styles.content__flex}>
                        <div className={styles.name}>
                          <Tooltip title='for 1 night, all suite'>
                            <Typography gutterBottom variant="body1" component="p" className={styles.text}>
                              Price <FontAwesomeIcon icon={faInfoCircle} className={styles.fontIcon}/> :
                            </Typography>
                          </Tooltip>
                        </div>
                        <div className={styles.choose}>
                          <Typography gutterBottom variant="body1" component="p" className={styles.text}>
                            ${getOne.price}
                          </Typography>
                        </div>
                      </div>
                      <div className={styles.content__flex}>
                        <div className={styles.name}>
                          <Typography gutterBottom variant="h6" component="p" className={styles.text}>
                            Total price:
                          </Typography>
                        </div>
                        <div className={styles.choose}>
                          <Typography gutterBottom variant="h6" component="p" className={styles.text}>
                            {order.apartments.totalPrice !== undefined ? ('$' + order.apartments.totalPrice) : null}
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                    <div className={styles.btnBook} >
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.submitForm}
                        disabled={!btnActive ? true : false}
                      >
                        Book it!
                      </Button>
                    </div>
                  </Card>
                </Paper>

                {(loadingOrders && loadingOrders.added ) &&
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message="Well done! Finish your booking in the cart!"
                    className={styles.snackbarr__success}
                  />
                }
                {(loadingOrders && loadingOrders.error) &&
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message="Something went wrong"
                    className={styles.snackbarr__error}
                  />
                }

              </Grid>
            </Grid>
          </div>
        </div>
      );
    }
  }
}

Component.propTypes = {
  className: PropTypes.string,
  fetchOneApartment: PropTypes.func,
  getOne: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loadingOrders: PropTypes.object,
  saveReservation: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  getOne: getOne(state),
  loadingOrders: getLoadingOrders(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchOneApartment: () => dispatch(fetchOnePublished(props.match.params.id)),
  saveReservation: reservation => dispatch(fetchOrdersToCart(reservation)),
  // saveReservation: reservation => dispatch(fetchSaveNewOrder(reservation)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as ProductOne,
  Container as ProductOne,
  Component as ProductOneComponent,
};
