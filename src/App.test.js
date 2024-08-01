import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ListCurrency from "./components/ListCurrency";
import Converter from "./components/Converter";
import { setData } from "./store/sliceData";

// Подготовка начального состояния и редьюсера для компонентов
const defaultState = {
  data: {
    data: {
      USD: 1.0,
      RUB: 86.1954,
    },
  },
};
const dataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  data: dataReducer,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: defaultState,
});

// Тест для компонента отображения списка валют
test("ListCurrency", async () => {
  render(
    <Provider store={store}>
      <ListCurrency />
    </Provider>
  );

  // Проверяем, что стоит по умолчанию USD и на странице есть элемент "1USD = 1USD"
  const resultUSD = screen.getByText(/1USD = (\d+)USD/i);
  expect(resultUSD).toHaveTextContent("1USD = 1USD");

  // Получаем элемент для выбора валют
  const select = screen.getByPlaceholderText("сurrency");
  // Устанавливаем значение USD
  fireEvent.change(select, { target: { value: "USD" } });
  // Ожидаем результат
  const resultText = await screen.findByText(/1RUB = (\d+\.\d+)USD/i);
  expect(resultText).toBeInTheDocument();

  // Проверяем, что результат считается правильно
  const resultRUB = screen.getByText(/1RUB = (\d+\.\d+)USD/i);
  expect(resultRUB).toHaveTextContent("1RUB = 0.0116USD");
  // Устанавливаем значение RUB
  fireEvent.change(select, { target: { value: "RUB" } });
  // Ожидаем результат
  const resultText2 = await screen.findByText(/1USD = (\d+\.\d+)RUB/i);
  expect(resultText2).toBeInTheDocument();

  // Проверяем, что результат считается правильно
  const resultUSD2 = screen.getByText(/1USD = (\d+\.\d+)RUB/i);
  expect(resultUSD2).toHaveTextContent("1USD = 86.1954RUB");
});

// Тест для компонента конвертации валют
test("Converter", async () => {
  render(
    <Provider store={store}>
      <Converter />
    </Provider>
  );
  // Получаем элемент для ввода строки
  const inputField = screen.getByPlaceholderText("15 USD in RUB");
  // Ввод строки
  fireEvent.change(inputField, { target: { value: "15 USD in RUB" } });
  // Запуск события отправки формы
  fireEvent.submit(inputField);
  // Ожидаем результат
  const resultText = await screen.findByText(/Результат: (?!0)\d+/i);
  expect(resultText).toBeInTheDocument();

  // Проверяем, что результат считается правильно
  const resultValue = screen.getByText(/Результат: (\d+)/i);
  expect(resultValue).toHaveTextContent("Результат: 1292");
});

// Тест для reducer 
test("reducer", () => {
  expect(setData(defaultState.data.data)).toEqual({
    payload: { RUB: 86.1954, USD: 1 },
    type: "sliceData/setData",
  });
});
