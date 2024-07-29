"use client";

import React from "react";
import dynamic from "next/dynamic";
import { AppProps } from "next/app";
import { useRouter, Router } from "next/router";

const MyApp = dynamic(() => import("../../pages/_app"), { ssr: false });

export function ClientOnly() {
  const router = useRouter() as Router;

  const AppComponent = MyApp as React.ComponentType<
    AppProps & { router: Router }
  >;

  return <AppComponent Component={() => null} pageProps={{}} router={router} />;
}
