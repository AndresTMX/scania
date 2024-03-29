import { HashRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from '@nextui-org/react'
import { Ingreso } from "./pages/ingreso";
import { Login } from "./pages/Login";
import { UserUI } from "./UI/user";
import { Checklist } from "./sections/Checklist";
import { Responsiva } from "./sections/Responsiva";
import { ErrorPage } from "./pages/Error";
import { Taller } from "./pages/Taller";
import { Croquis } from "./pages/Croquis";
//outlets
import { ChecklistPDF } from "./outlets/ChecklistPDF";

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

              <Route path="document-checklist/:id" element={<ChecklistPDF />} />

            </Route>

            <Route path="checklist/:id/:chasis" element={<Checklist />} />

            <Route path="taller/:id/:chasis" element={<Responsiva />} />

            <Route path="*" element={<ErrorPage />} />

            <Route path="/taller" element={
              <UserUI>
                <Taller />
              </UserUI>
            } />

            <Route path="/croquis" element={
              <UserUI>
                <Croquis />
              </UserUI>
            } />

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
