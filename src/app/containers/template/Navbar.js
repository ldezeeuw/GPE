import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Layout, Row, Select,  } from 'antd'

class Navbar extends Component {
    state = {
        selectedKeys: `/${this.props.location.pathname.split('/')[1]}`
    }

    // handleChange = value => {
    //     this.props.history.push(value)
    // }

    render() {
        return (
            <Layout.Header id="navbar">
                <Row type="flex" justify="space-between">
                    TOTO
                </Row>
            </Layout.Header>
        )
    }
}

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
