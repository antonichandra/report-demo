import { useRef, useState } from "react";

// HELPER
import { initialDataStyle } from "../helper/constant";

// CONTEXT
import HomeContext from "./HomeContext";
import Page from "./canvas/canvas";

// CSS
import "./home.css";

const TestKonva = () => {
  const [dataStyle, setDataStyle] = useState(initialDataStyle);
  const [selected, setSelected] = useState({
    selected: "page",
    selectedType: "general",
  });

  const stageRef = useRef(null);
  const trRef = useRef();
  const [trNodes, setTrNodes] = useState([]);


  return (
    <>
      <HomeContext.Provider
        value={{
          stageRef, trRef,
          trNodes, setTrNodes,
          dataStyle, setDataStyle,
          selected, setSelected,
        }}
      >
          <div>
            <div
              id="page"
              className="pageContainer"
            >
              <Page />
            </div>
          </div>

      </HomeContext.Provider>

    </>

  );
};
export default TestKonva;
