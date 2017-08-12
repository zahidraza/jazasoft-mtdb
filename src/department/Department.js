import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { denormalise } from 'jazasoft/utils/utility';

import Box from 'grommet/components/Box';
import PageHeader from 'jazasoft/lib/components/PageHeader';
import Table from 'jazasoft/components/GTable';

class Department extends Component {

  constructor () {
    super();
    this._onSearch = this._onSearch.bind(this);
    this._onSearch = this._onSearch.bind(this);
  }

  _onSearch () {
    console.log('onSearch');
  }


  render() {
    const { departments } = this.props.department;

    const headers = ['name'];

    let data = denormalise(departments);

    console.log(data);

    return (
      <Box>
        <PageHeader title='Department' 
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

const select = (store) => ({department: store.department});

export default withRouter(connect(select)(Department));