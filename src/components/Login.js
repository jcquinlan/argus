import React, { Component } from 'react';

import KeyInput from './KeyInput';
import CompanyInput from './CompanyInput';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            company: '',
            key: '',
            loading: false,
        }

        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handleCompanyKeySubmit = this.handleCompanyKeySubmit.bind(this);
    }

    styles(){
        return {
            marginTop: '20px',
        }
    }

    render() {
        const { loading } = this.state;

        return (
            <div>
                <Paper zDepth={ 1 }>
                    <KeyInput onChange={ this.handleKeyChange }/>
                    <Divider />
                    <CompanyInput onChange={ this.handleCompanyChange }/>
                </Paper>

                <a className={ `button login-button ${ loading ? 'is-loading' : '' }` } onClick={ this.handleCompanyKeySubmit }>Login</a>
            </div>
        );
    }

    componentDidMount(){
        const company = localStorage.getItem('company') || '';
        const key = localStorage.getItem('api_key') || '';
        this.setState({ company, key });
    }

    handleCompanyChange(event) {
        this.setState({ company: event.target.value });
    }

    handleKeyChange(event) {
        this.setState({ key: event.target.value });
    }

    handleCompanyKeySubmit(event) {
        event.preventDefault();
        
        const { key, company } = this.state;
        const { login } = this.props;

        if(key && company){
            login(key, company);
            this.setState({ loading: true });
        }
     
    }
}

export default Login;
