import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Loading } from '../../common/Loading/Loading';
import { Error } from '../../common/Error/Error';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAllCategories, fetchAllCategories, getLoadingCategories } from '../../../redux/categoriesRedux';

import styles from './MainView.module.scss';


class Component extends React.Component {

  componentDidMount() {
    const { fetchAllCategories } = this.props;
    fetchAllCategories();
  }

  render() {
    const { className, category, loading } = this.props;

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
          <div className={styles.subtitle}>
            <h1 className={styles.subtitle__first}>We have apartment for you!</h1>
            <h2>Say only where you want to rest.</h2>
          </div>
          <div className={styles.cards_group}>

            {category.map(item => (
              <div key={item.id} className={styles.cards_group__item}>
                <Card  className={styles.flex}>
                  <CardActionArea>
                    <Link to={`/products/${item.name}`} className={styles.link}>
                      <div className={styles.imageContainer}>
                        <CardMedia
                          className={styles.image}
                          component="img"
                          image={item.image}
                          title={item.name}
                        />
                      </div>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h5" className={styles.text}>
                          {item.title}
                        </Typography>
                      </CardContent>
                    </Link>
                  </CardActionArea>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

Component.propTypes = {
  className: PropTypes.string,
  category: PropTypes.array,
  fetchAllCategories: PropTypes.func,
  loading: PropTypes.object,
};

const mapStateToProps = state => ({
  // category: state.categories,
  category: getAllCategories(state),
  loading: getLoadingCategories(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAllCategories: arg => dispatch(fetchAllCategories(arg)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as MainView,
  Container as MainView,
  Component as MainViewComponent,
};
