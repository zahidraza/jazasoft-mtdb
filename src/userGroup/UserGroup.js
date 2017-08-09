import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import PageHeader from 'jazasoft/lib/components/PageHeader';
import Button from 'grommet/components/Button';
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
    const { userGroups } = this.props.userGroup;

    const headers = ['name'];

    let data = [];
    for (let key in userGroups) {
      if ({}.hasOwnProperty.call(userGroups, key)) {
        data.push({...userGroups[key]});
      }
    }

    return (
      <Box>
        <PageHeader title='UserGroup' 
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

const select = (store) => ({userGroup: store.userGroup});

export default withRouter(connect(select)(UserGroup));