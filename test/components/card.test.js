import React from 'react';
import renderer from 'react-test-renderer';

import Card from './../../src/components/Card';
import { cardProps } from './../__mock__';

test('Card component snapshot', () => {
  const component = renderer.create(
    <Card value={cardProps}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
