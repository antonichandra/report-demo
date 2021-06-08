import React, { Component } from "react";
import AsyncSelect from "./customAsyncSelect/customAsyncSelect";
import PropTypes from "prop-types";
import { Label, FormGroup } from "reactstrap";

class SelectDefaultData extends Component {
  constructor(props) {
    super(props);
    this.loadArguments = this.loadArguments.bind(this);
    this.state = {
      customReload: null,
    };
  }

  async loadArguments(inputValue) {
    const { data } = this.props;

    return new Promise(async resolve => {
      let dataOptions = [];
      dataOptions = dataOptions.concat(data)
      resolve(
        dataOptions.filter(e =>
          (e.label + "").toLowerCase().includes((inputValue + "").toLowerCase())
        )
      );
    });
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      customReload: { data }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (
      // value !== prevProps.value ||
      JSON.stringify(data) !== JSON.stringify(prevProps.data)
      // this.state.keyword !== prevState.keyword
    ) {
      this.setState({
        customReload: { data }
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.value !== this.props.value ||
      JSON.stringify(nextState.customReload) !== JSON.stringify(this.state.customReload) ||
      JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data) ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.error !== this.props.error
    );
  }

  handleChange = (input) => {
    const { name, onChange, keyValue } = this.props;
    onChange({
      name: name,
      value: input.value,
      label: input.label,
      label_string: input.label_string,
      keyValue,
    });
  };

  render() {
    const { value, name, error, label, disabled, isRequired } = this.props;
    const customStyles = {
      control: base => ({
        ...base,
        // height: 50,
        // minHeight: 50
      })
    };
    return (
      <FormGroup>
        <Label for={name}>
          {isRequired && <span className="text-danger">*</span>} {label}
        </Label>
        <AsyncSelect
          customReload={this.state.customReload}
          styles={customStyles}
          isDisabled={disabled}
          cacheOptions
          defaultOptions
          name={name}
          loadArguments={this.loadArguments}
          loadOptions={(inputValue) => this.loadArguments(inputValue)}
          value={value}
          onChange={this.handleChange}
          placeholder={label}
        />
        {this.props.error && <small className="text-danger">{error}</small>}
      </FormGroup>
    );
  }
}

SelectDefaultData.defaultProps = {
  isRequired: false
};

SelectDefaultData.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.object,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  addOptionAll: PropTypes.bool
};

export default SelectDefaultData;
