import React from 'react';
import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
import { sortedDiameterDESC, sortedPopulationASC, sortedPopulationDESC } from './sortedData';

describe('Testes para a aplicação starwars planets search', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData)
    });
})
  test('se o filtro pelo nome funciona corretamente', async () => { 
    render(<App />);

    const filterByName = screen.getByRole('textbox', { name: /project starwars planets/i});
    userEvent.type(filterByName, 'Tatooine');

    expect(await screen.findByRole('cell', { name: /tatooine/i })).toBeInTheDocument();

    userEvent.clear(filterByName);

    expect(screen.getByRole('cell', { name: /yavin iv/i })).toBeInTheDocument();

    userEvent.type(filterByName, 'Hoth')

    expect(screen.queryByRole('cell', { name: /tatooine/i })).not.toBeInTheDocument();
  });
  test('se os filtros pelos numeros funcionam corretamente, e se removidos os filtros, a lista é atualizada de acordo com os filtros', async () => { 
    render(<App />)
    await screen.findByRole('cell', { name: /naboo/i });
    const tatooine = screen.getByRole('cell', { name: /tatooine/i });
    const endor = screen.getByRole('cell', { name: /endor/i });
    const alderaan = screen.getByRole('cell', { name: /alderaan/i});
    const yavinIV = screen.getByRole('cell', { name: /yavin iv/i});

    const selectFilterColumn = screen.getByTestId("column-filter");
    userEvent.selectOptions(selectFilterColumn, "diameter");

    const selectFilterComparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(selectFilterComparison, "maior que");

    const inputFilterValue = screen.getByTestId("value-filter");
    userEvent.clear(inputFilterValue);
    userEvent.type(inputFilterValue, "8900");

    const buttonFilterByNumber = screen.getByTestId("button-filter");
    userEvent.click(buttonFilterByNumber);
    
    const diameterBiggerThan8900 = screen.getByText(/diameter maior que 8900/i);
    expect(diameterBiggerThan8900).toBeInTheDocument();
    expect(tatooine).toBeInTheDocument();
    expect(endor).not.toBeInTheDocument();

    userEvent.selectOptions(selectFilterColumn, "population");
    userEvent.selectOptions(selectFilterComparison, "menor que");
    userEvent.clear(inputFilterValue);
    userEvent.type(inputFilterValue, "1000000");
    userEvent.click(buttonFilterByNumber);

    const populationSmallerThan1000000 = screen.getByText(/population menor que 1000000/i);
    expect(populationSmallerThan1000000).toBeInTheDocument();
    expect(tatooine).toBeInTheDocument();
    expect(alderaan).not.toBeInTheDocument();

    userEvent.selectOptions(selectFilterColumn, "surface_water");
    userEvent.selectOptions(selectFilterComparison, "igual a");
    userEvent.clear(inputFilterValue);
    userEvent.type(inputFilterValue, "8");
    userEvent.click(buttonFilterByNumber);

    const surface_waterBiggerThan1 = screen.getByText(/surface_water igual a 8/i);
    expect(surface_waterBiggerThan1).toBeInTheDocument();
    expect(yavinIV).toBeInTheDocument();
    expect(tatooine).not.toBeInTheDocument();

    const removeFilterSurface_Water = screen.getByTestId('remove-filter-surface_water');
    const removeFilterPopulation = screen.getByTestId('remove-filter-population');
    const removeFilterDiameter = screen.getByTestId('remove-filter-diameter');

    userEvent.click(removeFilterSurface_Water);
    expect(removeFilterSurface_Water).not.toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /tatooine/i })).toBeInTheDocument();

    userEvent.click(removeFilterPopulation);
    expect(removeFilterPopulation).not.toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /alderaan/i})).toBeInTheDocument();

    userEvent.click(removeFilterDiameter);
    expect(removeFilterDiameter).not.toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /endor/i })).toBeInTheDocument();
   });
   test('se o botão de remover todos os filtros funciona corretamente', async () => {
    render(<App />);
    await screen.findByRole('cell', { name: /naboo/i });
    const tatooine = screen.getByRole('cell', { name: /tatooine/i });
    const endor = screen.getByRole('cell', { name: /endor/i });
    const alderaan = screen.getByRole('cell', { name: /alderaan/i});
    const yavinIV = screen.getByRole('cell', { name: /yavin iv/i});

    const selectFilterColumn = screen.getByTestId("column-filter");
    userEvent.selectOptions(selectFilterColumn, "diameter");

    const selectFilterComparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(selectFilterComparison, "maior que");

    const inputFilterValue = screen.getByTestId("value-filter");
    userEvent.clear(inputFilterValue);
    userEvent.type(inputFilterValue, "8900");

    const buttonFilterByNumber = screen.getByTestId("button-filter");
    userEvent.click(buttonFilterByNumber);
    
    const diameterBiggerThan8900 = screen.getByText(/diameter maior que 8900/i);
    expect(diameterBiggerThan8900).toBeInTheDocument();
    expect(tatooine).toBeInTheDocument();
    expect(endor).not.toBeInTheDocument();

    userEvent.selectOptions(selectFilterColumn, "population");
    userEvent.selectOptions(selectFilterComparison, "menor que");
    userEvent.clear(inputFilterValue);
    userEvent.type(inputFilterValue, "1000000");
    userEvent.click(buttonFilterByNumber);

    const populationSmallerThan1000000 = screen.getByText(/population menor que 1000000/i);
    expect(populationSmallerThan1000000).toBeInTheDocument();
    expect(tatooine).toBeInTheDocument();
    expect(alderaan).not.toBeInTheDocument();

    userEvent.selectOptions(selectFilterColumn, "surface_water");
    userEvent.selectOptions(selectFilterComparison, "igual a");
    userEvent.clear(inputFilterValue);
    userEvent.type(inputFilterValue, "8");
    userEvent.click(buttonFilterByNumber);

    const surface_waterBiggerThan1 = screen.getByText(/surface_water igual a 8/i);
    expect(surface_waterBiggerThan1).toBeInTheDocument();
    expect(yavinIV).toBeInTheDocument();
    expect(tatooine).not.toBeInTheDocument();

    const removeFilterSurface_Water = screen.getByTestId('remove-filter-surface_water');
    const removeFilterPopulation = screen.getByTestId('remove-filter-population');
    const removeFilterDiameter = screen.getByTestId('remove-filter-diameter');
    const removeAllFilters = screen.getByTestId("button-remove-filters");

    userEvent.click(removeAllFilters);

    expect(removeFilterSurface_Water).not.toBeInTheDocument();
    expect(removeFilterPopulation).not.toBeInTheDocument();
    expect(removeFilterDiameter).not.toBeInTheDocument();

    expect(screen.getByRole('cell', { name: /tatooine/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /alderaan/i})).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /endor/i })).toBeInTheDocument();
   });
   test('se ao clicar no botão ordenar com "ASC" e "DESC" a tabela é ordenada corretamente', async () => {
    render(<App />);
    await screen.findByRole('cell', { name: /naboo/i });

    const selectSortColumn = screen.getByTestId("column-sort");
    const radioASC = screen.getByTestId("column-sort-input-asc");
    const radioDESC = screen.getByTestId("column-sort-input-desc");
    const buttonSort = screen.getByTestId("column-sort-button");

    expect(selectSortColumn).toBeInTheDocument();
    expect(radioASC).toBeInTheDocument();
    expect(radioDESC).toBeInTheDocument();
    expect(buttonSort).toBeInTheDocument();

    userEvent.selectOptions(selectSortColumn, 'population');
    userEvent.click(radioASC);
    userEvent.click(buttonSort);

    let allPlanets = screen.queryAllByTestId("planet-name");

    allPlanets.forEach(({ innerHTML }, index) => {
      expect(innerHTML).toBe(sortedPopulationASC[index]);
    });

    userEvent.selectOptions(selectSortColumn, 'diameter');
    userEvent.click(radioDESC);
    userEvent.click(buttonSort);

    allPlanets = screen.queryAllByTestId("planet-name");

    allPlanets.forEach(({ innerHTML }, index) => {
      expect(innerHTML).toBe(sortedDiameterDESC[index]);
    });

    userEvent.selectOptions(selectSortColumn, 'population');
    userEvent.click(radioDESC);
    userEvent.click(buttonSort);

    allPlanets = screen.queryAllByTestId("planet-name");

    allPlanets.forEach(({ innerHTML }, index) => {
      expect(innerHTML).toBe(sortedPopulationDESC[index]);
    });
    
   });
   test('se quando a requisição falha, o erro é tratado', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: (new Error)
  });
      render(<App />)
      await screen.findByRole('heading', { name: /deu ruim na requisição!!/i})
   });
});
