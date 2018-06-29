/* eslint react/sort-comp: "off" */
import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

export default class Monitoring extends Component {
    static propTypes = {
        defaultValue: PropTypes.string,
        onChange: PropTypes.func,
        listContainerClass: PropTypes.string,
        elementRenderer: PropTypes.func,
        button: PropTypes.element,
        input: PropTypes.element,
        displayLast: PropTypes.bool,
        style: PropTypes.object
    };

    static defaultProps = {
        style: {},
        listContainerClass: 'listContainer',
        displayLast: false,
        defaultValue: '',
        onChange: () => {},
        input: <input />,
        button: <button />,
        elementRenderer: el => <div className="monitoring-element">{el}</div>
    };

    getResults = defaultValue => (
        defaultValue && defaultValue.split('\n').map((val, key) => {
            if (val !== '') return React.cloneElement(this.props.elementRenderer(val), { key: `${val}${key}` })
        })
    )

    state = {
        defaultValue: this.props.defaultValue,
        inputPrefix: `${moment().format('DD/MM/YYYY')}: `,
        inputValue: `${moment().format('DD/MM/YYYY')}: `,
        results: this.getResults(this.props.defaultValue)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultValue !== this.props.defaultValue) {
            this.setState({
                defaultValue: nextProps.defaultValue,
                results: this.getResults(nextProps.defaultValue)
            })
        }
    }

    onChange = e => {
        if (e.target.value.length >= this.state.inputPrefix.length) this.setState({ inputValue: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()

        let value = `${this.state.defaultValue}`

        if (this.state.inputValue.length > this.state.inputPrefix.length) value += `\n${this.state.inputValue}`

        this.setState({
            results: this.getResults(value),
            inputValue: this.state.inputPrefix
        })

        this.props.onChange(value)
    }

    render() {
        return (
            <div className={this.props.listContainerClass} style={this.props.style}>
                <div>{this.props.displayLast && this.state.results ? this.state.results[this.state.results.length - 1] : this.state.results}</div>
                {
                    !this.props.displayLast ?
                    <form onSubmit={this.onSubmit}>
                        {React.cloneElement(this.props.input, { onChange: this.onChange, value: this.state.inputValue })}
                        {React.cloneElement(this.props.button, { onClick: this.onSubmit, children: 'Ajouter' })}
                    </form>
                    :
                        null
                }
            </div>
        )
    }
}
