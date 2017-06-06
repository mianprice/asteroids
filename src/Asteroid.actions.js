import $ from 'jquery';
import moment from 'moment';
import config from './config'
const API_KEY = config.nasa_key;

export const reset = () => {
    return {
        type: 'reset'
    };
};

// Handle Datepicker events
export const change_start = (val) => {
    return {
        type: 'change-start',
        start: val
    };
};

export const change_end = (val) => {
    return {
        type: 'change-end',
        end: val
    };
};

// Handle request errors
const req_error = (err) => {
    // Handle errors
    return {
        type: 'req-error',
        err
    };
}

const display_asteroids = (payload) => {
    let req_info = payload.links;
    let dates = Object.keys(payload.near_earth_objects);
    let neos = dates.reduce((prev, k) => {
        return prev.concat(payload.near_earth_objects[k]);
    }, []);
    return {
        type: 'display-asteroids',
        req_info,
        neos
    }
}

// Handle Asteroid requests
export const get_asteroids = (start,end) => {
    // Request Asteroid List
    let asyncAction = function(dispatch) {
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${API_KEY}`
        })
        .then(result => {
            dispatch(display_asteroids(result));
        })
        .catch(err => {
            console.log(err);
            dispatch(req_error(err));
        });
    }
    return asyncAction;
}
