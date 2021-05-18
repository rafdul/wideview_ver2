import React from 'react';
import { shallow } from 'enzyme';
import { ProductsByCategoryComponent } from './ProductsByCategory';

describe('Component ProductOne', () => {
  it('should render without crashing', () => {

    const apartments = [{}];
    const fetchApartments = function(){};

    const component = shallow(<ProductsByCategoryComponent fetchApartments={fetchApartments} match={{params: {categoryId: 'ipsum'}}} className="lorem" apartments={apartments} loadingOrders={{active: true}}/>);
    expect(component).toBeTruthy();
  });
});
