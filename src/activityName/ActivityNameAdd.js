import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { addActivityName, ACTIVITY_NAME_ADD_CANCEL } from './activityNameAction';

import Box from 'grommet/components/Box';
import Form from 'jazasoft/components/GForm';

import Dialog from 'jazasoft/components/Dailog';

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
    const {formData} = this.props.form;
    this.props.dispatch(addActivityName(this.props.restClient, formData));
  }

  _onCancel () {
    this.props.dispatch({type: ACTIVITY_NAME_ADD_CANCEL});
    this.props.history.push('/activityName');
  }

  render() {
    const { activityName: {busy}} = this.props;
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

    return (
      <Box>
        <Form title='Add Activity Name'
          data={data}
          busy={busy}
          submitControl={true}
          onSubmit={this._addActivityName}
          onCancel={this._onCancel}
        />
      </Box>
    );
  }
}

const select = (store) => {
  return {activityName: store.activityName, form: store.form};
};

export default withRouter(connect(select)(ActivityNameAdd));