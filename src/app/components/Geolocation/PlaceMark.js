import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import moment from 'moment';
import './style.less';

class Placemark extends Component {
    handleClick = () => {
        const {place, coords} = this.props.favorite;
        this.props.onClick(place, coords);
    };

    render() {
        const {favorite, timestamp} = this.props;
        let placeClassName = 'placemark';
        if (this.props.active) placeClassName += ' active';

        return (
            <ListGroupItem className={placeClassName} onClick={this.handleClick}>
                {favorite.place}
                <span className="createdAt">
                    {moment(timestamp).fromNow()}
                </span>
            </ListGroupItem>
        );
    }
}

export default Placemark;
