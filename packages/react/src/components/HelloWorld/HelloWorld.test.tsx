import HelloWorld from './HelloWorld';
import React from 'react';
import { render } from '@testing-library/react';

describe('App Component', function () {
  it('should have hello world message', function () {
    let { getByText } = render(<HelloWorld />);
    expect(getByText('Hello World!')).toMatchInlineSnapshot(`
      <div>
        Hello World!
      </div>
    `);
  });
});
