import renderer from 'react-test-renderer';
import {render, screen, fireEvent} from '@testing-library/react';
import { Button } from './button';

describe('Тестирование компонента Button', () => {

  it('Кнопка с текстом', () => {
    const button = renderer.create(<Button text='text' />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Кнопка без текста', () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Заблокированная кнопка', () => {
    const button = renderer.create(<Button disabled={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Кнопка с индикацией загрузки', () => {
    const button = renderer.create(<Button isLoader={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Вызов колбэка при клике на кнопку', () => {
    const mockFn = jest.fn();
    render(<Button text='text' onClick={mockFn} />);
    const button = screen.getByText('text');
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalled();
  })

})