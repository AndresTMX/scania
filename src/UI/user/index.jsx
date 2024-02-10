import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuItem, NavbarMenu, NavbarMenuToggle, NavbarItem, Link, Button } from "@nextui-org/react";

function UserUI({ children }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        "Ingreso",
        "Patio",
        "Taller",
        "Cerrar sesión",
    ];

    return (
        <section className="flex flex-col h-full ">
            <Navbar className="bg-secondary" onMenuOpenChange={setIsMenuOpen}>

                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden text-white"
                />

                <NavbarBrand>
                    <p className="font-bold text-white">SCANIA</p>
                </NavbarBrand>

                <NavbarContent className="hidden sm:flex gap-4" justify="start">
                    <NavbarItem isActive>
                        <Link className="text-#338EF7" href="#">
                            Ingreso
                        </Link>
                    </NavbarItem>
                    <NavbarItem >
                        <Link className="text-white" href="/patio">
                            Patio
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className="text-white"  href="#">
                            Taller
                        </Link>
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button as={Link} className="bg-primary text-white"  href="#" variant="flat">
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

            <main className="flex flex-col items-center py-5 h-full bg-gray-100 overflow-auto lg:p-5 md:p-2 sm:p-0 ">
                {children}
            </main>

            <footer className="flex flex-col items-center justify-center py-4 bg-secondary text-white">
                <p className=" flex w-fit p-1">scania</p>
            </footer>
        </section>
    );
}

export { UserUI };