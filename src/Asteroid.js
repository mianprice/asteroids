import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Asteroid.actions';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Asteroid extends React.Component {
    componentDidMount() {
        this.props.get_apod();
        this.props.change_end(moment().format('YYYY-MM-DD'));
        this.props.change_start(moment().subtract(7, 'days').format('YYYY-MM-DD'));
    }
    render() {
        const asteroidStyle = {
            backgroundImage: 'url(' + this.props.asteroid.apod_url + ')',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto 100vh'
        };
        let backgroundInfo = this.props.asteroid.show_background ? (
            <div className="apod_info">
                <div className="apod_title">{this.props.asteroid.apod_title}</div>
                <div className="apod_description">{this.props.asteroid.apod_description}</div>
                <div className="asteroid_req_send" onClick={event => this.props.toggle_background_info()}>Hide Background Info</div>
            </div>
        ) : (
            <div className="background_info_switch_container"><div className="asteroid_req_send" onClick={event => this.props.toggle_background_info()}>Show Background Info</div></div>
        );
        let asteroidList = (this.props.asteroid.asteroids && this.props.asteroid.asteroids.near_earth_objects) ? (
            <div className="asteroid_list">
                {this.props.asteroid.asteroids.near_earth_objects.map(nre => (
                    <div className="nre_section">
                        This is an Asteroid
                    </div>
                ))}
            </div>
        ) : (
            ""
        );
        return (
            <div style={this.props.asteroid.got_apod ? asteroidStyle : {}} className="asteroid">
                <div className={(this.props.asteroid.asteroids && this.props.asteroid.asteroids.near_earth_objects) ? "asteroid_inputs_alternate" : "asteroid_inputs_main"}>
                    <div className="asteroid_input_instructions">
                        Enter a start and end date, then click on the <span className="button_name">Search Asteroids</span> button below to see the asteroids that made their closest approach to Earth between those dates.
                    </div>
                    <div className="asteroid_input_section">
                        <div className="asteroid_input_label">Start Date</div>
                        <DatePicker className="asteroid_date_input" type="text" selected={moment(this.props.asteroid.start)} onChange={(date) => this.props.change_start(date.format('YYYY-MM-DD'))}/>
                    </div>
                    <div className="asteroid_input_section">
                        <div className="asteroid_input_label">End Date</div>
                        <DatePicker className="asteroid_date_input" type="text" selected={moment(this.props.asteroid.end)} onChange={(date) => this.props.change_end(date.format('YYYY-MM-DD'))}/>
                    </div>
                    <div className="asteroid_req_send" onClick={(event) => this.props.get_asteroids(moment(this.props.asteroid.start).format('YYYY-MM-DD'),moment(this.props.asteroid.end).format('YYYY-MM-DD'))}>Search Asteroids</div>
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
