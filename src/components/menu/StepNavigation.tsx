import React from "react";
import { NavigateFunction } from "react-router";

type StepNavigationProps = {
  navigate: NavigateFunction;
  nextButtonText?: string;
  previousButtonText?: string;
};

export const StepNavigation: React.FC<StepNavigationProps> = (props) => (
  <div className="step-navigation">
    <button className="button" type="button" onClick={() => props.navigate(-1)}>
      {props.previousButtonText ?? "Previous"}
    </button>
    <button className="button secondary" type="submit">
      {props.nextButtonText ?? "Next"}
    </button>
  </div>
);
