"use strict"; 

import React, {useContext} from 'react';

class CellForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      const title = `${this.props.dot.i},${this.props.dot.j}`
      return (
        <form onSubmit={this.handleSubmit}>
            <h1>{title}</h1>
           <input type="text" value={this.state.value} onChange={this.handleChange} />
        </form>
      );
    }
  }

export default CellForm; 