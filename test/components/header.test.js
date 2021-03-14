import React from 'react';
import renderer from 'react-test-renderer';

import Header from './../../src/components/Header';
import { headerProps } from './../__mock__';

test('Header component snapshot', () => {
  const component = renderer.create(
    <Header {...headerProps}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
