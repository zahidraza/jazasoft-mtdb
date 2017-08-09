import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { addActivityName, ACTIVITY_NAME_ADD_CANCEL } from './activityNameAction';

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

class ActivityNameAdd extends Component {

  constructor () {
    super();

    this._addActivityName = this._addActivityName.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onCancel = this._onCancel.bind(this);

    this.state = {
      activityName: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    const {busy, adding} = nextProps.activityName;
    if (!busy && !adding) {
      this.setState({activityName: {}});
      this.props.history.push('/activityName');
    }
  }
  
  _addActivityName () {
    const {activityName} = this.state;
    this.props.dispatch(addActivityName(this.props.restClient, this.state.activityName));
  }

  _onChange (event) {
    let activityName = this.state.activityName;
    activityName[event.target.getAttribute('name')] = event.target.value;
    this.setState({activityName: activityName});
  }

  _onCancel () {
    this.props.dispatch({type: ACTIVITY_NAME_ADD_CANCEL});
    this.props.history.push('/activityName');
  }


  render() {
    const { activityName } = this.state;
    const { activityName: {busy}, err: {error} } = this.props;
    let _onAdd, _onCancel;
    if (!busy) {
      _onAdd = this._addActivityName;
      _onCancel = this._onCancel;
    }

    return (
      <Box>
        <Box alignSelf='center'>

          <Form >
            <FormHeader title='Add Activity Name' busy={busy} /> 
            <FormFields>
              <fieldset>
                <FormField label='ActivityName Name*' error={error.name}>
                  <input type='text' name='name' value={activityName.name == undefined ? '' : activityName.name} onChange={this._onChange} />
                </FormField>
              </fieldset>

            </FormFields>
            <Footer pad={{'vertical': 'medium'}} justify='between' >
              <Button label='Add' primary={true} onClick={_onAdd} />
              <Button label='Cancel'  onClick={_onCancel} />
            </Footer>
          </Form>
        </Box>
      </Box>
    );
  }
}

const select = (store) => {
  return {activityName: store.activityName, err: store.err};
};

export default withRouter(connect(select)(ActivityNameAdd));