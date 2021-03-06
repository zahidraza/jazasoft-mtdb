import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {getRoles, denormalise} from 'jazasoft/utils/utility';
import { SORT_APPLY } from 'jazasoft/actions/filterActions';

import Box from 'grommet/components/Box';
import PageHeader from 'jazasoft/components/PageHeader';
import Table from 'jazasoft/components/GTable';
import Filter from 'jazasoft/components/Filter';

class User extends Component {

  constructor () {
    super();
    this.state = {
      filterActive: false,
      checked: false,
      data: []
    };
    this._onHelp = this._onHelp.bind(this);
    this._toggleFilter = this._toggleFilter.bind(this);
    this._onClick = this._onClick.bind(this);
    this._loadData = this._loadData.bind(this);
  }

  componentWillMount() {
    this._loadData(this.props.user.users);
  }

  componentWillReceiveProps(nextProps) {
    this._loadData(nextProps.user.users);
  }

  _loadData (users) {
    const data = denormalise(users).map(user => {
      const company = (user.company != undefined) ? user.company.name : '';
      let role = '';
      user.authorities.forEach(a => role += a.authority + ',');
      role = role.substr(0,role.length-1);
      role = role.replace(new RegExp('ROLE_', 'g'), '');
      return {...user, company, role};
    });
    this.setState({data});
  }
  
  _onHelp () {
    this.props.history.push('/faq/user');
  }

  _toggleFilter () {
    this.setState({filterActive: !this.state.filterActive});
  }

  _onClick (action, id) {
    if (action == 'read') {
      this.props.history.push('/user/' + id + '/view');
    } else if (action == 'update') {
      this.props.history.push('/user/' + id + '/edit');
    }
  }

  render() {
    const { user: { users }, tenant: { tenants }, role: {roles}} = this.props;

    let headers = ['name', 'username', 'email', 'role', 'mobile'];

    let filterItems = [];
    if (getRoles().includes('ROLE_MASTER')) {
      headers.push('company');

      let tenantItems = denormalise(tenants).map(t => t.name);
      filterItems.push({
        label: 'Company',
        key: 'company',
        elements: tenantItems
      });
    } else {
      let roleItems = denormalise(roles).map(r => r.name);
      filterItems.push({
        label: 'Role',
        key: 'role',
        elements: roleItems
      });
    }
    const sortOptions = [{label: 'Name', value: 'name', direction: 'asc'}];

    return (
      <Box>
        <PageHeader title='User' 
          searchControl={true}
          onSearch={this._onSearch}
          searchPlaceholder='Search for Name or Username or Email'
          addControl={true}
          filterControl={true}
          onFilter={this._toggleFilter}
          helpControl={true}
          onHelp={this._onHelp}
        />

        <Table scope={['read','update']}
            headers={headers}  
            data={this.state.data}
            onClick={this._onClick}
            searchKeys={['name','username','email']} />

        <Filter
          active={this.state.filterActive}
          onClose={this._toggleFilter}
          filterItems={filterItems}
          sortOptions={sortOptions}/> 
      </Box>
    );
  }
}

const select = (store) => ({user: store.user, tenant: store.tenant, role: store.role});

export default withRouter(connect(select)(User));