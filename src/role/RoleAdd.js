import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { addRole, ROLE_ADD_CANCEL } from './roleAction';

import Box from 'grommet/components/Box';
import Form from 'jazasoft/components/GForm';

class RoleAdd extends Component {

  constructor () {
    super();

    this._addRole = this._addRole.bind(this);
    this._onCancel = this._onCancel.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    const {role: {busy, adding}, form: {toggleForm}} = nextProps;
    if (this.props.form.toggleForm == toggleForm && !busy && !adding) {
      this.setState({role: {}});
      this.props.history.push('/role');
    }
  }
  
  _addRole () {
    const { formData } = this.props.form;
    if (formData.permissions == undefined || formData.permissions.length == 0) {
      const result = confirm('No Permission granted to "' + formData.name + '". Are you sure?');
      if (!result) return;
    }
    this.props.dispatch(addRole(this.props.restClient, formData));
  }

  _onCancel () {
    this.props.dispatch({type: ROLE_ADD_CANCEL});
    this.props.history.push('/role');
  }

  render() {
    const { role: {busy, resources}} = this.props;

    const data = [
      {
        elements: [
          {
            elementType: 'input',
            label: 'Role Name*',
            name: 'name'
          },
          {
            elementType: 'input',
            label: 'Description',
            name: 'description'
          }
        ]
      }
    ];

    const elements = [
      {
        type: 'label',
        name: 'permission',
        width: 'medium'
      },
      {
        type: 'checkbox',
        label: 'Read Only',
        name: 'readOnly',
        value: true,
        width: 'medium'
      }
    ];

    return (
      <Box>
        <Form title='Add Role'
          width='large'
          data={data}
          busy={busy}
          secondaryTitle='Add Permissions'
          elements={elements}
          collectionKey='permissions'
          collectionItems={resources}
          submitControl={true}
          onSubmit={this._addRole}
          onCancel={this._onCancel}
        />
      </Box>
    );
  }
}

const select = (store) => {
  return {role: store.role, err: store.err, form: store.form};
};

export default withRouter(connect(select)(RoleAdd));