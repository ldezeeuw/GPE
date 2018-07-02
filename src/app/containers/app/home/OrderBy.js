import React, {Component} from 'react';
import {Icon} from 'antd';
import './style.less';

export default class OrderBy extends Component {
    state = {
        child: 'down',
        duration: 'down',
        distance: 'down',
        active: ''
    };

    sort = key => {
        this.setState({[key]: this.state[key] === 'down' ? 'up' : 'down', active: key});
        this.props.action(key, this.state[key] === 'down' ? 'up' : 'down');
    };

    render() {
        return (
            <div className="orderByContainer" style={{height: '48px', lineHeight: '48px', paddingLeft: '32px'}}>
                <span style={{marginRight: 8}} className={this.state.active === 'child' ? 'active' : ''} onClick={() => this.sort('child')}>
                    Childrens <Icon style={{paddingLeft: 8, paddingRight: 8}} type={this.state.child} />
                </span>
                <span style={{marginRight: 8}} className={this.state.active === 'distance' ? 'active' : ''} onClick={() => this.sort('distance')}>
                    Distance <Icon style={{paddingLeft: 8, paddingRight: 8}} type={this.state.distance} />
                </span>
                <span style={{marginRight: 8}} className={this.state.active === 'duration' ? 'active' : ''} onClick={() => this.sort('duration')}>
                    Duration <Icon style={{paddingLeft: 8, paddingRight: 8}} type={this.state.duration} />
                </span>
            </div>
        );
    }
}
