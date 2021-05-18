import React from 'react';
import { shallow } from 'enzyme';
import { ProductsAllComponent } from './ProductsAll';

describe('Component ProductOne', () => {
  it('should render without crashing', () => {

    const apartments = [{}];
    const fetchAllApartments = function(){};

    const component = shallow(<ProductsAllComponent fetchAllApartments={fetchAllApartments} className="lorem" apartments={apartments} loading={{active: true}}/>);
    expect(component).toBeTruthy();
  });
});
