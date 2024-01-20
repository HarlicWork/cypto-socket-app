import React from 'react';
import { render } from '@testing-library/react-native';

import ApplicationNavigator from './ApplicationNavigator';

describe('ApplicationNavigator', () => {
  it('should render successfully', () => {
    const { root } = render(<ApplicationNavigator />);
    expect(root).toBeTruthy();
  });
});
