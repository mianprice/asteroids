import $ from 'jquery';

export const reset = () => {
    return {
        type: 'reset'
    };
};

export const change_start = (val) => {
    return {
        type: 'change_start',
        start: val
    };
};

export const change_end = (val) => {
    return {
        type: 'change_end',
        end: val
    };
};

export const get_apod = () => {
    let asyncAction = function(dispatch) {
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: 'https://api.nasa.gov/planetary/apod?hd=true&api_key=2I118L1MuSm4DnJz2cgcwA8aCe1YTe6zP1WWhFtO'
        })
        .then((data) => {
            dispatch(set_apod(data));
        })
        .catch((err) => {
            dispatch(req_error(err));
        });
    };
    return asyncAction;
};

const set_apod = (data) => {
    if (data.url.includes('youtube')) {
        get_last_apod();
    } else {
        return {
            type: 'set_apod',
            payload: data
        }
    }
}

const req_error = (err) => {
    return {
        type: 'req_error',
        err
    };
}
