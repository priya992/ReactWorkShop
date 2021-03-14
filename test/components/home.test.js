import React from 'react';
import renderer from 'react-test-renderer';

import Home from './../../src/components/Home';
import { homeData } from './../__mock__';

test('Home component snapshot', () => {
  const component = renderer.create(
    <Home data={homeData.data} totalData={homeData.totalapps}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
