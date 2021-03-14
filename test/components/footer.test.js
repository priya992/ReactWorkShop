import React from 'react';
import renderer from 'react-test-renderer';

import Footer from './../../src/components/Footer';

test('Footer component snapshot', () => {
  const component = renderer.create(
    <Footer />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
