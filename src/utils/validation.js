import * as Yup from "yup";

const getSchema = () => {
  const regexpData = "^\\d+\\s+\\w{3}\\s+(in)\\s+\\w{3}$";
  return () =>
    Yup.object().shape({
      request: Yup.string()
        .trim()
        .matches(regexpData, "Неверный формат")
        .required("Должно быть заполненым"),
    });
};

export default getSchema;
