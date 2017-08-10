import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { addBuyer, BUYER_ADD_CANCEL } from './buyerAction';

import Box from 'grommet/components/Box';
import Form from 'jazasoft/components/GForm';

class BuyerAdd extends Component {

  constructor () {
    super();
    this._addBuyer = this._addBuyer.bind(this);
    this._onCancel = this._onCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {buyer: {busy, adding}, form: {toggleForm}} = nextProps;
    //If not FORM_CHANGE action and not busy & adding
    if (this.props.form.toggleForm == toggleForm && !busy && !adding) {
      this.setState({buyer: {}});
      this.props.history.push('/buyer');
    }
  }
  
  _addBuyer () {
    this.props.dispatch(addBuyer(this.props.restClient, this.props.form.formData));
  }

  _onCancel () {
    this.props.dispatch({type: BUYER_ADD_CANCEL});
    this.props.history.push('/buyer');
  }


  render() {
    const { buyer: {busy}} = this.props;

    const data = [
      {
        elements: [
          {
            elementType: 'input',
            label: 'Buyer Name*',
            name: 'name'
          }
        ]
      }
    ];

    return (
      <Box>
        <Form title='Add Buyer'
          data={data}
          submitControl={true}
          busy={busy}
          onSubmit={this._addBuyer}
          onCancel={this._onCancel}
          />
      </Box>
    );
  }
}

const select = (store) => {
  return {buyer: store.buyer, form: store.form};
};

export default withRouter(connect(select)(BuyerAdd));