import React, { useState, useEffect } from "react";
import "./BlogCard.css";
import readingTime from "reading-time";
import { useNavigate } from "react-router-dom";

export default function BlogCard({ blog }) {
  const [labels, setLabels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLabels();
  }, []);

  function openBlog(title, number) {
    navigate(`/blog/${title}/${number}`);
  }

  function getLabels() {
    setLabels(blog.labels.nodes.filter(v => v.name !== "blog"));
  }

  return (
    <div className="blog-card-div">
      <div className="blog-card-header">
        <div>
          {labels.map(value => (
            <div key={value.id} className="blog-catgeory" style={{ backgroundColor: `#${value.color}` }}>
              {value.name}
            </div>
          ))}
        </div>
        <div>
          <p className="reading-time">{readingTime(blog.body).minutes} Min Read</p>
        </div>
      </div>
      <div>
        <div className="blog-card-title">
          <h2 onClick={() => openBlog(blog.title, blog.number)}>{blog.title}</h2>
        </div>
        <div className="blog-card-description">
          <p>{blog.bodyText}</p>
        </div>
        <div className="blog-card-footer"></div>
      </div>
    </div>
  );
}
