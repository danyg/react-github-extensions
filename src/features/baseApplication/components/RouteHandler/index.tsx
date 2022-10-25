import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "features/baseApplication/components/Home";
import NotFound from "features/baseApplication/components/NotFound";
import Extensions from "features/extensions/components/Extensions";

export default function RouteHandler() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:owner/:repo" element={<Extensions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
