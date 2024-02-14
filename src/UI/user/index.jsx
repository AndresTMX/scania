import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuItem, NavbarMenu, NavbarMenuToggle, NavbarItem, Link, Button } from "@nextui-org/react";
import "../../index.css";

function UserUI({ children }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        "Ingreso",
        "Patio",
        "Croquis",
        "Cerrar sesión",
    ];

    const routes = [
        {
            title: 'Ingreso',
            route: '/',
        },
        {
            title: 'Taller',
            route: '/taller',
        },
        {
            title: 'Croquis',
            route: '/croquis',
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

                    <NavbarContent justify="end">
                        <NavbarItem>
                            <Button as={Link} className="text-white bg-primary" href="#" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </NavbarContent>

                    <NavbarMenu>
                        {menuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Link
                                    color={
                                        index === 0 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                                    }
                                    href="#"
                                    size="lg"
                                >
                                    {item}
                                </Link>
                            </NavbarMenuItem>
                        ))}
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