import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Input } from 'antd'

const { TextArea } = Input

export default class Autosave extends Component {
    static propTypes = {
        defaultValue: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        wait: PropTypes.number
    }

    static defaultProps = {
        defaultValue: '',
        wait: 500
    }

    state = {
        value: this.props.defaultValue
    }

    componentWillMount() {
        this.timer = null
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultValue !== this.props.defaultValue) {
            this.setState({ value: nextProps.defaultValue })
        }
    }

    handleChange = e => {
        e.persist()

        this.setState({ value: e.target.value })

        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.props.onChange(e.target.value)
            clearTimeout(this.timer)
            this.timer = null
        }, this.props.wait)
    }

    handleBlur = e => {
        if (this.timer) {
            this.props.onChange(e.target.value)
            clearTimeout(this.timer)
            this.timer = null
        }
    }

    render() {
        return (
            <TextArea
              {...this.props}
              value={this.state.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
        )
    }
}
