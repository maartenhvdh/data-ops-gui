import React from "react";
import { NavigateFunction } from "react-router";

type StepNavigationProps = {
  navigate: NavigateFunction;
};

export const StepNavigation: React.FC<StepNavigationProps> = (props) => (
  <div className="step-navigation">
    <button className="button" onClick={() => props.navigate(-1)}>
      Previous
    </button>
    <button className="button secondary" type="submit">
      Next
    </button>
  </div>
);
