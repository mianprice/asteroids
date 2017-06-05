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

// Handle APOD loading
const set_apod = (payload, day_change) => {
    if (payload.url.includes('youtube')) {
        // Request prior day's APOD if current link is a video
        get_apod(day_change);
    } else {
        // Send the request info to the component to be rendered
        return {
            type: 'set-apod',
            payload
        }
    }
}

// Handle request errors
const req_error = (err) => {
    // Handle errors
    return {
        type: 'req-error',
        err
    };
}

// Handle APOD requests
export const get_apod = (day = 0) => {
    // Use moment to get correctly parsed date
    let request_date = moment().subtract(day, 'days');
    let date_string = request_date.format('YYYY-MM-DD');

    // Request APOD information
    let asyncAction = function(dispatch) {
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: `https://api.nasa.gov/planetary/apod?hd=true&date=${date_string}&api_key=${API_KEY}`
        })
        .then((data) => {
            dispatch(set_apod(data, day + 1));
        })
        .catch((err) => {
            dispatch(req_error(err));
        });
    };
    return asyncAction;
}

export const toggle_background_info = () => {
    return {
        type: 'toggle-background-info'
    };
}

const display_asteroids = (payload) => {
    return {
        type: 'display-asteroids',
        payload
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
            dispatch(req_error(err));
        });
    }
    return asyncAction;
}
