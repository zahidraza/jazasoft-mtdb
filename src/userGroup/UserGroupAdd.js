import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { addUserGroup, USER_GROUP_ADD_CANCEL } from './userGroupAction';

import AddIcon from 'grommet/components/icons/base/Add';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import Form from 'grommet/components/Form';
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
    this._onRemove = this._onRemove.bind(this);
    this._toggleDailog = this._toggleDailog.bind(this);
    this._submitDailog = this._submitDailog.bind(this);
    this._onSelectChange = this._onSelectChange.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._renderActivity = this._renderActivity.bind(this);

    this.state = {
      dialogActive: false,
      userGroup: {},
      activity: {
        value: 'Select Activity',
        items: [],
        selectedItems: [],
        items: []
      },
      actions: [
        { label: 'Cancel', onClick: this._toggleDailog },
        { label: 'Submit', onClick: this._submitDailog }
      ]
    };
  }

  componentDidMount() {
    let { activity } = this.state;
    const { activityNames } = this.props.activityName;
    let activities = [];
    for (let key in activityNames) {
      if (Object.prototype.hasOwnProperty.call(activityNames, key)) {
        activities.push(activityNames[key].name);
      }
    }
    activity.items = activities
    this.setState({activity});
  }
  

  componentWillReceiveProps(nextProps) {
    const {busy, adding} = nextProps.group;
    if (!busy && !adding) {
      this.setState({userGroup: {}});
      this.props.history.push('/group');
    }
  }
  
  _addUserGroup () {
    let {activity , userGroup} = this.state;
    if (activity.selectedItems.length == 0) {
      const result = confirm('No Activity access granted to "' + userGroup.name + '". Are you sure?');
      if (!result) return;
    }
    userGroup.activities = activity.selectedItems.map(a => a.name);
    this.props.dispatch(addUserGroup(this.props.restClient, userGroup));
  }

  _onRemove (index,event) {
    let {activity} = this.state;
    let rItem = activity.selectedItems[index];
    activity.selectedItems = activity.selectedItems.filter(s => s.name != rItem.name);
    activity.items.push(rItem.name);
    this.setState({activity});
  }

  _toggleDailog () {
    this.setState({dialogActive: !this.state.dialogActive});
  }

  _submitDailog (params) {
    let { activity } = this.state;
    const { activityNames } = this.props.activityName;
    let activities = [];
    for (let key in activityNames) {
      if (Object.prototype.hasOwnProperty.call(activityNames, key)) {
        activities.push(activityNames[key]);
      }
    }

    if (! activity.value.includes('Select')) {   
      activity.items = activity.items.filter(s => s != activity.value);
      activity.selectedItems = activities.filter(s => !activity.items.includes(s.name));
    }

    activity.value = 'Select Activity';
    this.setState({activity, dialogActive: false});
  }

  _onSelectChange (event) {
    console.log('_onSelectChange');
    let {activity} = this.state;
    activity.value = event.value;
    this.setState({activity});
  }

  _onChange (event) {
    let userGroup = this.state.userGroup;
    userGroup[event.target.getAttribute('name')] = event.target.value;
    this.setState({userGroup: userGroup});
  }

  _onCancel () {
    this.props.dispatch({type: USER_GROUP_ADD_CANCEL});
    this.props.history.push('/group');
  }

  _renderActivity () {
    const {activity} = this.state;
    let selected = activity.selectedItems;

    const selectedFields = selected.map((s, index) => {
      return (
        <div key={index}>
          <Box direction='row' justify='between'>
            <Box alignSelf='center'>{s.name}</Box>
            <Box><Button icon={<FormTrashIcon />} onClick={this._onRemove.bind(this, index)}/> </Box>
          </Box>
        </div>
      );
    });

    return (
      <fieldset >
        <Box direction='row' justify='between'>
          <Box alignSelf='center'><Heading strong={true} tag='h3' >User Group Activity Access</Heading></Box>
          <Button icon={<AddIcon />} onClick={this._toggleDailog}/>
        </Box>

        {selectedFields}
      </fieldset>
    );
  }


  render() {
    const { userGroup, activity} = this.state;
    const { group: {busy, resources}, err: {error} } = this.props;
    let _onAdd, _onCancel;
    if (!busy) {
      _onAdd = this._addUserGroup;
      _onCancel = this._onCancel;
    }

    const activityItems = this._renderActivity();

    return (
      <Box>
        <Box alignSelf='center'>

          <Form >
            <FormHeader title='Add User Group' busy={busy} /> 
            <FormFields>
              <fieldset>
                <FormField label='UserGroup Name*' error={error.name}>
                  <input type='text' name='name' value={userGroup.name == undefined ? '' : userGroup.name} onChange={this._onChange} />
                </FormField>
              </fieldset>
              
              {activityItems}

            </FormFields>
            <Footer pad={{'vertical': 'medium'}} justify='between' >
              <Button label='Add' primary={true} onClick={_onAdd} />
              <Button label='Cancel'  onClick={_onCancel} />
            </Footer>
          </Form>
          <div>
          <Dialog
            title='Add UserGroup Activity'
            active={this.state.dialogActive}
            onCancel={this._toggleDailog}
            onSubmit={this._submitDailog}
          >
   
            <Select inline={false}  multiple={false} options={activity.items} 
                  value={activity.value} onChange={this._onSelectChange} />
            
          </Dialog>
          </div>

        </Box>
      </Box>
    );
  }
}

const select = (store) => {
  return {group: store.group, activityName: store.activityName, err: store.err};
};

export default withRouter(connect(select)(UserGroupAdd));