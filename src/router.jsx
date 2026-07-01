import React from "react";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter
} from "@tanstack/react-router";
import App from "./App";
import { CaixaPage } from "./routes/caixa";
import { CardapioPage } from "./routes/cardapio";
import { CozinhaPage } from "./routes/cozinha";
import { EstoquePage } from "./routes/estoque";
import { DashboardPage } from "./routes";
import { SalaPage } from "./routes/sala";

const rootRoute = createRootRoute({
  component: () => (
    <App>
      <Outlet />
    </App>
  )
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage
});

const salaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sala",
  component: SalaPage
});

const cardapioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cardapio",
  component: CardapioPage
});

const cozinhaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cozinha",
  component: CozinhaPage
});

const caixaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/caixa",
  component: CaixaPage
});

const estoqueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/estoque",
  component: EstoquePage
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  salaRoute,
  cardapioRoute,
  cozinhaRoute,
  caixaRoute,
  estoqueRoute
]);

const router = createRouter({ routeTree });

export function AppRouter() {
  return <RouterProvider router={router} />;
}
