"use client";

import React from "react";
import Main, { MainProps } from "@components/main/Main";
import store from "@store/store";
import { Provider } from "react-redux";

const ClientComponent: React.FC<MainProps> = (props) => {
  return (
    <Provider store={store}>
      <Main {...props} />
    </Provider>
  );
};

export default ClientComponent;
