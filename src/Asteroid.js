import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Asteroid.actions';

import nasa_night_image from './nasa-night.jpg'

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Asteroid extends React.Component {
    componentDidMount() {
        this.props.change_end(moment().format('YYYY-MM-DD'));
        this.props.change_start(moment().subtract(7, 'days').format('YYYY-MM-DD'));
    }
    render() {
        const asteroidStyle = {
            backgroundImage: `url(${nasa_night_image})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        };
        let asteroidList = (this.props.asteroid.neos.length > 0) ? (
            <div className="asteroid_list">
                {this.props.asteroid.neos.map(neo => (
                    <div className="neo_section" key={neo.neo_reference_id}>
                        <div className="neo_name">{neo.name}</div>
                        <a className="neo_link" target="_blank" href={neo.nasa_jpl_url}>NASA JPL Link</a>
                        <div className={neo.is_potentially_hazardous_asteroid ? "neo_dangerous danger" : "neo_dangerous no_danger"}>{neo.is_potentially_hazardous_asteroid ? "Dangerous!" : "Not Dangerous"}</div>
                    </div>
                ))}
            </div>
        ) : (
            ""
        );
        return (
            <div style={asteroidStyle} className="asteroid">
                <div className={(this.props.asteroid.neos.length > 0) ? "asteroid_inputs_alternate" : "asteroid_inputs_main"}>
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
                {asteroidList}
            </div>
        );
    }
}

const AsteroidContainer = ReactRedux.connect(
  state => ({ asteroid: state.asteroid }),
  actions
)(Asteroid);

export default AsteroidContainer;
