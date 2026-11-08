import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import PublicLayout from "../layout/PublicLayout";
import { lazy } from "react";

const Photos = lazy(() => import("../pages/Photos"))
const Contact = lazy(() => import("../pages/Contact"))
const About = lazy(() => import("../pages/About"))

export const router = createBrowserRouter([
    {
        path: "/",
        Component: PublicLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/about',
                Component: About
            },
            {
                path: '/contact',
                Component: Contact
            },
            {
                path: '/photos',
                Component: Photos
            }
        ]
    },

])