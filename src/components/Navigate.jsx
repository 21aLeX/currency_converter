import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import ListCurrency from "./ListCurrency";
import Converter from "./Converter";

const path = {
  converter: "/",
  list: "/list",
};
const component = {
  converter: <Converter />,
  list: <ListCurrency />,
};

const Navigate = () => {
  const [namePath, setNamePath] = useState("converter");
  const navigate = useNavigate();
  useEffect(() => {
    navigate(path[namePath]);
  }, []);

  const handleChange = (event, newValue) => {
    setNamePath(newValue);
    navigate(path[newValue]);
  };
  return (
    <>
      <Tabs
        value={namePath}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab value="converter" label="converter" />
        <Tab value="list" label="list" />
      </Tabs>
      {component[namePath]}
    </>
  );
};

export default Navigate;
