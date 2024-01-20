import React from 'react';
import { render } from '@testing-library/react-native';

import SafeScreen from './SafeScreen';

describe('SafeScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<SafeScreen />);
    expect(root).toBeTruthy();
  });
});
