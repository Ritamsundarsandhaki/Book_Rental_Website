import React from 'react';
import { Routes, Route } from "react-router-dom";
import Shopkeeper_sidebar from './Shopkeeper.sidebar';
import Shopkeeper_order from './Shopkeeper.order';
import Shopkeeper_dashbord from './Shopkeeper.dashbord';
import Shopkeeper_product from './Shopkeeper.product';
import Shopkeeper_setting from './Shopkeeper.setting';
import Shopkeeper_withdrow from './Shopkeeper.withdrow';

function Shopkeeper_main() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Shopkeeper_sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 ml-64">
       
        
        <Routes>
        <Route index element={<Shopkeeper_dashbord />} />
          <Route path="/dashbord" element={<Shopkeeper_dashbord/>} />
          <Route path="/order" element={<Shopkeeper_order />} />
          <Route path="/product" element={<Shopkeeper_product />} />
          <Route path="/setting" element={<Shopkeeper_setting />} />
          <Route path="/withdrow" element={<Shopkeeper_withdrow />} />
        </Routes>
      </div>
    </div>
  );
}

export default Shopkeeper_main;
