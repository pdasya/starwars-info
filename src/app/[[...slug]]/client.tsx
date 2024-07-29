"use client";

import React from "react";
import dynamic from "next/dynamic";

const MyApp = dynamic(() => import("../../pages/_app"), { ssr: false });

export function ClientOnly() {
  const AppComponent = MyApp as React.ComponentType<any>;
  return <AppComponent Component={() => null} pageProps={{}} />;
}
