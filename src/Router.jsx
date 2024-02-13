import { HashRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from '@nextui-org/react'
import { Ingreso } from "./pages/ingreso";
import { Login } from "./pages/Login";
import { UserUI } from "./UI/user";
import { Checklist } from "./sections/Checklist";
import { Responsiva } from "./sections/Responsiva";

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

            </Route>

            <Route path="checklist/:id/:chasis" element={<Checklist />} />

            <Route path="taller/:id/:chasis" element={<Responsiva />} />



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
