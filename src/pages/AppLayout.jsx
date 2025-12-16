import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import LoaderComponent from "../components/LoaderComponent";
import SideNav from "../components/SideNav";
import SearchHeader from "../components/SearchHeader";

import "../css/global.css";
import "../css/dashboard.css";
import "../css/toast.css";
import "../css/toggle.css";
import "../css/allTask.css";
import "../css/task.css";
import "../css/accountDashboard.css";

const Dashboard = lazy(() => import("./Dashboard"));
const MyTask = lazy(() => import("./MyTask"));
const VitalTask = lazy(() => import("./VitalTask"));
const AccountInfo = lazy(() => import("./AccountInfo"));

function AppLayout() {
  return (
    <div>
      <SearchHeader />

      <main className="dashboard-main">
        <SideNav />

        <Suspense fallback={<LoaderComponent />}>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="tasks" element={<MyTask />} />
            <Route path="vitalTask" element={<VitalTask />} />
            <Route path="accountInfo" element={<AccountInfo />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default AppLayout;
