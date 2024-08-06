"use client";

import React from "react";
import dynamic from "next/dynamic";
import { AppProps } from "next/app";
import { useRouter, Router } from "next/router";

const App = dynamic(() => import("../../App"), { ssr: false });

export function ClientOnly() {
  const router = useRouter() as Router;

  const AppComponent = App as React.ComponentType<
    AppProps & { router: Router }
  >;

  return <AppComponent Component={() => null} pageProps={{}} router={router} />;
}
