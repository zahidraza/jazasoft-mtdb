import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import PageHeader from 'jazasoft/lib/components/PageHeader';
import Button from 'grommet/components/Button';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import TableHeader from 'grommet/components/TableHeader';

import Filter from 'jazasoft/components/Filter';

class User extends Component {

  constructor () {
    super();
    this.state = {
      filterActive: false
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

    const { users } = this.props.user;

    const items = Object.keys(users).map(key => {
      const user = users[key];
      return (
        <TableRow key={key}  >
          <td >{user.name}</td>
          <td >{user.username}</td>
          <td >{user.email}</td>
          <td >{user.mobile}</td>
          {/* <td style={{textAlign: 'right', padding: 0}}>
            <Button icon={<View />} onClick={this._onViewClick.bind(this,index)} />
            <Button icon={<Edit />} onClick={this._onEditClick.bind(this,index)} />
            <Button icon={<Trash />} onClick={this._onRemoveClick.bind(this,index)} />
          </td> */}
        </TableRow>
      );
    });

    const filterItems = [
      {
        label: 'Role',
        elements: [
          {label: 'Role Master', value: 'ROLE_MASTER'}, 
          'ROLE_ADMIN',
          'ROLE_OTHER'
        ]
      },
      {
        label: 'Company',
        inline: false,
        elements: [
          {label: 'Jaza Software', value: 'jaza-soft'},
          {label: 'Laguna Clothing', value: 'laguna-clothing'}
        ]
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
        <Box>
          <Box margin='medium'>
            <Table>
                <TableHeader labels={['Full Name', 'Username', 'Email', 'Mobile']} />
                
                <tbody>{items}</tbody>
            </Table> 
          </Box>
          <Filter
            active={this.state.filterActive}
            onClose={this._toggleFilter}
            filterItems={filterItems}/> 

        </Box>
      </Box>
    );
  }
}

const select = (store) => ({user: store.user});

export default withRouter(connect(select)(User));