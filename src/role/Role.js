import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import PageHeader from 'jazasoft/lib/components/PageHeader';
import Table from 'jazasoft/components/GTable';

class Role extends Component {

  constructor () {
    super();
    this._onSearch = this._onSearch.bind(this);
    this._onSearch = this._onSearch.bind(this);
  }

  _onSearch () {
    console.log('onSearch');
  }


  render() {
    const { roles } = this.props.role;

    const headers = ['name', 'description'];

    let data = [];
    for (let key in roles) {
      if ({}.hasOwnProperty.call(roles, key)) {
        data.push({...roles[key]});
      }
    }

    return (
      <Box>
        <PageHeader title='Role' 
          addControl={true}
          helpControl={true}
        />

        <Box alignSelf='center' size='large' margin='medium'>
            <Table headers={headers}  data={data} container='list' />
        </Box>
        
      </Box>
    );
  }
}

const select = (store) => ({role: store.role});

export default withRouter(connect(select)(Role));