"use client";

import React from "react";
import type { AppProps } from "next/app";
import "./App.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  return <Component {...pageProps} router={router} />;
};

export default MyApp;
