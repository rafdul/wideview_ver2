import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Carousel.module.scss';

const Component = ({className}) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return(
    <div className={clsx(className, styles.root)}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item className={styles.carousel__item}>
          <img
            className="d-block w-100"
            srcSet="
              /images/carousel-images/apartment_sea-640.jpg 640w,
              /images/carousel-images/apartment_sea-1280.jpg 1280w,
              /images/carousel-images/apartment_sea-1920.jpg 1920w
            "
            src="/images/carousel-images/apartment_sea-1920.jpg"
            alt="First slide"
          />
          <Carousel.Caption className={styles.carousel__text}>
            <h1>Discover apartments for rent in 50+ countries!</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={styles.carousel__item} >
          <img
            className="d-block w-100"
            srcSet="
              /images/carousel-images/apartment-640.jpg 640w,
              /images/carousel-images/apartment-1280.jpg 1280w,
              /images/carousel-images/apartment-1920.jpg 1920w
            "
            src="/images/carousel-images/apartment-1920.jpg"
            alt="Second slide"
          />

          <Carousel.Caption className={styles.carousel__text}>
            <h1>Explore our most popular offers</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={styles.carousel__item} >
          <img
            className="d-block w-100"
            srcSet="
              /images/carousel-images/dining-room-640.jpg 640w,
              /images/carousel-images/dining-room-1280.jpg 1280w,
              /images/carousel-images/dining-room-1920.jpg 1920w
            "
            src="/images/carousel-images/dining-room-1920.jpg"
            alt="Third slide"
          />
          <Carousel.Caption className={styles.carousel__text}>
            <h1>Hundreds of cities around the world! Where will you go?</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Carousel,
  // Container as Carousel,
  Component as CarouselComponent,
};
