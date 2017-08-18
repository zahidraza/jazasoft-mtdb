import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { addUser } from './userAction';
import { CLEAR_ERROR } from 'jazasoft/actions/errActions';
import { getRoles, denormalise } from 'jazasoft/utils/utility';

import Box from 'grommet/components/Box';
import Form from 'jazasoft/components/GForm';

class UserAdd extends Component {

  constructor () {
    super();
    this.state = {
      role: []
    };
    this._addUser = this._addUser.bind(this);
    this._onCancel = this._onCancel.bind(this);
  }

  componentWillMount() {
    this.setState({role: getRoles()});
  }

  componentWillReceiveProps(nextProps) {
    const {user: {busy, adding}, form: {toggleForm}} = nextProps;
    if (this.props.form.toggleForm == toggleForm && !busy && !adding) {
      this.setState({user: {}});
      this.props.history.push('/user');
    }
  }
  
  _addUser () {
    const { role } = this.state;
    let { formData, collectionData } = this.props.form;

    if (role.length == 1 && role.includes('ROLE_ADMIN')) {
      if (formData.groupId == undefined) {
        alert('Select User Group');
        return;
      }

      if (collectionData[0] == undefined || collectionData[0].length == 0) {
        alert('Add Buyer Access');
        return;
      } 
    }

    this.props.dispatch(addUser(this.props.restClient, formData, collectionData));
  }

  _onCancel () {
    this.props.dispatch({type: CLEAR_ERROR});
    this.props.history.push('/user');
  }


  render() {
    const { 
      user: {busy}, 
      tenant: {tenants}, 
      buyer: {buyers},
      role: {roles} 
    } = this.props;
    const { role } = this.state;

    const tenantOptions = denormalise(tenants).map(t => ({label: t.name, value: t.id}));
    const roleOptions = denormalise(roles).map(ug => ({label: ug.name, value: ug.id}));

    //Basic Form Data
    let data = [
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
      }
    ];

    let collectionData = [];

    if (role.length == 1 && role.includes('ROLE_MASTER')) {
      const tenantElement = {
        title: 'Add Tenant',
        elements: [
          {
            elementType: 'select',
            label: 'Tenant*',
            name: 'companyId',
            placeholder: 'Select Tanant',
            options: tenantOptions
          }
        ]
      };
      data.push(tenantElement);
    }

    if (role.length == 1 && role.includes('ROLE_ADMIN')) {
      const groupElement = {
        title: 'Add User Group',
        elements: [
          {
            elementType: 'select',
            label: 'Role*',
            name: 'groupId',
            placeholder: 'Select Role',
            options: roleOptions
          }
        ]
      };

      const buyerItems = denormalise(buyers);
      const buyerElements = [
        {
          type: 'label',
          key: 'name',
          name: 'buyer',
        }
      ];

      const buyerCollection = {
        collectionItems: buyerItems,
        elements: buyerElements,
        container: 'list',
        secondaryTitle: 'Add Buyer Permission',
        dialogPlaceholder: 'Select Buyer'
      };

      collectionData.push(buyerCollection);
      data.push(groupElement);
    }

    return (
      <Box>
        <Box size='large' alignSelf='center'>
          <Form title='Add User'
            data={data}
            busy={busy}
            submitControl={true}
            onSubmit={this._addUser}
            onCancel={this._onCancel}
            collectionData={collectionData}
          />
        </Box>
      </Box>
    );
  }
}

const select = (store) => {
  return {
    form: store.form, 
    user: store.user, 
    tenant: store.tenant, 
    buyer: store.buyer,
    role: store.role
  };
};

export default withRouter(connect(select)(UserAdd));