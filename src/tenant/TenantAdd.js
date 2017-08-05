import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { addTenant, TENANT_ADD_CANCEL } from './tenantAction';

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

class TenantAdd extends Component {

  constructor () {
    super();
    this.state = {
      tenant: {},
      error: {}
    };
    this._addTenant = this._addTenant.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onCancel = this._onCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.tenant.adding) {
      this.setState({tenant: {}});
    }
  }
  

  _addTenant () {
    this.props.dispatch(addTenant(this.props.restClient, this.state.tenant));
  }

  _onChange (event) {
    let tenant = this.state.tenant;
    tenant[event.target.getAttribute('name')] = event.target.value;
    this.setState({tenant: tenant});
  }

  _onCancel () {
    console.log(this.props.history);
    this.props.dispatch({type: TENANT_ADD_CANCEL});
    this.props.history.goBack();
  }


  render() {
    const { tenant, error } = this.state;
    const { busy, adding } = this.props.tenant;
    let _onAdd, _onCancel;
    if (!busy) {
      _onAdd = this._addTenant;
      _onCancel = this._onCancel;
    }

    return (
      <Box>
        <Box alignSelf='center'>
          <Form >
            <FormHeader title='Add Tenant' busy={busy} /> 
            <FormFields>
              <FormField label='Tenant Name' error={error.name}>
                <input type='text' name='name' value={tenant.name == undefined ? '' : tenant.name} onChange={this._onChange} />
              </FormField>
              <FormField label='Description' error={error.description}>
                <input type='text' name='description' value={tenant.description == undefined ? '' : tenant.description} onChange={this._onChange} />
              </FormField>
              <FormField label='Address' error={error.address}>
                <input type='email' name='address' value={tenant.address == undefined ? '' : tenant.address} onChange={this._onChange} />
              </FormField>
              <FormField label='Database Name' error={error.dbName}>
                <input type='text' name='dbName' value={tenant.dbName == undefined ? '': tenant.dbName} onChange={this._onChange} />
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
  return {tenant: store.tenant};
};

export default withRouter(connect(select)(TenantAdd));