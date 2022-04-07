/* import { render, screen } from '@testing-library/react';
import BreedComp from './Breed';

test('renders h2 title', () => {
  render(<BreedComp />);
  const h2Element = screen.getByText("raza");
  expect(h2Element).toBeInTheDocument();
}); */

import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Breed from './Breed';

configure({adapter: new Adapter()});

describe('<Breed />', () => {
  let wrapper;
  let temperaments;
  beforeEach(() => {
    temperaments = 'escuchar musica';
    wrapper =  mount(<Breed temperaments={temperaments} />)
  })

  it('deberia renderizar un "p" que contenga los "temperaments" que recibe por props', () => {
    expect(wrapper.contains(<p>{temperaments}</p>)).toEqual(true)
  })
  
});