import React from "react";
import { useNavigate } from "react-router-dom";

export const navigate = (param) => {
  let instance = useNavigate();
  instance(param);
};
