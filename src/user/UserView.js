import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import {denormalise } from 'jazasoft/utils/utility';

import Box from 'grommet/components/Box';
import GObject from 'jazasoft/components/GObject';

class UserView extends Component {

  render() {
    const {user: {users}, tUser: {tUsers}, match} = this.props;
    const id = match.params.id;

    const user = users[id];
    const tUser = tUsers[id];
    let userRole;

    let data = [], collectionData = [];
    if (user) {
      userRole = user.authorities.map(e => e.authority);
      data = [
        {key: 'Full Name', value: user.name},
        {key: 'User Name', value: user.username},
        {key: 'Email', value: user.email},
        {key: 'Mobile', value: user.mobile}
      ];
    }
    if (userRole && userRole.includes('ROLE_ADMIN')) {
      data.push({key: 'Role', value: 'ADMIN'});
    }
 
    if (tUser && userRole && !userRole.includes('ROLE_ADMIN')) {
      data.push({key: 'Role', value: tUser.userGroup.name});
      
      const buyers = tUser.buyers.map(e => e.name);
      const activities = tUser.userGroup.activityNames.map(e => e.name);
      collectionData = [
        { key: 'Buyer Permission:', values: buyers},
        { key: 'Activity Permission:', values: activities}
      ];
    }

    return (
      <Box>
        <GObject width='large'
          data={data}
          collectionData={collectionData}
          backUrl='/user'
          editUrl={'/user/'+id+'/edit'} />
      </Box>
    );
  }
}

const select = (store) => ({user: store.user, tUser: store.tUser});

export default withRouter(connect(select)(UserView));