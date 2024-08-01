import { Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import getSchema from "../utils/validation";
import { useState } from "react";

// функция при отправке формы
const generateOnSubmit =
  (setStatusError, setTextError, setResult, data) =>
  async ({ request }) => {
    setStatusError(false);
    try {
      // разрезаем строку
      const [number, from, i, to] = request.split(" ");
      // поднимаем регистр
      const fromCurrency = from.toUpperCase();
      const toCurrency = to.toUpperCase();
      //  проверяем наличие валюты в полученной базе
      if (!data[fromCurrency] || !data[toCurrency]) {
        throw new Error(
          `${data[fromCurrency] ? to : from} такой валюты нет в базе`
        );
      }
      // конвертируем
      const result = (number * data[toCurrency]) / data[fromCurrency];
      setResult(result);
      setStatusError(false);
    } catch (error) {
      setTextError(error.message);
      setStatusError(true);
    }
  };

const Converter = () => {
  const [statusError, setStatusError] = useState(false); //статус ошибок помимо валидации формы
  const [textError, setTextError] = useState(""); //текст ошибок
  const [result, setResult] = useState(""); //результат конвертации
  const { data } = useSelector((state) => state.data);

  // управление формой
  const formik = useFormik({
    validationSchema: getSchema()(),
    initialValues: {
      request: "",
    },
    initialErrors: {},
    initialTouched: {},
    onSubmit: generateOnSubmit(setStatusError, setTextError, setResult, data),
  });
  return (
    <div className="containerCenter">
      <form onSubmit={formik.handleSubmit} role="form">
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={7}>
            <TextField
              fullWidth
              label="15 USD in RUB"
              placeholder="15 USD in RUB"
              id="request"
              error={
                (formik.errors.request && formik.touched.request) || statusError
                  ? true
                  : false
              } //при наличии ошибок поле будет красным
              helperText={formik.errors.request ?? textError} //вывод текстов ошибок под полем
              onChange={formik.handleChange("request")}
              value={formik.values.request}
              onBlur={formik.handleBlur("request")}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="outlined"
              onClick={formik.handleSubmit}
              size="large"
              disabled={
                (formik.errors.request && formik.touched.request) || statusError
                  ? true
                  : false
              }
            >
              Конвертировать
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography mt={2}>Результат: {Math.trunc(result)}</Typography>
    </div>
  );
};
export default Converter;
