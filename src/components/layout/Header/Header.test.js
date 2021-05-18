import React from 'react';
import { shallow } from 'enzyme';
import { HeaderComponent } from './Header';

describe('Component Header', () => {
  it('should render without crashing', () => {

    const productsInCart = [{id: 1, name: 'a'}, {id: 2, name: 'b'}];
    const component = shallow(<HeaderComponent productsInCart/>);
    expect(component).toBeTruthy();
  });
});
