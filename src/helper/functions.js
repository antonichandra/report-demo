import { Line } from "react-konva";
import { component } from "./constant";



// COMPONENT
function setSelectedComponent(selectedType, id) {
  return {
    selected: selectedType === component.general ? id : selectedType + id,
    selectedType: selectedType,
  }
}
function getBorders(position, dimension, border, borderStyle) {
  return (
    <>
      {border.borderLeft && (
        <Line
          points={[position.x, position.y, position.x, position.y + dimension.height]}
          offsetY={0}
          offsetX={-(borderStyle.size / 2)}
          stroke={`#${borderStyle.color}`}
          strokeWidth={borderStyle.size}
          dash={[borderStyle.dashedLength, borderStyle.dashedSpace]}
        />
      )}
      {border.borderRight && (
        <Line
          points={[position.x + dimension.width - borderStyle.size, position.y, position.x + dimension.width - borderStyle.size, position.y + dimension.height]}
          offsetY={0}
          offsetX={-(borderStyle.size / 2)}
          stroke={`#${borderStyle.color}`}
          strokeWidth={borderStyle.size}
          dash={[borderStyle.dashedLength, borderStyle.dashedSpace]}
        />
      )}
      {border.borderTop && (
        <Line
          points={[position.x, position.y, position.x + dimension.width, position.y]}
          offsetY={-(borderStyle.size / 2)}
          offsetX={0}
          stroke={`#${borderStyle.color}`}
          strokeWidth={borderStyle.size}
          dash={[borderStyle.dashedLength, borderStyle.dashedSpace]}
        />
      )}
      {border.borderBottom && (
        <Line
          points={[position.x, position.y + dimension.height - borderStyle.size, position.x + dimension.width, position.y + dimension.height - borderStyle.size]}
          offsetY={-(borderStyle.size / 2)}
          offsetX={0}
          stroke={`#${borderStyle.color}`}
          strokeWidth={borderStyle.size}
          dash={[borderStyle.dashedLength, borderStyle.dashedSpace]}
        />
      )}
    </>
  )
}
function mappingAllComponent(dataStyle) {
  const arr = [];
  Object.keys(dataStyle).forEach((e, i) => {
    if (e !== component.general && e !== component.item_groups) {
      Object.values(dataStyle[e]).forEach((style, idxLines) => {
        arr.push({
          ...style,
          component: e,
        })
      });
    }
  });
  return arr.sort((a, b) => {
    return Number(a.order) < Number(b.order) ? -1 : 1;
  });
}
function concatFontStyles(fontStyles) {
  return `${fontStyles.bold ? "bold" : ""} ${fontStyles.italic ? "italic" : ""}`
}

// DRAGGING
function onDragComponent(dataStyle, currentElement, id, xNew, yNew, dragPage = false) {
  return {
    ...dataStyle,
    [currentElement]: {
      ...dataStyle[currentElement],
      [dragPage ? `${id}` : `${currentElement}${id}`]: {
        ...dataStyle[currentElement][dragPage ? `${id}` : `${currentElement}${id}`],
        position: {
          x: xNew,
          y: yNew,
        }
      }
    }
  }
}



export {
  mappingAllComponent,
  onDragComponent,
  setSelectedComponent,
  getBorders,
  concatFontStyles,
}
