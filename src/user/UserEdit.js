import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import {getRoles, denormalise } from 'jazasoft/utils/utility';
import { updateUser, USER_UPDATE_CANCEL } from './userAction';

import Box from 'grommet/components/Box';
import Form from 'jazasoft/components/GForm';

class UserEdit extends Component {

  constructor () {
    super();
    this._onSubmit = this._onSubmit.bind(this);
    this._onCancel = this._onCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {user: {busy, updating}, form: {opCompleted}} = nextProps;
    if (opCompleted && !busy && !updating) {
      this.props.history.push('/user');
    }
  }
  
  _onSubmit (id) {
    let {form: {formData, collectionData}} = this.props;
    formData = {...formData, id };
    // if (collectionData[0] == undefined || collectionData[0].length == 0) {
    //   const result = confirm('No Access granted to "' + formData.name + '". Are you sure?');
    //   if (!result) return;
    // }
    this.props.dispatch(updateUser(this.props.restClient, formData, collectionData));
  }

  _onCancel () {
    this.props.dispatch({type: USER_UPDATE_CANCEL});
    this.props.history.push('/user');
  }
  
  render() {
    const {user: {busy, users}, tUser: {tUsers}, role: {roles}, buyer: {buyers}, match} = this.props;
    const id = match.params.id;

    const user = users[id];
    const tUser = tUsers[id];
    let userRole;
    console.log(tUsers);
    console.log(tUser);
    let data = [], collectionData = [];
    if (user) {
      userRole = user.authorities.map(e => e.authority);
      data = [
        {
          elements: [
            {
              elementType: 'input',
              label: 'Full Name*',
              name: 'name',
              value: user.name
            },
            {
              elementType: 'input',
              label: 'User Name*',
              name: 'username',
              value: user.username
            },
            {
              elementType: 'input',
              label: 'Email*',
              name: 'email',
              value: user.email
            },
            {
              elementType: 'input',
              label: 'Mobile*',
              name: 'mobile',
              value: user.mobile
            }
          ]
        }
      ];
    
    }
    
    if (tUser && userRole && !userRole.includes('ROLE_ADMIN')) {
      const roleOptions = denormalise(roles).map(ug => ({label: ug.name, value: ug.id}));
      const value = {label: tUser.userGroup.name, value: tUser.userGroup.id};
      data[0].elements.push({
        elementType: 'select',
        label: 'Role*',
        name: 'groupId',
        value: value,
        placeholder: 'Select Role',
        options: roleOptions
      });

      const selectedBuyers = tUser.buyers.map(e => e.name)
      const buyerItems = denormalise(buyers).map(e => {
        let selected = false;
        if (selectedBuyers.includes(e.name)) {
          selected = true;
        }
        return {...e, selected};
      });
      const buyerElements = [
        {
          type: 'label',
          key: 'name',
          name: 'buyer',
        }
      ];
      collectionData = [
        {
          collectionItems: buyerItems,
          elements: buyerElements,
          container: 'list',
          secondaryTitle: 'Add Buyer Permission',
          dialogPlaceholder: 'Select Buyer'
        }
      ]
    }
    
    return (
      <Box>
        <Box alignSelf='center' size='large'>
          <Form title='Update User'
            data={data}
            busy={busy}
            collectionData={collectionData}
            width='large'
            submitControl={true}
            onSubmit={this._onSubmit.bind(this, id)}
            onCancel={this._onCancel}
          /> 
        </Box>
      </Box>
    );
  }
}

const select = (store) => ({user: store.user, tUser: store.tUser, form: store.form, role: store.role, buyer: store.buyer});

export default withRouter(connect(select)(UserEdit));