import React, { Component } from 'react';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/add/operator/debounceTime';

class DebouncedInput extends Component {
  constructor(props){
      super(props);
      const { handleValueChange, debounceTimeLength } = this.props;
      
      this.subject = new Subject();
      this.subscription = this.subject
        .debounceTime(debounceTimeLength)
        .subscribe(
          function (x) {
              handleValueChange(x);
          }
      );
      
      this.localHandleChange = this.localHandleChange.bind(this);
      
    }
  
    localHandleChange(event){
        this.subject.next(Object.assign({}, event));
    }
 
  
    render(){
        const { style, placeholder } = this.props;
        return (<input type="text" style={ style } placeholder={ placeholder } onChange={ this.localHandleChange }/>) 
    }
}

DebouncedInput.defaultProps = {
    debounceTimeLength: 500,
    placeholder: 'Enter Value'
}

DebouncedInput.propTypes = {
  handleValueChange: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string,
  debounceTimeLength: React.PropTypes.number,
}

export default DebouncedInput;