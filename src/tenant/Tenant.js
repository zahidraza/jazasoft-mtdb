import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import PageHeader from 'jazasoft/lib/components/PageHeader';
import Table from 'jazasoft/components/GTable';

class Tenant extends Component {

  constructor () {
    super();
    this._onSearch = this._onSearch.bind(this);
    this._onSearch = this._onSearch.bind(this);
  }

  _onSearch () {
    console.log('onSearch');
  }


  render() {
    const { tenants } = this.props.tenant;

    const headers = [
      {key: 'name', label: 'Tenant'},
      {key: 'dbName', label: 'Database'},
      {key: 'address', label: 'Address'}
    ];

    let data = [];
    for (let key in tenants) {
      if ({}.hasOwnProperty.call(tenants, key)) {
        data.push({...tenants[key]});
      }
    }
    return (
      <Box>
        <PageHeader title='Tenant' 
          addControl={true}
          helpControl={true}
        />

        <Table headers={headers}  data={data} width='xlarge' />
      </Box>
    );
  }
}

const select = (store) => ({tenant: store.tenant});

export default withRouter(connect(select)(Tenant));