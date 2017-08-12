import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { addUserGroup, USER_GROUP_ADD_CANCEL } from './userGroupAction';

import AddIcon from 'grommet/components/icons/base/Add';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import Form from 'jazasoft/components/GForm';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import PageHeader from 'jazasoft/components/PageHeader';
import FormHeader from 'jazasoft/components/FormHeader';
import FormTrashIcon from 'grommet/components/icons/base/FormTrash';
import Select from 'grommet/components/Select';

import Dialog from 'jazasoft/components/Dailog';

class UserGroupAdd extends Component {

  constructor () {
    super();
    this._addUserGroup = this._addUserGroup.bind(this);
    this._onCancel = this._onCancel.bind(this);
  }

  

  componentWillReceiveProps(nextProps) {
    const {group: {busy, adding}, form: {toggleForm}} = nextProps;
    if (this.props.form.toggleForm == toggleForm && !busy && !adding) {
      this.props.history.push('/group');
    }
  }
  
  _addUserGroup () {
    let {formData, collectionData} = this.props.form;
    if (collectionData.length == 0) {
      const result = confirm('No Activity access granted to "' + userGroup.name + '". Are you sure?');
      if (!result) return;
    }
    this.props.dispatch(addUserGroup(this.props.restClient, formData, collectionData));
  }

  _onCancel () {
    this.props.dispatch({type: USER_GROUP_ADD_CANCEL});
    this.props.history.push('/group');
  }


  render() {
    const { group: {busy}, activityName: {activityNames} } = this.props;

    const data = [
      {
        elements: [
          {
            elementType: 'input',
            label: 'User Group Name*',
            name: 'name'
          }
        ]
      }
    ];

    let collectionItems = [];
    for (let key in activityNames) {
      if (Object.prototype.hasOwnProperty.call(activityNames, key)) {
        collectionItems.push(activityNames[key].name);
      }
    }

    const elements = [
      {
        type: 'label',
        name: 'activity',
      }
    ];

    const collectionData = [
      {
        collectionItems,
        elements,
        container: 'list',
        secondaryTitle: 'Add Activity Permission',
        dialogPlaceholder: 'Select Activity'
      }
    ];

    return (
      <Box>
        <Form title='Add User Group'
          data={data}
          busy={busy}
          collectionData={collectionData}
          width='large'
          submitControl={true}
          onSubmit={this._addUserGroup}
          onCancel={this._onCancel}
        /> 
      </Box>
    );
  }
}

const select = (store) => {
  return {group: store.group, activityName: store.activityName, form: store.form};
};

export default withRouter(connect(select)(UserGroupAdd));