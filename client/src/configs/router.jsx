import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import Layout from "../pages/Layout";
import ItineraryForm from "../pages/ItineraryForm";

const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<Landing/>
            }
        ]
    },
    {
        path:"/aka",
        element:(
            <>
                <ItineraryForm/>
            </>
        )
    },
    {
        path:"/login",
        element:(
            <>
                <h1>Login Page</h1>
            </>
        )
    },
    {
        path:"*",
        element:(
            <>
                <h1>404 Page not found</h1>
            </>
        )
    }
])

export default router;