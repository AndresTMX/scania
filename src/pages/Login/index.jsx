import { Toaster } from "sonner";
import { useState, useContext } from "react";
import { scaniaLogo } from "../../WebResources";
import { AuthContext } from "../../Context/Auth";
import { Input, Button, Image } from "@nextui-org/react";
import { FaLongArrowAltRight, FaRegEyeSlash, FaRegEye } from "react-icons/fa";

function Login() {

    const { login } = useContext(AuthContext);

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const Submit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target)

        const formValues = {};

        for(const [name, value] of form.entries()){
            formValues[name] = value
        }

        await login(formValues.email, formValues.password)
    }

    return (
        <>
            <div class="min-h-screen bg-gray-100 flex flex-col justify-start sm:py-2 sm:justify-start xs:py-2" >
                <div class="lg:p-10 xs:p-2 sm:p-1 mx-auto md:w-full md:max-w-md p-4">

                    <div>
                        <Image src={scaniaLogo}
                            alt="scania-logo"
                            height='150px'
                            width='auto'
                        />
                        <p class="font-bold text-center text-sm mb-5 text-gray-400">SCANIA CONTROL</p>
                    </div>

                    <Toaster richColors position='top-center' />

                    {/* boxlogin */}
                    <form onSubmit={Submit} class="bg-white w-full input-light-base">
                        <div class="px-5 py-7 flex flex-col gap-5">
                            <Input 
                            isRequired
                            name='email' 
                            className="input-light-base" 
                            label='E-mail' 
                            type="text" 
                            size="sm" 
                            />

                            <Input
                                isRequired
                                name='password' 
                                label="Password"
                                size="sm"
                                placeholder="Enter your password"
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                        {isVisible ? (
                                            <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                                className="input-light-base"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                className="text-white"
                                color="primary"
                                endContent={<FaLongArrowAltRight />}
                            >
                                Login
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}

export { Login };