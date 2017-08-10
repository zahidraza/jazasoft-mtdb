import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { addUser } from './userAction';
import { CLEAR_ERROR } from 'jazasoft/actions/errActions';

import Box from 'grommet/components/Box';
import Form from 'jazasoft/components/GForm';

class UserAdd extends Component {

  constructor () {
    super();
    this.state = {
      roleOptions: [
        {label: 'Master', value: 'MASTER'},
        {label: 'Admin', value: 'ADMIN'},
      ]
    };
    this._addUser = this._addUser.bind(this);
    this._onCancel = this._onCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {user: {busy, adding}, form: {toggleForm}} = nextProps;
    if (this.props.form.toggleForm == toggleForm && !busy && !adding) {
      this.setState({user: {}});
      this.props.history.push('/user');
    }
  }
  
  _addUser () {
    let { formData } = this.props.form;
    if (formData.companyId == undefined) {
      alert('Select Tenant');
      return;
    }
    if (formData.roles == undefined) {
      alert('Select Role');
      return;
    }
    this.props.dispatch(addUser(this.props.restClient, formData));
  }

  _onCancel () {
    this.props.dispatch({type: CLEAR_ERROR});
    this.props.history.push('/user');
  }


  render() {
    const { roleOptions } = this.state;
    const { user: {busy}, tenant: {tenants} } = this.props;

    const tenantOptions = Object.keys(tenants).map(key => ({label: tenants[key].name, value: key}));

    const data = [
      {
        elements: [
          {
            elementType: 'input',
            label: 'Full Name*',
            name: 'name'
          },
          {
            elementType: 'input',
            label: 'Userame*',
            name: 'username'
          },
          {
            elementType: 'input',
            label: 'Email*',
            name: 'email'
          },
          {
            elementType: 'input',
            label: 'Mobile Number*',
            name: 'mobile'
          }
        ]
      },
      {
        elements: [
          {
            elementType: 'select',
            label: 'Tenant*',
            name: 'companyId',
            placeholder: 'Select Tanant',
            options: tenantOptions
          },
          {
            elementType: 'select',
            label: 'Role*',
            name: 'roles',
            placeholder: 'Select Role',
            options: roleOptions
          }
        ]
      }
    ];

    return (
      <Box>
        <Form title='Add User'
          data={data}
          busy={busy}
          submitControl={true}
          onSubmit={this._addUser}
          onCancel={this._onCancel}
        />
      </Box>
    );
  }
}

const select = (store) => {
  return {user: store.user, form: store.form, tenant: store.tenant};
};

export default withRouter(connect(select)(UserAdd));