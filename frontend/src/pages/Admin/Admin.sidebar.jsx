import { Link } from "react-router-dom";

function Admin_sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5   ">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul className="space-y-3">
        <li>
          <Link to="/admin/dashbord" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/order" className="block p-2 hover:bg-gray-700 rounded">Orders</Link>
        </li>
        <li>
          <Link to="/admin/catagary" className="block p-2 hover:bg-gray-700 rounded">Categories</Link>
        </li>
        <li>
          <Link to="/admin/product" className="block p-2 hover:bg-gray-700 rounded">Products</Link>
        </li>
        <li>
          <Link to="/admin/report" className="block p-2 hover:bg-gray-700 rounded">Reports</Link>
        </li>
        <li>
          <Link to="/admin/message" className="block p-2 hover:bg-gray-700 rounded">Messages</Link>
        </li>
      </ul>
    </div>
  );
}

export default Admin_sidebar;
