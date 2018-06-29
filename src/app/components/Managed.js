import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AutoComplete, Input } from 'antd'
import { Api } from 'uptoo-react-utils'

const { Option } = AutoComplete

class Managed extends Component {
    static propTypes = {
        user: PropTypes.string.isRequired,
        onSelect: PropTypes.func.isRequired,
        initialValue: PropTypes.string
    }

    static defaultProps = {
        initialValue: undefined
    }

    state = {
        manager: Api.init({
            data: [],
            url: `/admin/users/${this.props.user}`,
            select: '_managed',
            populate: [{
                path: '_managed',
                select: 'firstName lastName'
            }]
        }),
        groups: Api.init({
            data: [],
            url: '/admin/groups',
            filter: {
                _admins: this.props.user
            }
        }),
        value: undefined,
        filter: ''
    }

    componentDidMount() {
        Api.get(this, 'manager')
        Api.get(this, 'groups')
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.initialValue !== nextProps.initialValue) {
            this.setState({ value: nextProps.initialValue })
        }
    }

    me = [{
        _id: this.props.user,
        name: 'Moi'
    }]

    generateList = (manager, groups) => {
        const managed = manager._managed ? manager._managed.map(person => ({
            _id: person._id,
            name: `${person.firstName} ${person.lastName}`
        })) : []

        const bu = groups.map(group => ({
            _id: group._users.join(','),
            name: group.name
        }))

        return [...this.me, ...bu, ...managed].filter(user => user.name.toLowerCase().indexOf(this.state.filter) !== -1)
    }

    renderPeople = person => (
        <Option key={person._id} value={person._id} label={person.name}>
            {person.name}
        </Option>
    )

    render() {
        const { manager, groups } = this.state

        let value = this.props.user

        if (this.props.initialValue !== undefined) {
            value = this.props.initialValue
        }

        if (this.state.value !== undefined) {
            value = this.state.value
        }

        return (
            manager.loading || groups.loading ?
            <Input
              value="Chargement..."
              onChange={() => (null)}
            /> :
            <AutoComplete
              value={value}
              dataSource={this.generateList(manager.data, groups.data).map(this.renderPeople)}
              onSearch={search => this.setState({ value: search, filter: search })}
              onSelect={select => {
                this.setState({ value: select })
                this.setState({ filter: '' })
                this.props.onSelect(select)
              }}
              placeholder="Filter par personne"
              optionLabelProp="label"
            />
        )
    }
}

export default (Managed)
