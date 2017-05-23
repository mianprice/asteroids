import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Asteroid.actions';

class Asteroid extends React.Component {
    componentDidMount() {
        this.props.get_apod();
    }
    render() {
        const asteroidStyle = {
            backgroundImage: 'url(' + this.props.asteroid.apod_url + ')',
        };
        let backgroundInfo = (
            <div className="apod_info">
                <div className="apod_title">{this.props.asteroid.apod_title}</div>
                <div className="apod_description">{this.props.asteroid.apod_description}</div>
            </div>
        );
        return (
            <div style={this.props.asteroid.got_apod ? asteroidStyle : {}} className="asteroid">
                <div className="asteroid_inputs">
                    <input className="asteroid_date_input" type="text" value={this.props.asteroid.start} onChange={(event) => {this.props.change_start(event.target.value)}}/>
                    <input className="asteroid_date_input" type="text" value={this.props.asteroid.end} onChange={(event) => {this.props.change_end(event.target.value)}}/>
                    <div className="asteroid_req_send" onClick={(event) => {this.props.getAsteroids}}>Search Asteroids</div>
                </div>

            </div>
        );
    }
}

const AsteroidContainer = ReactRedux.connect(
  state => ({ asteroid: state.asteroid }),
  actions
)(Asteroid);

export default AsteroidContainer;
