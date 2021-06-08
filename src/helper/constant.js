//samakan dengan css di home.css
const canvasWidth = (window.innerWidth * 65) / 100;
const canvasHeight = 600;

// General

const width = 600;

const component = {
  variables: "variables",
};
const initialDataStyle = {
  variables: {
    variables1: {
      id: 1,
      order: 1,
      collision: true,
      position: {
        x: 68,
        y: 35
      },
      dimension: {
        width: 486,
        height: 94,
        thickness: 0,
        hasWidth: true,
        hasHeight: true,
        hasThickness: false
      },
      expression: "",
      format: {
        type: "general",
        value: null
      },
      font: {
        name: "Arial",
        size: -3
      },
      fontStyle: {
        color: "000000",
        bold: false,
        italic: false,
        underline: false
      },
      alignment: {
        horizontal: "left",
        vertical: "top"
      },
      color: {
        color: null,
        background: "D0FFFF",
        transparent: false,
        hasColor: true,
        hasBackground: true
      },
      border: {
        borderLeft: true,
        borderRight: true,
        borderTop: true,
        borderBottom: true
      },
      borderStyle: {
        color: "000000",
        size: 1,
        type: "solid",
        dashedLength: 0,
        dashedSpace: 0
      },
      padding: {
        paddingLeft: 2,
        paddingTop: 2,
        paddingRight: 2,
        paddingBottom: 2
      }
    },
    variables4: {
      id: 4,
      order: 5,
      collision: true,
      position: {
        x: 90,
        y: 181
      },
      dimension: {
        width: 300,
        height: 50,
        thickness: 0,
        hasWidth: true,
        hasHeight: true,
        hasThickness: false
      },
      expression: "",
      format: {
        type: "general",
        value: null
      },
      font: {
        name: "Arial",
        size: 1
      },
      fontStyle: {
        color: "000000",
        bold: false,
        italic: false,
        underline: false
      },
      alignment: {
        horizontal: "left",
        vertical: "top"
      },
      color: {
        color: null,
        background: "0FFFFF",
        transparent: false,
        hasColor: true,
        hasBackground: true
      },
      border: {
        borderLeft: true,
        borderRight: true,
        borderTop: true,
        borderBottom: true
      },
      borderStyle: {
        color: "000000",
        size: 1,
        type: "solid",
        dashedLength: 0,
        dashedSpace: 0
      },
      padding: {
        paddingLeft: 2,
        paddingTop: 2,
        paddingRight: 2,
        paddingBottom: 2
      }
    }
  },
};




export {
  canvasWidth,
  canvasHeight,
  width,
  component,
  initialDataStyle,
};
