import { useContext, useEffect, useState } from "react";
import { Stage, Layer, Transformer } from "react-konva";

// HELPER
import { mappingAllComponent } from "../../helper/functions";

// CONTEXT
import HomeContext from "../HomeContext";
import { renderAllComponents } from "./canvasHelper";
import { width } from "../../helper/constant";

const Canvas = (props: any) => {
  const { stageRef, trRef, trNodes, dataStyle } = useContext(HomeContext);
  const contextData = useContext(HomeContext);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  function reportWindowSize() {
    setInnerHeight(window.innerHeight);
    setInnerWidth(window.innerWidth);
  }

  window.addEventListener('resize', reportWindowSize);

  /*
  To make Transformer select current ref (use trNodes)
  */
  useEffect(() => {
    if (trNodes.length > 0 && trRef) {
      // trRef.current.nodes(trNodes.map(e => { return e.ref }));
      trRef.current.nodes(trNodes.map(e => { return e.ref }));
      trRef.current.getLayer().batchDraw();
      // trRef.current.forceUpdate();
    }
  }, [trNodes, trRef])

  return (
    <>
      <Stage
        x={0}
        y={0}
        width={innerWidth}
        height={innerHeight}
        ref={stageRef}
        style={{
          cursor: "default"
        }}
      >
        {/* Layer For Component */}
        <Layer
          key="component"
          width={width}
        >
          <HomeContext.Provider value={{ ...contextData, stageRef, trRef }}>
            {mappingAllComponent(dataStyle).map((e, idx) => { return renderAllComponents(e) })}
            <Transformer
              ref={trRef}
              rotateEnabled={false}
              boundBoxFunc={(oldBox, newBox) => {
                // limit resize
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
              keepRatio={false}
            />
          </HomeContext.Provider>

        </Layer>
      </Stage>
    </>
  );
};

export default Canvas;
