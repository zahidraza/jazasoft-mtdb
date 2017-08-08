import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import PageHeader from 'jazasoft/lib/components/PageHeader';
import Button from 'grommet/components/Button';

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
    return (
      <Box>
        <PageHeader title='Role' 
          addControl={true}
          helpControl={true}
        />

        <Box>
          
        </Box>
        
      </Box>
    );
  }
}

const select = (store) => ({role: store.roles});

export default withRouter(connect(select)(Role));