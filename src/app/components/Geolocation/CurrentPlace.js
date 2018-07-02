import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';
import {Icon} from 'antd';

class CurrentPlace extends Component {
    toggleFavorite = () => {
        this.props.onFavoriteToggle(this.props.currentPlace);
    }

    render() {
        const {currentPlace} = this.props;
        const {lat, lng} = this.props.coords;
        let starClassName = 'star-o';

        if (this.props.favorite)
            starClassName = 'star';

        return (
            <div className="current-place" onClick={this.toggleFavorite}>
                <h3 className="place">{currentPlace}</h3>
                <span onClick={this.toggleFavorite} className="current-coords"></span>
            </div>
        );
    }
}

export default CurrentPlace;
