import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import Ranking from '../pages/Ranking';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import PlayAgainBtn from '../components/PlayAgainBtn';

const localStorageMock = (() => {
  let store = {};

  store['1'] = '[{"playerName":"leo12313","playerEmail":"leo543863@gmail.com","score":204}]';

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('Testa componente de Ranking', () => {
  it('Testa botão "Jogar novamente"', () => {
    renderWithRouterAndRedux(<PlayAgainBtn />)
    const playAgainBtn = screen.getByRole('button', { name: /jogar novamente/i })
    expect(playAgainBtn).toBeInTheDocument();
  });
});
