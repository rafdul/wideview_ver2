import React from 'react';
import { shallow } from 'enzyme';
import { FormReservationComponent } from './FormReservation';

describe('Component FormReservation', () => {
  it('should render without crashing', () => {


    const component = shallow(<FormReservationComponent />);
    expect(component).toBeTruthy();
  });
});
