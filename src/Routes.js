import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Blogs from "./Containers/Blogs/Blogs";
import BlogHome from "./Containers/BlogPost/BlogPost";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blog/:title/:issueNumber" element={<BlogHome />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
