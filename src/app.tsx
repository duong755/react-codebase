import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

const LanguagesScreen = React.lazy(() => import("#/screens/languages"));
const AboutScreen = React.lazy(() => import("#/screens/about"));

function withSuspense(node: React.ReactNode, fallback: NonNullable<React.ReactNode> | null = null) {
  return <React.Suspense fallback={fallback}>{node}</React.Suspense>;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<React.Fragment />} />
      <Route path="/languages" element={withSuspense(<LanguagesScreen />)} />
      <Route path="/about" element={withSuspense(<AboutScreen />)} />
    </Route>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export { App };
