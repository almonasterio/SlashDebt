
import React, { Component } from 'react';

class SelectField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      const { name, label,inputChange } = this.props;
    return (
      <div>
        <div className="form-field">
          <label for={name}>{label}</label>
          <select id={name} name={name} form={name} onChange={inputChange}>
            {this.props.categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default SelectField;
