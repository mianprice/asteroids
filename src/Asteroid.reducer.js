const INITIAL = {
    asteroid_req_info: {},
    neos: [],
    start: "",
    end: ""
};

export default function reducer(state = INITIAL, action) {
    if (action.type === "reset") {
        return Object.assign({}, state, {
            start: "",
            end: ""
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
            asteroid_req_info: action.req_info,
            neos: action.neos
        });
    }
    return state
}
