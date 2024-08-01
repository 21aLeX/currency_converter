import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ListCurrency from "./components/ListCurrency";
import Converter from "./components/Converter";
import Navigate from "./components/Navigate";
import { setData } from "./store/sliceData";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function f() {
      try {
        const answer = await fetch(
          `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_ID}/latest/USD`
        );
        const data = await answer.json();
        dispatch(setData(data.conversion_rates));
      } catch (error) {
        alert(`Ошибка загрузки данных:${error.message}`);
      }
    }
    f();
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate />}>
            <Route index element={<Converter />} />
            <Route path="/list" element={<ListCurrency />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
