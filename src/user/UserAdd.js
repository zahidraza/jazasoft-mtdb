import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { addUser } from './userAction';
import { CLEAR_ERROR } from 'jazasoft/actions/errActions';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Select from 'grommet/components/Select';
import PageHeader from 'jazasoft/lib/components/PageHeader';
import FormHeader from 'jazasoft/components/FormHeader';

class UserAdd extends Component {

  constructor () {
    super();
    this.state = {
      user: {},
      tenant: 'Select Tenant',
      role: 'Select Role',
      roleOptions: [
        {label: 'Master', value: 'MASTER'},
        {label: 'Admin', value: 'ADMIN'},
      ]
    };
    this._addUser = this._addUser.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onSelectChange = this._onSelectChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {busy, adding} = nextProps.user;
    if (!busy && !adding) {
      this.setState({user: {}});
      this.props.history.push('/users');
    }
  }
  
  _addUser () {
    let { tenant, user, role } = this.state;
    if (typeof tenant === 'string') {
      alert('Select Tenant');
      return;
    }
    if (typeof role === 'string') {
      alert('Select Role');
      return;
    }
    user.companyId = tenant.value;
    user.roles = role.value;
    this.props.dispatch(addUser(this.props.restClient, user));
  }

  _onChange (event) {
    let user = this.state.user;
    user[event.target.getAttribute('name')] = event.target.value;
    this.setState({user: user});
  }

  _onSelectChange (param, event) {
    console.log(param);
    if (param == 'role') {
      this.setState({role: event.value});
    } else if (param == 'tenant') {
      this.setState({tenant: event.value});
    }
  }

  _onCancel () {
    this.props.dispatch({type: CLEAR_ERROR});
    this.props.history.push('/users');
  }


  render() {
    const { user, tenant, role, roleOptions } = this.state;
    const { user: {busy}, err: {error}, tenant: {tenants} } = this.props;
    let _onAdd, _onCancel;
    if (!busy) {
      _onAdd = this._addUser;
      _onCancel = this._onCancel;
    }
    const tenantOptions = Object.keys(tenants).map(key => ({label: tenants[key].name, value: key}));

    return (
      <Box>
        <Box alignSelf='center'>
          <Form >
            <FormHeader title='Add User' busy={busy} />

            <FormFields>

              <fieldset>
                <FormField label='Full Name*' error={error.name}>
                  <input type='text' name='name' value={user.name == undefined ? '' : user.name} onChange={this._onChange} />
                </FormField>
                <FormField label='Username*' error={error.username}>
                  <input type='text' name='username' value={user.username == undefined ? '' : user.username} onChange={this._onChange} />
                </FormField>
                <FormField label='Email*' error={error.email}>
                  <input type='email' name='email' value={user.email == undefined ? '' : user.email} onChange={this._onChange} />
                </FormField>
                <FormField label='Mobile Number*' error={error.mobile}>
                  <input type='text' name='mobile' value={user.mobile == undefined ? '': user.mobile} onChange={this._onChange} />
                </FormField>
              </fieldset>
              <fieldset>
                <FormField label='Tenant'>
                  <Select inline={false}  multiple={false} options={tenantOptions} 
                    value={tenant} onChange={this._onSelectChange.bind(this, 'tenant')} />
                </FormField>
                <FormField label='User Role'>
                  <Select inline={false}  multiple={false} options={roleOptions} 
                    value={role} onChange={this._onSelectChange.bind(this, 'role')} />
                </FormField>
              </fieldset>

            </FormFields>
            
            <Footer pad={{'vertical': 'medium'}} justify='between' >
              <Button label='Add' primary={true}  onClick={_onAdd} />
              <Button label='Cancel'  onClick={_onCancel} />
            </Footer>
          </Form>
        </Box>
      </Box>
    );
  }
}

let select = (store) => {
  return {user: store.users, err: store.err, tenant: store.tenants};
};

export default withRouter(connect(select)(UserAdd));