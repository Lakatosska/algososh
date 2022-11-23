// Корректно разворачивает строку:
// •	с чётным количеством символов.
// •	с нечетным количеством символов.
// •	с одним символом.
// •	пустую строку.



import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { StringComponent } from "./string";

//jest.setTimeout();

describe('String reverses correctly', () => {

  const stringReverseTest = (value, reversedValue) => {

    return async () => {
      render(
        <Router>
          <StringComponent />
        </Router>
      );

      const input = screen.getByTestId('input');
      const button = screen.getByText('Развернуть');
      const letters = screen.getAllByTestId('circles')

      fireEvent.change(input, { target: { value } });
      fireEvent.click(button);

      await waitFor(
        () => {
          expect(letters?.textContent).toBe(
            reversedValue
          );
        },
        { timeout: 1000 }
      );
    }
  }
  it('with an even number of chars', () => {
    stringReverseTest("123456", "654321");
  });
  it('with an odd number of chars', () => {
    stringReverseTest("12345", "54321");
  });
  it('with one char', () => {
    stringReverseTest('1', '1');
  });
  it('with an empty string', () => {
    stringReverseTest('', '');
  });
});

