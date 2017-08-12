import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { denormalise } from 'jazasoft/utils/utility';
import { addActivityName, ACTIVITY_NAME_ADD_CANCEL } from './activityNameAction';

import Box from 'grommet/components/Box';
import Form from 'jazasoft/components/GForm';

class ActivityNameAdd extends Component {

  constructor () {
    super();

    this._addActivityName = this._addActivityName.bind(this);
    this._onCancel = this._onCancel.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    const {activityName: {busy, adding}, form: {toggleForm}} = nextProps;
    if (this.props.form.toggleForm == toggleForm && !busy && !adding) {
      this.props.history.push('/activityName');
    }
  }
  
  _addActivityName () {
    const {formData, collectionData} = this.props.form;
    if (collectionData[0] == undefined || collectionData[0].length == 0) {
      const result = confirm('No Department added for "' + formData.name + '". Are you sure?');
      if (!result) return;
    }
    this.props.dispatch(addActivityName(this.props.restClient, formData, collectionData));
  }

  _onCancel () {
    this.props.dispatch({type: ACTIVITY_NAME_ADD_CANCEL});
    this.props.history.push('/activityName');
  }

  render() {
    const { activityName: {busy}, department: { departments }} = this.props;
    const data = [
      {
        elements: [
          {
            elementType: 'input',
            label: 'Activity Name*',
            name: 'name'
          }
        ]
      }
    ];

    const departmentItems = denormalise(departments);
    const departmentElements = [
      {
        type: 'label',
        name: 'dept',
      }
    ];
    const collectionData = [
      {
        collectionItems: departmentItems,
        elements: departmentElements,
        container: 'list',
        secondaryTitle: 'Add Department',
        dialogPlaceholder: 'Select Department'
      }
    ];

    return (
      <Box>
        <Form title='Add Activity Name'
          data={data}
          busy={busy}
          submitControl={true}
          onSubmit={this._addActivityName}
          onCancel={this._onCancel}
          collectionData={collectionData}
        />
      </Box>
    );
  }
}

const select = (store) => {
  return {activityName: store.activityName, department: store.department, form: store.form};
};

export default withRouter(connect(select)(ActivityNameAdd));