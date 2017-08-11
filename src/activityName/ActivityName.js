import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import PageHeader from 'jazasoft/lib/components/PageHeader';
import Table from 'jazasoft/components/GTable';

class ActivityName extends Component {

  constructor () {
    super();
    this._onSearch = this._onSearch.bind(this);
    this._onSearch = this._onSearch.bind(this);
  }

  _onSearch () {
    console.log('onSearch');
  }


  render() {
    const { activityNames } = this.props.activityName;

    const headers = ['name'];

    let data = [];
    for (let key in activityNames) {
      if ({}.hasOwnProperty.call(activityNames, key)) {
        data.push({...activityNames[key]});
      }
    }

    return (
      <Box>
        <PageHeader title='ActivityName' 
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

const select = (store) => ({activityName: store.activityName});

export default withRouter(connect(select)(ActivityName));