import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../components/Layout"
import Books from "../components/Books";
import Members from "../components/Member";
import Histories from "../components/Histories";

const routes: RouteObject[] = [
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Books />,
            },
            {
                path: "/books",
                element: <Books />
            },
            {
                path: "/members",
                element: <Members />
            },
            {
                path: "/histories",
                element: <Histories />
            }
        ]
    }
]

const router = createBrowserRouter(routes)
export default router

