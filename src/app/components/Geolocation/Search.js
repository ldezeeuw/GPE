import React, {Component} from 'react';
import Geosuggest from 'react-geosuggest';

const google = window.google;

class Search extends Component {
    onSuggestSelect = ({label, location}) => {
        this.props.onSuggest(label, location);
        this._geoSuggest.clear();
    }

    render() {
        return (
            <Geosuggest
              ref={el => this._geoSuggest = el}
              placeholder="Enter a place"
              initialValue=""
              fixtures={this.props.fixtures}
              onSuggestSelect={this.onSuggestSelect}
              location={new google.maps.LatLng(-4.05, 39.666667)}
              radius="20"
            />
        );
    }
}

export default Search;
