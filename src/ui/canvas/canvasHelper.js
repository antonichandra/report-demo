import { component } from "../../helper/constant";
import VariableComponent from "../components/variables";

function renderAllComponents(e){
  switch (e.component) {
    case component.variables:
      // Buat variables
      return (
        <VariableComponent
          key={`${component.variables}${e.id}`}
          data={e}
        />
      );

    default:
      return null;
  }
}

export {
  renderAllComponents,
}
