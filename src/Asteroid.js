import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Asteroid.actions';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Asteroid extends React.Component {
    componentDidMount() {
        this.props.get_apod();
        this.props.change_start(moment().format('YYYY-MM-DD'));
        this.props.change_end(moment().format('YYYY-MM-DD'));
    }
    render() {
        const asteroidStyle = {
            backgroundImage: 'url(' + this.props.asteroid.apod_url + ')',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto 100vh'
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
                    <DatePicker className="asteroid_date_input" type="text" selected={moment(this.props.asteroid.start)} onChange={(date) => this.props.change_start(date.format('YYYY-MM-DD'))}/>
                    <DatePicker className="asteroid_date_input" type="text" selected={moment(this.props.asteroid.end)} onChange={(date) => this.props.change_end(date.format('YYYY-MM-DD'))}/>
                    <div className="asteroid_req_send" onClick={(event) => this.props.getAsteroids(this.props.getAsteroids(moment(this.props.asteroid.start),moment(this.props.asteroid.end)))}>Search Asteroids</div>
                </div>
                {backgroundInfo}
            </div>
        );
    }
}

const AsteroidContainer = ReactRedux.connect(
  state => ({ asteroid: state.asteroid }),
  actions
)(Asteroid);

export default AsteroidContainer;
