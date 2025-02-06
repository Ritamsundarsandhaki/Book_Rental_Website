import { Routes, Route, Navigate } from "react-router-dom";
import Admin_order from './Admin.order';
import Admin_dashbord from "./Admin.dashbord";
import Admin_sidebar from "./Admin.sidebar";
import Admin_catagary from "./Admin.catagary";
import Admin_product from "./Admin.product";
import Admin_report from "./Admin.report";
import Admin_message from "./Admin.message";

function Admin_main() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Admin_sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <Routes>
          {/* Redirect "/admin" to "/admin/dashbord" */}
          <Route path="/" element={<Navigate to="dashbord" />} />

          {/* Admin Routes */}
          <Route path="dashbord" element={<Admin_dashbord />} />
          <Route path="order" element={<Admin_order />} />
          <Route path="catagary" element={<Admin_catagary />} />
          <Route path="product" element={<Admin_product />} />
          <Route path="report" element={<Admin_report />} />
          <Route path="message" element={<Admin_message />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin_main;
