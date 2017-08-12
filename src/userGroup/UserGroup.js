import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import PageHeader from 'jazasoft/lib/components/PageHeader';
import Table from 'jazasoft/components/GTable';

class UserGroup extends Component {

  constructor () {
    super();
    this._onSearch = this._onSearch.bind(this);
    this._onSearch = this._onSearch.bind(this);
  }

  _onSearch () {
    console.log('onSearch');
  }


  render() {
    const { userGroups } = this.props.group;

    const headers = ['name'];

    let data = [];
    for (let key in userGroups) {
      if ({}.hasOwnProperty.call(userGroups, key)) {
        data.push({...userGroups[key]});
      }
    }

    return (
      <Box>
        <PageHeader title='User Group' 
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

const select = (store) => ({group: store.group});

export default withRouter(connect(select)(UserGroup));