import React from "react";
import PostStatus from "./PostUpdate";
export const HomeComponent = ({ currentUser }) => {
  return (
    <div className="home-component">
      <PostStatus currentUser={currentUser} />
    </div>
  );
};
