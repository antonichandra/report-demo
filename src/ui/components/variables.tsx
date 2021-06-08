// @ts-nocheck
import { useCallback, useEffect, useContext, useRef } from "react";
import { Group, Rect, Text } from "react-konva";

// HELPER
import {
  onDragComponent,
  setSelectedComponent,
  getBorders,
  concatFontStyles,
} from "../../helper/functions";
import { component } from "../../helper/constant";

// CONTEXT
import HomeContext from "../HomeContext";

const VariableComponent = (props: any) => {
  const {
    trNodes, setTrNodes,
    dataStyle, setDataStyle,
    selected, setSelected,

  } = useContext(HomeContext);

  const {
    id,
    position,
    dimension,
    expression,
    font,
    fontStyle,
    alignment,
    color,
    border,
    borderStyle,
    padding,
    name
  } = props.data;

  const tempname = "variables" + id;

  const shapeRef = useRef();


  useEffect(() => {
    if (selected.selected === tempname) {

    }
  }, [selected.selected, trNodes, tempname])

  const onClickComponent = useCallback((e) => {
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    // console.log("suk", metaPressed)


    // alert([...trNodes].concat(shapeRef.current).length)

    if (metaPressed) {
      const exist = trNodes.find(e => JSON.stringify(e.ref) === JSON.stringify(shapeRef.current));
      if (exist && trNodes.length > 1) {
        const newTrNodes = [...trNodes].filter(e => JSON.stringify(e.ref) !== JSON.stringify(shapeRef.current));
        setTrNodes(newTrNodes);
        setSelected(newTrNodes[newTrNodes.length - 1].selected)
      }
      else {
        setTrNodes([...trNodes].concat({
          ref: shapeRef.current,
          selected: setSelectedComponent(component.variables, id)
        }));
        setSelected(setSelectedComponent(component.variables, id));
      }
    }
    else {
      setTrNodes([{
        ref: shapeRef.current,
        selected: setSelectedComponent(component.variables, id)
      }]);
      setSelected(setSelectedComponent(component.variables, id));
    }

  }, [trNodes, setTrNodes, setSelected, id]);

  const onDragVariable = useCallback((e) => {
    e = e.target.attrs;
    const { x: xNew, y: yNew } = e;

    const newSelected = setSelectedComponent(component.variables, id);
    setSelected(newSelected);

    const newDataStyle = onDragComponent(dataStyle, component.variables, id, parseInt(xNew), parseInt(yNew));
    setDataStyle(newDataStyle);
  }, [
    dataStyle, setDataStyle,
    setSelected,
    id,
  ]);


  return (
    <>
      <Group
        x={position.x}
        y={position.y}
        offsetX={position.x}
        offsetY={position.y}
        draggable
        onDragEnd={onDragVariable}
        onClick={onClickComponent}
        onTap={onClickComponent}
      >
        <Rect
          name={name}
          ref={shapeRef}
          x={position.x}
          y={position.y}
          width={dimension.width}
          height={dimension.height}
          fill={color.background === null ? color.background : `#${color.background}`}
          onTransformEnd={(e) => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.scaleX(1);
            node.scaleY(1);
            const x = parseInt(node.x());
            const y = parseInt(node.y());
            const width = parseInt(Math.max(5, node.width() * scaleX));
            const height = parseInt(Math.max(5, node.height() * scaleY));
            setDataStyle({
              ...dataStyle,
              variables: {
                ...dataStyle.variables,
                [tempname]: {
                  ...dataStyle.variables[tempname],
                  dimension: {
                    ...dataStyle.variables[tempname].dimension,
                    width: width,
                    height: height
                  },
                  position: {
                    x: x,
                    y: y
                  }
                }
              }
            })
          }}
        />
        <Text
          x={position.x}
          y={position.y}
          offsetY={-padding.paddingTop}
          offsetX={-padding.paddingLeft}
          width={dimension.width - (padding.paddingRight + padding.paddingLeft)}
          height={dimension.height - (padding.paddingBottom + padding.paddingTop)}
          text={expression}
          fontSize={font.size}
          fontFamily={font.name}
          fontStyle={concatFontStyles(fontStyle)}
          textDecoration={fontStyle.underline ? "underline" : ""}
          align={alignment.horizontal}
          verticalAlign={alignment.vertical}
          fill={color.color === null ? color.color : `#${color.color}`}
          wrap="none"
        // wrap="word"
        />
        {getBorders(position, dimension, border, borderStyle)}
        {/* {selected.selected === tempname && (
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
        )} */}
      </Group>
    </>
  );
};

export default VariableComponent;
