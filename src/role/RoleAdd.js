import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { addRole, ROLE_ADD_CANCEL } from './roleAction';

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

class RoleAdd extends Component {

  constructor () {
    super();

    this._addRole = this._addRole.bind(this);
    this._onRemove = this._onRemove.bind(this);
    this._toggleDailog = this._toggleDailog.bind(this);
    this._submitDailog = this._submitDailog.bind(this);
    this._onSelectChange = this._onSelectChange.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._renderPermission = this._renderPermission.bind(this);

    this.state = {
      dialogActive: false,
      role: {},
      permission: {
        value: 'Select Resource',
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
    let { permission } = this.state;
    const { resources } = this.props.role;

    permission.items = resources.map(r => r.name);
    this.setState({permission});
  }
  

  componentWillReceiveProps(nextProps) {
    const {busy, adding} = nextProps.role;
    if (!busy && !adding) {
      this.setState({role: {}});
      this.props.history.push('/roles');
    }
  }
  
  _addRole () {
    const {permission , role} = this.state;
    if (permission.selectedItems.length == 0) {
      const result = confirm('No Permission granted to "' + role + '". Are you sure?');
      if (!result) return;
    }
    this.props.dispatch(addRole(this.props.restClient, this.state.role, permission.selectedItems));
  }

  _onRemove (index,event) {
    let {permission} = this.state;
    let rItem = permission.selectedItems[index];
    permission.selectedItems = permission.selectedItems.filter(s => s.name != rItem.name);
    permission.items.push(rItem.name);
    this.setState({permission});
  }

  _toggleDailog () {
    this.setState({dialogActive: !this.state.dialogActive});
  }

  _submitDailog (params) {
    let { permission } = this.state;
    const { resources } = this.props.role;

    if (! permission.value.includes('Select')) {   
      permission.items = permission.items.filter(s => s != permission.value);
      permission.selectedItems = resources.filter(s => !permission.items.includes(s.name)).map(s => ({...s, readOnly: true}));
    }

    permission.value = 'Select Resource';
    this.setState({permission, dialogActive: false});
  }

  _onSelectChange (event) {
    console.log('_onSelectChange');
    let {permission} = this.state;
    permission.value = event.value;
    this.setState({permission});
  }

  _onToggleChange (index) {
    let {permission} = this.state;
    permission.selectedItems[index].readOnly = !permission.selectedItems[index].readOnly;
    this.setState({permission});
  }

  _onChange (event) {
    let role = this.state.role;
    role[event.target.getAttribute('name')] = event.target.value;
    this.setState({role: role});
  }

  _onCancel () {
    this.props.dispatch({type: ROLE_ADD_CANCEL});
    this.props.history.push('/roles');
  }

  _renderPermission () {
    const {permission} = this.state;
    let selected = permission.selectedItems;

    const selectedFields = selected.map((s, index) => {
      return (
        <div key={index}>
          <Box direction='row' justify='between'>
            <Box alignSelf='center'>{s.name}</Box>
            <Box><Button icon={<FormTrashIcon />} onClick={this._onRemove.bind(this, index)}/> </Box>
          </Box>
          <FormField >
            <CheckBox label='Read Only' defaultChecked={true} toggle={true} onChange={this._onToggleChange.bind(this, index)}/>
          </FormField>
        </div>
      );
    });

    return (
      <fieldset>
        <Box direction='row' justify='between'>
          <Box alignSelf='center'><Heading strong={true} tag='h3' >Role Permissions</Heading></Box>
          <Button icon={<AddIcon />} onClick={this._toggleDailog}/>
        </Box>

        {selectedFields}
      </fieldset>
    );
  }


  render() {
    const { role, permission} = this.state;
    const { role: {busy, resources}, err: {error} } = this.props;
    let _onAdd, _onCancel;
    if (!busy) {
      _onAdd = this._addRole;
      _onCancel = this._onCancel;
    }

    const permissionItems = this._renderPermission();

    return (
      <Box>
        <Box alignSelf='center'>

          <Form >
            <FormHeader title='Add Role' busy={busy} /> 
            <FormFields>
              <fieldset>
                <FormField label='Role Name*' error={error.name}>
                  <input type='text' name='name' value={role.name == undefined ? '' : role.name} onChange={this._onChange} />
                </FormField>
                <FormField label='Description' error={error.description}>
                  <input type='text' name='description' value={role.description == undefined ? '' : role.description} onChange={this._onChange} />
                </FormField>
              </fieldset>
              
              {permissionItems}

            </FormFields>
            <Footer pad={{'vertical': 'medium'}} justify='between' >
              <Button label='Add' primary={true} onClick={_onAdd} />
              <Button label='Cancel'  onClick={_onCancel} />
            </Footer>
          </Form>
          <div>
          <Dialog
            title='Add Role Permission'
            active={this.state.dialogActive}
            onCancel={this._toggleDailog}
            onSubmit={this._submitDailog}
          >
   
            <Select inline={false}  multiple={false} options={permission.items} 
                  value={permission.value} onChange={this._onSelectChange} />
            
          </Dialog>
          </div>

        </Box>
      </Box>
    );
  }
}

let select = (store) => {
  return {role: store.roles, err: store.err};
};

export default withRouter(connect(select)(RoleAdd));