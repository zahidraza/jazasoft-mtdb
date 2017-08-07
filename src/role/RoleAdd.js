import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { addRole, ROLE_ADD_CANCEL } from './roleAction';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import PageHeader from 'jazasoft/components/PageHeader';
import FormHeader from 'jazasoft/components/FormHeader';

class RoleAdd extends Component {

  constructor () {
    super();
    this.state = {
      role: {},
      error: {}
    };
    this._addRole = this._addRole.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onCancel = this._onCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {busy, adding} = nextProps.role;
    if (!busy && !adding) {
      this.setState({role: {}});
      this.props.history.push('/roles');
    }
  }
  
  _addRole () {
    this.props.dispatch(addRole(this.props.restClient, this.state.role));
  }

  _onChange (event) {
    let role = this.state.role;
    role[event.target.getAttribute('name')] = event.target.value;
    this.setState({role: role});
  }

  _onCancel () {
    console.log(this.props.history);
    this.props.dispatch({type: ROLE_ADD_CANCEL});
    this.props.history.push('/roles');
  }


  render() {
    const { role} = this.state;
    const { role: {busy}, err: {error} } = this.props;
    let _onAdd, _onCancel;
    if (!busy) {
      _onAdd = this._addRole;
      _onCancel = this._onCancel;
    }

    return (
      <Box>
        <Box alignSelf='center'>
          <Form >
            <FormHeader title='Add Role' busy={busy} /> 
            <FormFields>
              <FormField label='Role Name*' error={error.name}>
                <input type='text' name='name' value={role.name == undefined ? '' : role.name} onChange={this._onChange} />
              </FormField>
              <FormField label='Description' error={error.description}>
                <input type='text' name='description' value={role.description == undefined ? '' : role.description} onChange={this._onChange} />
              </FormField>
            </FormFields>
            <Footer pad={{'vertical': 'medium'}} justify='between' >
              <Button label='Add' primary={true} onClick={_onAdd} />
              <Button label='Cancel'  onClick={_onCancel} />
            </Footer>
          </Form>
        </Box>
      </Box>
    );
  }
}

let select = (store) => {
  return {role: store.roles, err: store.err};
};

export default withRouter(connect(select)(RoleAdd));