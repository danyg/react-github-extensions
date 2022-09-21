import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "../Home";
import NotFound from "../NotFound";
import Extensions from "../Extensions";

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
