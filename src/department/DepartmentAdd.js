import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { denormalise } from 'jazasoft/utils/utility';
import { addDepartment, DEPARTMENT_ADD_CANCEL } from './departmentAction';

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

class DepartmentAdd extends Component {

  constructor () {
    super();
    this._addDepartment = this._addDepartment.bind(this);
    this._onCancel = this._onCancel.bind(this);
  }

  

  componentWillReceiveProps(nextProps) {
    const {department: {busy, adding}, form: {toggleForm}} = nextProps;
    if (this.props.form.toggleForm == toggleForm && !busy && !adding) {
      this.props.history.push('/department');
    }
  }
  
  _addDepartment () {
    let {formData, collectionData} = this.props.form;
    if (collectionData[0] == undefined || collectionData[0].length == 0) {
      const result = confirm('No Access granted to "' + formData.name + '". Are you sure?');
      if (!result) return;
    }
    this.props.dispatch(addDepartment(this.props.restClient, formData, collectionData));
  }

  _onCancel () {
    this.props.dispatch({type: DEPARTMENT_ADD_CANCEL});
    this.props.history.push('/department');
  }


  render() {
    const { department: {busy, resources}, activityName: {activityNames} } = this.props;

    const data = [
      {
        elements: [
          {
            elementType: 'input',
            label: 'Department Name*',
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

    const activityElements = [
      {
        type: 'label',
        name: 'activity',
      }
    ];
    const activityItems = denormalise(activityNames).map(a => a.name);

    const accessElements = [
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

    const collectionData = [
      {
        collectionItems: resources,
        elements: accessElements,
        container: 'list',
        secondaryTitle: 'Add Access',
        dialogPlaceholder: 'Select Resource'
      },
      {
        collectionItems: activityItems,
        elements: activityElements,
        container: 'list',
        secondaryTitle: 'Add Activity Permission',
        dialogPlaceholder: 'Select Activity'
      },
    ];

    return (
      <Box>
        <Form title='Add Department
        
        '
          data={data}
          busy={busy}
          collectionData={collectionData}
          width='large'
          submitControl={true}
          onSubmit={this._addDepartment}
          onCancel={this._onCancel}
        /> 
      </Box>
    );
  }
}

const select = (store) => {
  return {department: store.department, activityName: store.activityName, form: store.form};
};

export default withRouter(connect(select)(DepartmentAdd));