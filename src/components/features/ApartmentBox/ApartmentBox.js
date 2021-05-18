import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// import clsx from 'clsx';
import styles from './ApartmentBox.module.scss';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';



const Component = ({ image, name, city, price, link }) => {


  return(
    <div className={styles.cards__item}>
      <Card className={styles.cardbox}>
        <CardActionArea>
          <Link to={link} className={styles.link}>
            <div className={styles.imageContainer}>
              <CardMedia
                className={styles.image}
                component="img"
                image={image[0]}
                title={name}
              />
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h5" className={styles.text}>
                {name} in {city}
              </Typography>
              <Typography gutterBottom variant="body1" component="p" className={styles.text}>
                Price from ${price} by night
              </Typography>
            </CardContent>
            <Typography component="p" className={styles.more}>
              Show more
            </Typography>
          </Link>
        </CardActionArea>
      </Card>
    </div>
  );
};

Component.propTypes = {
  name: PropTypes.string,
  image: PropTypes.array,
  city: PropTypes.string,
  price: PropTypes.number,
  link: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as ApartmentBox,
  // Container as ApartmentBox,
  Component as ApartmentBoxComponent,
};
