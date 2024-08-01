import {
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";

const ListCurrency = () => {
  const { data } = useSelector((state) => state.data); // получаем состояние из стора
  const [valueSelect, setValueSelect] = useState(""); // значение в элементе выбора
  const [arrCurrency, setArrCurrency] = useState([]); // массив всех валют

  useEffect(() => {
    const arr = Object.keys(data);
    setArrCurrency(arr);
    setValueSelect(arr[0]);
  }, [data]);

  const handleChange = (event) => {
    setValueSelect(event.target.value);
  };

  return (
    <div className="containerCenter">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Валюты</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={valueSelect}
          label="сurrency"
          placeholder="сurrency"
          onChange={handleChange}
        >
          {arrCurrency.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {arrCurrency.map((item) => (
          <ListItem key={item} disableGutters>
            <ListItemText
              primary={`1${item} = ${parseFloat(
                ((1 / data[item]) * data[valueSelect]).toFixed(5)
              )}${valueSelect}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ListCurrency;
