import React, { Component } from 'react'
import * as io from 'socket.io-client'

export default class Socket extends Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.socket = io.connect(this.props.url, { query: `token=${this.props.token}` })

        const onevent = this.socket.onevent

        this.socket.onevent = function (packet) {
            const args = packet.data || []
            packet.data = ['*'].concat(args)
            onevent.call(this, packet)
        }

        this.socket.on('*', (e, data) => {
            if (typeof e !== 'undefined' && typeof data !== 'undefined') { this.props.onMessage(e, data) }
        })
    }

    render() {
        return (
            <div />
        )
    }
}

Socket.propTypes = {
    // url: React.PropTypes.string.isRequired,
    // token: React.PropTypes.string.isRequired,
    // onMessage: React.PropTypes.func.isRequired
}
