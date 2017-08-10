import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import PageHeader from 'jazasoft/lib/components/PageHeader';
import Button from 'grommet/components/Button';
import Table from 'jazasoft/components/GTable';

class Buyer extends Component {

  constructor () {
    super();
    this._onSearch = this._onSearch.bind(this);
    this._onSearch = this._onSearch.bind(this);
  }

  _onSearch () {
    console.log('onSearch');
  }


  render() {
    const { buyers } = this.props.buyer;

    const headers = ['name'];

    let data = [];
    for (let key in buyers) {
      if ({}.hasOwnProperty.call(buyers, key)) {
        data.push({...buyers[key]});
      }
    }

    return (
      <Box>
        <PageHeader title='Buyer' 
          addControl={true}
          helpControl={true}
        />

        <Box alignSelf='center' size='medium' margin='medium'>
            <Table headers={headers}  data={data} container='list' />
        </Box>
        
      </Box>
    );
  }
}

const select = (store) => ({buyer: store.buyer});

export default withRouter(connect(select)(Buyer));