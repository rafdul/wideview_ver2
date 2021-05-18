import React from 'react';
import { shallow } from 'enzyme';
import { DatePickerComponent } from './DatePicker';

describe('Component DatePicker', () => {
  it('should render without crashing', () => {


    const component = shallow(<DatePickerComponent />);
    expect(component).toBeTruthy();
  });
});
