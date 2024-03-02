import { HashRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from '@nextui-org/react'
import { Ingreso } from "./pages/ingreso";
import { Login } from "./pages/Login";
import { UserUI } from "./UI/user";
import { Checklist } from "./pages/Checklist";
import { FormNewResponsive } from "./pages/FormNewResponsive";
import { ErrorPage } from "./pages/Error";
import { Taller } from "./pages/Taller";
import { Croquis } from "./pages/Croquis";
import { UserConfig } from "./pages/UserConfig";
import { ViewResponsive } from "./pages/ViewResponsive";
//outlets
import { ChecklistPDF } from "./outlets/ChecklistPDF";
//Authenticated
import { AuthProvider } from "./Context/Auth";

function Router() {

  return (
    <>
      <NextUIProvider>
        <HashRouter>
          <AuthProvider>
            <Routes>

              <Route
                path="/login"
                element={
                  <Login />
                } />

              <Route path="/"
                element={
                  <UserUI>
                    <Ingreso />
                  </UserUI>
                } >

                <Route path="document-checklist/:id" element={<ChecklistPDF />} />

              </Route>

              <Route path="checklist/:id/:chasis/:tipo" element={<Checklist />} />

              <Route path="*" element={<ErrorPage />} />

              <Route path="/taller" element={
                <UserUI>
                  <Taller />
                </UserUI>
              }>
              </Route>

              <Route path="responsivas/:idResponsiva" element={<ViewResponsive />} />

              <Route path="taller/nueva_responsiva/:id/:chasis" element={<FormNewResponsive />} />


              <Route path="/croquis" element={
                <UserUI>
                  <Croquis />
                </UserUI>
              } />

            </Routes>
          </AuthProvider>
        </HashRouter>
      </NextUIProvider>
    </>
  )
}

export default Router
