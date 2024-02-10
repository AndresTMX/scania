import { HashRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from '@nextui-org/react'
import { Ingreso } from "./pages/ingreso";
import { Login } from "./pages/Login";
import { UserUI } from "./UI/user";
import { Checklist } from "./sections/Checklist";

function Router() {

  return (
    <>
      <NextUIProvider>
        <HashRouter>
          <Routes>

            <Route path="/"
              element={
                <UserUI>
                  <Ingreso />
                </UserUI>
              } >

              <Route path=":chasis" element={<Checklist />} />

            </Route>

            <Route
              path="/login"
              element={
                <Login />
              } />

          </Routes>
        </HashRouter>
      </NextUIProvider>
    </>
  )
}

export default Router
