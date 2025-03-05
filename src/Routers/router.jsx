import React from 'react';

import Login from "../pages/Login/Login";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/orders",
            element: <div>Orders</div>
        },
        {
            path: "/about",
            element:<div>About</div>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/Sign in",
          element: <Signin/>
        },
        {
          path: "/cart",
          element: <CartPage/>
        }
      ]
    },
  ]);

  export default router;