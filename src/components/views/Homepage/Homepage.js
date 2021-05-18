import React from 'react';
import PropTypes from 'prop-types';

import { MainView } from '../../views/MainView/MainView';
import { Carousel } from '../../features/Carousel/Carousel';

import clsx from 'clsx';
import styles from './Homepage.module.scss';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';



const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <Carousel />
    <div className={styles.container}>
      <MainView />
    </div>
  </div>
);

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
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};
