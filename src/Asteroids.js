import React from 'react';
import $ from 'jquery';

export default class Asteroids extends React.Component {
    componentDidMount() {
        this.props.apod_url = getAPOD();
    }
    render() {
        return (
            <div>
                <img src={this.props.apod_url} alt="APOD" />
                <br/>
                <br/>
                <br/>
                Foreground: Enter your date of birth to find out which asteroid you rode here on!
            </div>
        );
    }
};

function getAPOD() {
    $.ajax({
        method: 'GET',
        url: 'https://api.nasa.gov/planetary/apod?api_key=2I118L1MuSm4DnJz2cgcwA8aCe1YTe6zP1WWhFtO',
        contentType: 'json'
    })
    .then((result) => {
        console.log(`Date: ${result.title}`);
        console.log(`Date: ${result.date}`);
        console.log(`Date: ${result.explanation}`);
        return result.url
    })
    .catch((error) => {throw error});
}
