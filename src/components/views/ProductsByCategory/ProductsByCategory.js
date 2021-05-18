import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { ApartmentBox } from '../../features/ApartmentBox/ApartmentBox';
import { Loading } from '../../common/Loading/Loading';
import { Error } from '../../common/Error/Error';


import clsx from 'clsx';
import styles from './ProductsByCategory.module.scss';

import { connect } from 'react-redux';
import { getAllApartments, fetchAllPublished, getLoading } from '../../../redux/apartmentsRedux.js';


const Component = ({ className, apartments, match, fetchApartments, loading }) => {

  useEffect(() => {
    fetchApartments();
  });

  // console.log('props:', match.params.categoryId);
  // console.log('apartments:', apartments);
  // console.log('fetchApartments', fetchApartments);


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
          <h3 className={styles.title}>{match.params.categoryId}</h3>

          <div className={styles.cards}>
            {apartments.filter(apartment => apartment.category === match.params.categoryId).map(apartmentByCat => (

              <ApartmentBox
                key={apartmentByCat._id}
                link={`/products/${apartmentByCat.category}/${apartmentByCat._id}`}
                image={apartmentByCat.image}
                name={apartmentByCat.name}
                city={apartmentByCat.city}
                price={apartmentByCat.price}
                {...apartmentByCat}
              />

            ))}
          </div>

        </div>
      </div>
    );
  }
};

Component.propTypes = {
  className: PropTypes.string,
  apartments: PropTypes.array,
  match: PropTypes.object,
  fetchApartments: PropTypes.func,
  loading: PropTypes.object,
};

const mapStateToProps = (state) => ({
  apartments: getAllApartments(state),
  loading: getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchApartments: apartments => dispatch(fetchAllPublished(apartments)),
  // fetchApartments: apartments => setTimeout(() => dispatch(fetchAllPublished(apartments)), 3000),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as ProductsByCategory,
  Container as ProductsByCategory,
  Component as ProductsByCategoryComponent,
};
