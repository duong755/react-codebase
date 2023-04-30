import React, { lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

const HomeScreen = lazy(() => import("#/screens/home"));
const AboutScreen = lazy(() => import("#/screens/about"));

function withSuspense(node: React.ReactNode, fallback: NonNullable<React.ReactNode> | null = null) {
  return <React.Suspense fallback={fallback}>{node}</React.Suspense>;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={withSuspense(<HomeScreen />)} />
      <Route path="/about" element={withSuspense(<AboutScreen />)} />
    </Route>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export { App };
