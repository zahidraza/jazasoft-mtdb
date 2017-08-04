import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Box from 'grommet/components/Box';
import PageHeader from 'jazasoft/lib/components/PageHeader';

class User extends Component {

  constructor () {
    super();
    this._onSearch = this._onSearch.bind(this);
    this._onSearch = this._onSearch.bind(this);
  }

  _onSearch () {
    console.log('onSearch');
  }

  render() {
    return (
      <Box>
        <PageHeader title='User' 
          searchControl={true}
          onSearch={this._onSearch}
          addControl={true}
          filterControl={true}
          helpControl={true}
        />
      </Box>
    );
  }
}

export default withRouter(User);