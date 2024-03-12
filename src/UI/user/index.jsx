import "../../index.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/Auth";
import { NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuItem, NavbarMenu, NavbarMenuToggle, NavbarItem, Link, Button } from "@nextui-org/react";


function UserUI({ children }) {

    const { logOut } = useContext(AuthContext);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const routes = [
        {
            title: 'Ingreso',
            route: '/',
        },
        // {
        //     title: 'Taller',
        //     route: '/taller',
        // },
        {
            title: 'Croquis',
            route: '/croquis',
        },
        {
            title: 'Reportes',
            route: '/reportes',
        },

    ]

    return (
        <>
            <section className="flex flex-col h-screen ">
                <Navbar className="bg-secondary" onMenuOpenChange={setIsMenuOpen}>

                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="text-white sm:hidden"
                    />

                    <NavbarBrand>
                        <p className="font-bold text-white">SCANIA</p>
                    </NavbarBrand>

                    <NavbarContent className="hidden gap-4 sm:flex" justify="start">
                        {routes.map((route) => (
                            <NavbarItem key={route.title}>
                                <NavLink
                                    to={route.route}
                                    className={({ isActive, isPending, isTransitioning }) =>
                                        [
                                            isPending ? "pending" : "",
                                            isActive ? "text-white font-semibold" : "text-link font-normal text-sm",
                                            isTransitioning ? "transitioning" : "",
                                        ].join(" ")
                                    }
                                >
                                    {route.title}
                                </NavLink>
                            </NavbarItem>
                        ))}
                    </NavbarContent>

                    <NavbarContent className="max-sm:hidden" justify="end">
                        <NavbarItem>
                            <Button
                                onPress={async () => await logOut()}
                                className="text-white bg-danger"
                                variant="flat"
                            >
                                Sign Out
                            </Button>
                        </NavbarItem>

                    </NavbarContent>

                    <NavbarMenu className="gap-5">
                        {routes.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <NavLink
                                    size="lg"
                                    to={item.route}
                                    className={({ isActive, isPending, isTransitioning }) =>
                                        [
                                            isPending ? "pending" : "",
                                            isActive ? "text-primary font-semibold" : "font-normal text-sm",
                                            isTransitioning ? "transitioning" : "",
                                        ].join(" ")
                                    }
                                >
                                    {item.title}
                                </NavLink>
                            </NavbarMenuItem>
                        ))}

                        <Button
                            onPress={async () => await logOut()}
                            className="text-white w-52"
                            color="danger"
                            variant='solid'
                        >
                            Sign Out
                        </Button>

                    </NavbarMenu>

                </Navbar>

                <main className="flex flex-col items-center h-full py-5 overflow-auto bg-gray-100 lg:p-5 md:p-2 sm:p-0 ">
                    {children}
                </main>

            </section>
        </>
    );
}

export { UserUI };