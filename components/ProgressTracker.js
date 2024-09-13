"use client";
import React, { useState, useEffect } from "react";
const stepsData = [
  {
    stepNumber: 1,
    status: "Finished : Application",
    description: "Submit your initial application.",
    bgColor: "bg-primary",
    textColor: "text-white",
  },
  {
    stepNumber: 2,
    status: "Finished : Interview",
    description: "Attend your scheduled interview.",
    bgColor: "bg-primary",
    textColor: "text-white",
  },
  {
    stepNumber: 3,
    status: "In Progress : Evaluation",
    description: "Your profile will be evaluated.",
    bgColor: "bg-info",
    textColor: "text-white",
    border: "border",
  },
  {
    stepNumber: 4,
    status: "Pending : Result",
    description: "Await your recruitment outcome.",
    bgColor: "bg-light",
    textColor: "text-secondary",
    border: "border",
  },
];

// Component for each step
const Step = ({ step, isVertical }) => (
  <div
    className={`ms-3 d-flex ${
      isVertical ? "flex-row" : "flex-column"
    } align-items-center position-relative flex-grow-1 mb-4 mb-md-0`}
  >
    {/* Circle */}
    <div
      className={` rounded-circle ${step.bgColor} ${
        step.textColor
      } p-2 d-flex align-items-center justify-content-center ${
        step.border || ""
      }`}
      style={{ width: "40px", height: "40px" }}
    >
      <span>{step.stepNumber}</span>
    </div>

    {/* Text next to the circle in vertical layout */}
    <div className={`pt-2 ${isVertical ? "ms-3" : ""} ${isVertical ? "text-start" : "text-center"}`}>
      <div>
        <b>{step.status}</b>
      </div>
      <small className="text-muted">{step.description}</small>
    </div>

    {/* Line to the next step, hidden on small screens */}
    {step.stepNumber < stepsData.length && (
      <div
        className="w-100 position-absolute d-none d-md-block"
        style={{
          top: "50%",
          left: "50%",
          height: "2px",
          backgroundColor: step.stepNumber < 3 ? "#007bff" : "#6c757d",
          zIndex: "-1",
        }}
      ></div>
    )}
  </div>
);

const ProgressSteps = () => {
  // State to manage whether the layout is vertical
  const [isVertical, setIsVertical] = useState(window.innerWidth < 768);

  // Effect to update the state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth < 768);
    };

    // Add the event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Determine the top style based on layout
  const topStyle = isVertical ? "10px" : "0px";

  return (
    <div
      className={`d-flex ${
        isVertical
          ? "flex-column align-items-start"
          : "flex-row align-items-center"
      } justify-content-between my-4 position-relative progress-steps`}
      style={{ top: topStyle }}
    >
      {stepsData.map((step, index) => (
        <Step key={index} step={step} isVertical={isVertical} />
      ))}
    </div>
  );
};

export default ProgressSteps;
