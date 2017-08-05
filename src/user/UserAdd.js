import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { addUser } from './userAction';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import PageHeader from 'jazasoft/lib/components/PageHeader';

class UserAdd extends Component {

  constructor () {
    super();
    this.state = {
      user: {},
      error: {}
    };
    this._addUser = this._addUser.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onCancel = this._onCancel.bind(this);
  }

  _addUser () {
    this.props.dispatch(addUser(this.props.restClient, this.state.user));
  }

  _onChange (event) {
    let user = this.state.user;
    user[event.target.getAttribute('name')] = event.target.value;
    this.setState({user: user});
  }

  _onCancel () {
    console.log(this.props.history);
    this.props.history.goBack();
  }


  render() {
    const { user, error } = this.state;

    return (
      <Box>
        <Box alignSelf='center'>
          <Form >
            <Header>
              <Heading tag='h3' strong={true}>Add User</Heading>
            </Header> 
            <FormFields>
              <FormField label='Full Name' error={error.name}>
                <input type='text' name='name' value={user.name == undefined ? '' : user.name} onChange={this._onChange} />
              </FormField>
              <FormField label='Username' error={error.username}>
                <input type='text' name='username' value={user.username == undefined ? '' : user.username} onChange={this._onChange} />
              </FormField>
              <FormField label='Email' error={error.email}>
                <input type='email' name='email' value={user.email == undefined ? '' : user.email} onChange={this._onChange} />
              </FormField>
              <FormField label='Mobile Number' error={error.mobile}>
                <input type='text' name='mobile' value={user.mobile == undefined ? '': user.mobile} onChange={this._onChange} />
              </FormField>
            </FormFields>
            <Footer pad={{'vertical': 'medium'}} justify='between' >
              <Button label='Add' primary={true}  onClick={this._addUser} />
              <Button label='Cancel'  onClick={this._onCancel} />
            </Footer>
          </Form>
        </Box>
      </Box>
    );
  }
}

let select = (store) => {
  return {user: store.user};
};

export default withRouter(connect(select)(UserAdd));