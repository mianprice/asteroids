const INITIAL = {
    apod_url: "",
    apod_title: "",
    apod_description: "",
    asteroids: {},
    got_apod: false,
    start: "",
    end: ""
};

export default function reducer(state = INITIAL, action) {
    if (action.type === "reset") {
        return Object.assign({}, state, {
            start: "",
            end: ""
        });
    } else if (action.type === "set-apod") {
        return Object.assign({}, state, {
            apod_url: action.payload.url,
            apod_title: action.payload.title,
            apod_description: action.payload.explanation,
            got_apod: true
        });
    } else if (action.type === "change-start") {
        return Object.assign({}, state, {
            start: action.start
        });
    } else if (action.type === "change-end") {
        return Object.assign({}, state, {
            end: action.end
        });
    } else if (action.type === "display-asteroids") {
        return Object.assign({}, state, {
            asteroids: action.payload
        });
    }
    return state
}
