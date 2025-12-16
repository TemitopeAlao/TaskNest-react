import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoaderComponent from "./components/LoaderComponent";
import PageNotFound from "./pages/Signup";
const Landing = lazy(() => import("./pages/Landing"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MyTask = lazy(() => import("./pages/MyTask"));
const VitalTask = lazy(() => import("./pages/VitalTask"));
const AccountInfo = lazy(() => import("./pages/AccountInfo"));
const Logout = lazy(() => import("./pages/Logout"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoaderComponent />}>
              <Landing />
            </Suspense>
          }
        />

        <Route
          path="login"
          element={
            <Suspense fallback={<LoaderComponent />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="signup"
          element={
            <Suspense fallback={<LoaderComponent />}>
              <Signup />
            </Suspense>
          }
        />

        <Route path="dashboard" element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<LoaderComponent />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="tasks"
            element={
              <Suspense fallback={<LoaderComponent />}>
                <MyTask />
              </Suspense>
            }
          />
          <Route
            path="vitalTask"
            element={
              <Suspense fallback={<LoaderComponent />}>
                <VitalTask />
              </Suspense>
            }
          />
          <Route
            path="accountInfo"
            element={
              <Suspense fallback={<LoaderComponent />}>
                <AccountInfo />
              </Suspense>
            }
          />
          <Route
            path="logout"
            element={
              <Suspense fallback={<LoaderComponent />}>
                <Logout />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
