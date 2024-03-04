import { Tab, Tabs, } from "@nextui-org/react";
import { GrConfigure } from "react-icons/gr";
import { BsGridFill } from "react-icons/bs";
import { Bahia } from "../../sections/Bahia";
import { BahiaA, BahiaB } from "../../bahias";

function Croquis() {

    return (
        <>

            <section className="flex flex-col h-screen justify-start" >

                <div className="flex flex-col items-start gap-1 w-full px-0 py-4 max-md:items-center">
                    <Tabs size="md" aria-label="Options" color="primary" variant="bordered" className="text-white">

                        <Tab
                            key="A"
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
                            key="B"
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

                        </Tab>



                        <Tab
                            key="salidas"
                            title={
                                <div className="flex items-center space-x-2">
                                    <GrConfigure />
                                    <span>Taller</span>
                                </div>
                            }
                        >
                            <div className="max-w-[750px]">

                            </div>

                        </Tab>

                    </Tabs>

                </div>

            </section>

        </>
    );
}

export { Croquis };