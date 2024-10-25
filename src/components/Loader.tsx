import React from "react";

type LoaderProps = {
  title: string;
  message: string;
};

export const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
      <div className="loader"></div>
    </div>
  );
};
