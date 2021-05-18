import React from 'react';
import PropTypes from 'prop-types';

import { ApartmentBox } from '../../features/ApartmentBox/ApartmentBox';
import { Loading } from '../../common/Loading/Loading';
import { Error } from '../../common/Error/Error';

import styles from './ProductsAll.module.scss';
import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAllApartments, fetchAllPublished, getLoading } from '../../../redux/apartmentsRedux.js';


class Component extends React.Component {

  componentDidMount() {
    const { fetchAllApartments } = this.props;
    fetchAllApartments();
    console.log('fetchAllApartments', fetchAllApartments);
  }

  render() {
    const { className, apartments, loading } = this.props;
    console.log('apartments', apartments);

    if(loading && loading.active === true) {
      return(
        <Loading />
      );
    }
    else if(loading && loading.error === true) {
      return(
        <Error />
      );
    }
    else{
      return(
        <div className={clsx(className, styles.root)}>
          <div className={styles.container}>
            <h2 className={styles.title}>Check our offer</h2>
            <div className={styles.cards}>

              {apartments.map(apartment => (

                <ApartmentBox
                  key={apartment._id}
                  link={`/products/${apartment.category}/${apartment._id}`}
                  image={apartment.image[0]}
                  name={apartment.name}
                  city={apartment.city}
                  price={apartment.price}
                  {...apartment}
                />

              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}

Component.propTypes = {
  className: PropTypes.string,
  apartments: PropTypes.array,
  fetchAllApartments: PropTypes.func,
  loading: PropTypes.object,
};

const mapStateToProps = state => ({
  apartments: getAllApartments(state),
  loading: getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAllApartments: arg => dispatch(fetchAllPublished(arg)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as ProductsAll,
  Container as ProductsAll,
  Component as ProductsAllComponent,
};
