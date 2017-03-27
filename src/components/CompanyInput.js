import React from 'react';
import TextField from 'material-ui/TextField';

const CompanyInput = (props) => {
        const company = localStorage.getItem('company') || '';
        return (
            <TextField
                onChange={ props.onChange }
                underlineShow={ false }
                defaultValue={ company }
                hintText="Your Company Name"
                style={{ padding: '10px 20px', width: '100%' }}/>
        );
    }

export default CompanyInput;
