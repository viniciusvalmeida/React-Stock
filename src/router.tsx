import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { RootLayout } from "./pages/RootLayout";
import { CreateItem } from "./pages/CreateItem";
import { ItemsLayout } from "./pages/ItemsLayout";
import { ListItems } from "./pages/ListItems";
import { ShowItem } from "./pages/ShowItem";
import { UpdateItem } from "./pages/UpdateItem";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },

      {
        path: 'items',
        element: <ItemsLayout />,
        children: [
          {
            index: true,
            element: <ListItems />
          },

          {
            path: 'new',
            element: <CreateItem />
          },

          {
            path: ':id',
            element: <ShowItem />
          },

          {
            path: ':id/update',
            element: <UpdateItem />
          }
        ]
      }
    ]
  }
])