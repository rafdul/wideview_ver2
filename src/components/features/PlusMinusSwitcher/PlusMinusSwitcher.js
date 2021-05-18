import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PlusMinusSwitcher.module.scss';

const Component = ({maxValue, setAmount, defaultVal}) => {


  const [count, setCount] = useState(defaultVal || 0);

  const finalAmount = amount => {
    if (amount === undefined) {
      return 0;
    } else if (amount < 0) {
      return 0;
    } else if (amount > parseInt(maxValue)) {
      setCount(maxValue);
      return maxValue;
    } else {
      return amount;
    }
  };

  const handleOnChange = event => {
    // event.preventDefault();

    // console.log('event', event);
    setCount(event);
    setAmount(event);
  };

  const handleMinus = () => {
    setCount(Math.max(count - 1, 0));
    setAmount(Math.max(count - 1, 0));
  };

  const handlePlus = () => {
    setCount(parseInt(count) + 1);
    setAmount(parseInt(count) + 1);
  };

  return(
    <div className={styles.root}>
      <Button
        variant="outlined"
        className={styles.inputSwitcher}
        disabled={parseInt(count) <= 0 ? true : false}
        aria-label="reduce"
        onClick={() => {
          handleMinus();
        }}
      >
        <FontAwesomeIcon icon={faMinus} />
      </Button>
      <input
        className={styles.inputNumber}
        type='text'
        min='0'
        max={maxValue}
        value={finalAmount(count)}
        // defaultValue={defaultVal}
        onChange={event => handleOnChange(event.target.value)}
      />
      {/* {console.log('window.event:', window.event)} */}
      <Button
        variant="outlined"
        className={styles.inputSwitcher}
        disabled={parseInt(count) >= maxValue ? true : false}
        aria-label="increase"
        onClick={() => {
          handlePlus();
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  );
};

Component.propTypes = {
  maxValue: PropTypes.string,
  setAmount: PropTypes.func,
  defaultVal: PropTypes.number,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PlusMinusSwitcher,
  // Container as PlusMinusSwitcher,
  Component as PlusMinusSwitcherComponent,
};
