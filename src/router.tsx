import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";
import { RootLayout } from "./Pages/RootLayout";
import { CreateItem } from "./Pages/CreateItem";
import { ItemsLayout } from "./Pages/ItemsLayout";
import { ListItems } from "./Pages/ListItems";
import { ShowItem } from "./Pages/ShowItem";
import { UpdateItem } from "./Pages/UpdateItem";

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