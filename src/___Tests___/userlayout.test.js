import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Userlayout from './Userlayout'; // Adjust the import path as necessary

const mockStore = configureStore([]);

describe('Userlayout Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      Auth: {// Mock user data
        user: { name: 'Test User' } 
      }
    });
  });

  test('renders Outlet component within the div', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Userlayout />
        </MemoryRouter>
      </Provider>
    );

    const divElement = container.querySelector('div');
    expect(divElement).toBeInTheDocument();
    expect(divElement.querySelector('diva > *')).toBeInTheDocument();
  });
});