import React, { useEffect, useState } from "react";
import "./treeView.css"; // Import the CSS file
import "react-bootstrap-typeahead/css/Typeahead.css";
import Steps from "./Steps";

function GherkinQuery({ stepTypeToAdd, stepTypeToRemove, allSteps }) {
  const givenTemplate = <Steps title="Given" steps={allSteps["Given"]}></Steps>;
  const whenTemplate = <Steps title="When" steps={allSteps["When"]}></Steps>;
  const thenTemplate = <Steps title="Then" steps={allSteps["Then"]}></Steps>;
  const [nodeList, setNodeList] = useState([
    givenTemplate,
    whenTemplate,
    thenTemplate,
  ]);

  // Update / Add when a step node is added
  useEffect(() => {
    var newNode = null;
    switch (stepTypeToAdd) {
      case "When":
        newNode = whenTemplate;
        break;
      case "Then":
        newNode = thenTemplate;
        break;
      case "Given":
        break;
      default:
        break;
    }
    setNodeList((currentNodeList) => [...currentNodeList, newNode]);
  }, [stepTypeToAdd]);

  return <>{nodeList.map((gherkinNode, index) => gherkinNode)}</>;
}

export default GherkinQuery;
