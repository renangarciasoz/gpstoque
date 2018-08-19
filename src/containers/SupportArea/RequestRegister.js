import React from 'react';
// import axios from 'axios';

class RequestRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        this.getData();
    }

    getData = () => (
        // axios.get('https://gpstoque-api.herokuapp.com/Uniform')
        // .then(response => console.log(response)),
        console.log('foi')
    );

    render() {
        return (
            <div className="request-register">
                <h3>Registrar solicitação</h3>
                <form>

                </form>
            </div>
        );
    };
};

export default RequestRegister;