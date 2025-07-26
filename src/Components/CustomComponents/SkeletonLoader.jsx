import React from "react";
import "./SkeletonLoader.css";

export const SkeletonProductLoader = () => {
  return (
    <div className="skeleton-product-container">
      <div className="skeleton-image skeleton-shimmer"></div>
      <div className="skeleton-details">
        <div className="skeleton-line skeleton-shimmer"></div>
        <div className="skeleton-line skeleton-shimmer"></div>
        <div className="skeleton-line skeleton-shimmer"></div>
        <div className="skeleton-line skeleton-shimmer short"></div>
      </div>
      <div className="skeleton-buttons">
        <div className="skeleton-button skeleton-shimmer"></div>
        <div className="skeleton-button skeleton-shimmer"></div>
      </div>
    </div>
  );
};
