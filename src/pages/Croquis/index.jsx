import { useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { Tab, Tabs, } from "@nextui-org/react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Bahia } from "../../sections/Bahia"
import { GrConfigure } from "react-icons/gr";
import { BahiaA, BahiaB, BahiaC, BahiaD, BahiaE, BahiaG, BahiaTaller } from "../../bahias";
import { Toaster } from "sonner";

function Croquis() {

    const navigate = useNavigate();

    const { pathname } = useLocation();

    const [selected, setSelected] = useState("BahiaA");

    const changueSelected = (key) => {
        setSelected(key)
    }


    return (
        <>

            <section className="flex flex-col h-screen justify-start" >

                <Toaster richColors position='top-center' />

                <div className="flex flex-col items-start gap-1 w-full px-0 py-4 max-md:items-center">
                    <Tabs
                        size="md"
                        aria-label="Options"
                        color="primary"
                        variant="bordered"
                        selectedKey={selected}
                        onSelectionChange={changueSelected}
                        className="text-white">

                        <Tab
                            key="BahiaA"
                            title={
                                <div className="flex items-center space-x-2">
                                    <BsGridFill />
                                    <span>Bahía A</span>
                                </div>
                            }
                        >
                            <Bahia bahia={'a'} stateDefault={BahiaA} />
                        </Tab>

                        <Tab
                            key="BahiaB"
                            title={
                                <div className="flex items-center space-x-2">
                                    <BsGridFill />
                                    <span>Bahía B</span>
                                </div>
                            }
                        >
                            <Bahia bahia={'b'} stateDefault={BahiaB} />
                        </Tab>

                        <Tab
                            key="C"
                            title={
                                <div className="flex items-center space-x-2">
                                    <BsGridFill />
                                    <span>Bahía C</span>
                                </div>
                            }
                        >
                            <Bahia bahia={'c'} stateDefault={BahiaC} />
                        </Tab>

                        <Tab
                            key="D"
                            title={
                                <div className="flex items-center space-x-2">
                                    <BsGridFill />
                                    <span>Bahía D</span>
                                </div>
                            }
                        >
                            <Bahia bahia={'d'} stateDefault={BahiaD} />
                        </Tab>

                        <Tab
                            key="E"
                            title={
                                <div className="flex items-center space-x-2">
                                    <BsGridFill />
                                    <span>Bahía E</span>
                                </div>
                            }
                        >
                            <Bahia bahia={'e'} stateDefault={BahiaE} />
                        </Tab>

                        <Tab
                            key="G"
                            title={
                                <div className="flex items-center space-x-2">
                                    <BsGridFill />
                                    <span>Bahía G</span>
                                </div>
                            }
                        >
                            <Bahia bahia={'g'} stateDefault={BahiaG} />
                        </Tab>



                        <Tab
                            key="taller"
                            title={
                                <div className="flex items-center space-x-2">
                                    <GrConfigure />
                                    <span>Taller</span>
                                </div>
                            }
                        >
                            <Bahia bahia={'taller'} stateDefault={BahiaTaller} />
                        </Tab>

                    </Tabs>

                </div>

                <Outlet/>

            </section>

        </>
    );
}

export { Croquis };