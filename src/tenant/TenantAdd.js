import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { addTenant, TENANT_ADD_CANCEL } from './tenantAction';

import Box from 'grommet/components/Box';
import Form from 'jazasoft/components/GForm';

class TenantAdd extends Component {

  constructor () {
    super();
    this._addTenant = this._addTenant.bind(this);
    this._onCancel = this._onCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {tenant: {busy, adding}, form: {toggleForm}} = nextProps;
    if (this.props.form.toggleForm == toggleForm && !busy && !adding) {
      this.props.history.push('/tenant');
    }
  }
  
  _addTenant () {
    this.props.dispatch(addTenant(this.props.restClient, this.props.form.formData));
  }

  _onCancel () {
    this.props.dispatch({type: TENANT_ADD_CANCEL});
    this.props.history.push('/tenant');
  }


  render() {
    const { tenant: {busy}} = this.props;

    const data = [
      {
        elements: [
          {
            elementType: 'input',
            label: 'Tenant Name*',
            name: 'name'
          },
          {
            elementType: 'input',
            label: 'Description',
            name: 'description'
          },
          {
            elementType: 'input',
            label: 'Address*',
            name: 'address'
          },
          {
            elementType: 'input',
            label: 'Database Name*',
            name: 'dbName'
          }
        ]
      }
    ];

    return (
      <Box>
        <Form title='Add Tenant'
          data={data}
          busy={busy}
          submitControl={true}
          onSubmit={this._addTenant}
          onCancel={this._onCancel}
        />
      </Box>
    );
  }
}

const select = (store) => {
  return {tenant: store.tenant, form: store.form};
};

export default withRouter(connect(select)(TenantAdd));