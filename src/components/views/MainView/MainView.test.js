import React from 'react';
import { shallow } from 'enzyme';
import { MainViewComponent } from './MainView';

describe('Component MainView', () => {
  it('should render without crashing', () => {

    const fetchAllCategories = function(){};
    const category = [];

    const component = shallow(<MainViewComponent fetchAllCategories={fetchAllCategories} className="lorem" category={category} loading={{active: true}}/>);
    expect(component).toBeTruthy();
  });
});
