import React from 'react';
import { shallow } from 'enzyme';
import { ProductOneComponent } from './ProductOne';

describe('Component ProductOne', () => {
  it('should render without crashing', () => {

    const testGetOne = {};
    const fetchOneApartment = function(){};

    const component = shallow(<ProductOneComponent fetchOneApartment={fetchOneApartment} className="lorem" getOne={testGetOne} loadingOrders={{active: true}}/>);
    expect(component).toBeTruthy();
  });
});
