import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import styles from './LocationPin.module.scss';

const Component = ({text}) => (
  <div className={styles.pin}>
    <FontAwesomeIcon icon={faMapMarkerAlt} href="#" className={styles.pin__icon}/>
    <p className={styles.pin__text}>{text}</p>
  </div>
);

Component.propTypes = {
  text: PropTypes.string,
};

export {
  Component as LocationPin,
  Component as LocationPinComponent,
};
