import React, {Component} from 'react';
import Search from './Search';
import Map from './Map';
import CurrentPlace from './CurrentPlace';
import Placemarks from './Placemarks';

import './style.less';

class App extends Component {
    state = {
        favorites: this.setFavorites(),
        currentPlace: 'Paris, France',
        coords: {
            lat: 48.856614,
            lng: 2.3522219000000177
        }
    };

    setFavorites() {
        let favorites = [];
        if (window.localStorage.favorites) favorites = JSON.parse(window.localStorage.favorites);

        return favorites;
    }

    setLocation = (place, coords) => {
        this.setState({
            currentPlace: place,
            coords
        });

        this.props.onLocationChange(coords.lat, coords.lng, place);
    };

    toggleFavorite = (place) => {
        const {coords} = this.state;

        if (this.isFavorite(place))
            this.removeFavorite(place);
        else
            this.addFavorite(place, coords);
    };

    removeFavorite = (place) => {
        const favorites = this.state.favorites;
        let index = -1;

        for (let i = 0; i < favorites.length; i = i + 1) {
            if (favorites[i].place === place) {
                index = i;
                break;
            }
        }

        if (index !== -1) {
            favorites.splice(index, 1);

            this.setState({
                favorites
            });

            console.log('Remove', favorites);
            window.localStorage.favorites = JSON.stringify(favorites);
        }
    };

    addFavorite(place, coords) {
        const favorites = this.state.favorites;

        favorites.push({
            place,
            coords,
            timestamp: Date.now()
        });

        console.log('Set state', favorites);
        this.setState({
            favorites
        });

        console.log('Add favorite', favorites);
        window.localStorage.favorites = JSON.stringify(favorites);
    }

    isFavorite(place) {
        const favorites = this.state.favorites;

        for (let i = 0; i < favorites.length; i += 1)
            if (favorites[i].place === place) return true;

        return false;
    }

    render() {
        const {currentPlace, coords, favorites} = this.state;
        const {lat, lng} = coords;
        const isFavorite = this.isFavorite(currentPlace);

        return (
            <div id="geosuggest" className="App">
                <h1 style={{textAlign: 'center', paddingBottom: '24px'}} className="heading">Choose your location</h1>
                <Search fixtures={this.props.fixtures} onSuggest={this.setLocation} />
                <Map lat={lat} lng={lng} />
                <CurrentPlace
                  currentPlace={currentPlace}
                  coords={coords}
                  onFavoriteToggle={this.toggleFavorite}
                  favorite={isFavorite}
                />
                <Placemarks favorites={favorites} activePlace={currentPlace} onClick={this.setLocation} />
            </div>
        );
    }
}

export default App;
