import { NavLink } from "react-router-dom"

export function ErrorPage() {

    return (
        <>

            <section className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-primary">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Pagina no encontrada</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">vuelve al inicio para seguir navegando.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <NavLink
                            to='/'
                            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            volver al inicio
                        </NavLink>

                    </div>
                </div>
            </section>
        </>
    )
}
