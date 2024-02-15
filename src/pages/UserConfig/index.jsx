import { Input } from "@nextui-org/react";

function UserConfig() {


    return (
        <div className="flex flex-col items-center p-2 py-20">
            <div className="flex flex-col max-w-[900px]">

                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Información de usuario</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Utilizada para notificaciones y seguimiento.</p>
                </div>

                <form className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Nombres</dt>
                            <Input size="small"/>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Apellidos</dt>
                            <Input size="small"/>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Rol</dt>
                            <Input size="small"/>
                        </div>

                       

                    </dl>
                </form>
            </div>

        </div>
    );
}

export { UserConfig };