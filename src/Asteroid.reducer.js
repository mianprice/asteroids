const INITIAL = {
    apod_url: "",
    apod_title: "",
    apod_description: "",
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
    } else if (action.type === "set_apod") {
        return Object.assign({}, state, {
            apod_url: action.payload.url,
            apod_title: action.payload.title,
            apod_description: action.payload.explanation,
            got_apod: true
        });
    } else if (action.type === "change_start") {
        return Object.assign({}, state, {
            start: action.start
        });
    } else if (action.type === "change_end") {
        return Object.assign({}, state, {
            end: action.end
        });
    }
    return state
}
