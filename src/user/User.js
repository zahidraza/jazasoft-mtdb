import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {getRoles, denormalise} from 'jazasoft/utils/utility';

import Box from 'grommet/components/Box';
import PageHeader from 'jazasoft/components/PageHeader';
import Table from 'jazasoft/components/GTable';
import Filter from 'jazasoft/components/Filter';

class User extends Component {

  constructor () {
    super();
    this.state = {
      filterActive: false,
      checked: false
    };
    this._onSearch = this._onSearch.bind(this);
    this._toggleFilter = this._toggleFilter.bind(this);
  }

  _onSearch () {
    console.log('onSearch');
  }

  _toggleFilter () {
    this.setState({filterActive: !this.state.filterActive});
  }

  render() {
    const { user: { users }, tenant: { tenants }, department: {roles}} = this.props;

    let headers = ['name', 'username', 'email', 'role', 'mobile'];

    if (getRoles().includes('ROLE_MASTER')) {
      headers.push('company');
    }

    let data = [];
    for (let key in users) {
      if ({}.hasOwnProperty.call(users, key)) {
        const user = users[key];
        const company = (user.company != undefined) ? user.company.name : '';
        let role = '';
        user.authorities.forEach(a => role += a.authority + ',');
        role = role.substr(0,role.length-1);
        role = role.replace(new RegExp('ROLE_', 'g'), '');
        data.push({...user, company, role});
      }
    }

    let tenantItems = denormalise(tenants).map(t => t.name);

    let roleItems = denormalise(roles).map(r => r.name);

    const filterItems = [
      {
        label: 'company',
        elements: tenantItems
      },
      {
        label: 'department',
        elements: roleItems
      }
    ];

    return (
      <Box>
        <PageHeader title='User' 
          searchControl={true}
          onSearch={this._onSearch}
          addControl={true}
          filterControl={true}
          onFilter={this._toggleFilter}
          helpControl={true}
        />

        <Table width={{width: {min: 'xxlarge', max: 'full'}}}
            headers={headers}  
            data={data} />

        <Filter
          active={this.state.filterActive}
          onClose={this._toggleFilter}
          filterItems={filterItems}/> 
      </Box>
    );
  }
}

const select = (store) => ({user: store.user, tenant: store.tenant, department: store.department});

export default withRouter(connect(select)(User));