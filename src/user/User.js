import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {getRoles} from 'jazasoft/utils/utility';

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
    const { user: { users }, tenant: { tenants }, role: { roles } } = this.props;

    let headers = [
      {key: 'name', label: 'Full Name'},
      {key: 'username', label: 'Username'},
      {key: 'email', label: 'Email'},
      {key: 'role', label: 'Role'},
      {key: 'mobile', label: 'Mobile'}
    ];

    if (getRoles().includes('ROLE_MASTER')) {
      headers.push({key: 'company', label: 'Company'})
    }

    let data = [];
    for (let key in users) {
      if ({}.hasOwnProperty.call(users, key)) {
        const user = users[key];
        const company = (user.company != undefined) ? user.company.name : '';
        let role = '';
        user.authorities.forEach(a => role += a.authority + ',');
        role = role.substr(0,role.length-1);
        data.push({...user, company, role});
      }
    }

    let tenantItems = [];
    for (let key in tenants) {
      if ({}.hasOwnProperty.call(tenants, key)) {
        tenantItems.push(tenants[key].name);
      }
    }

    let roleItems = [];
    for (let key in roles) {
      if ({}.hasOwnProperty.call(roles, key)) {
        roleItems.push(roles[key].name);
      }
    }


    const filterItems = [
      {
        label: 'company',
        elements: tenantItems
      },
      {
        label: 'role',
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

        <Box margin='medium'>
          <Table headers={headers}  data={data} />
        </Box>

        <Filter
          active={this.state.filterActive}
          onClose={this._toggleFilter}
          filterItems={filterItems}/> 
      </Box>
    );
  }
}

const select = (store) => ({user: store.user, tenant: store.tenant, role: store.role});

export default withRouter(connect(select)(User));