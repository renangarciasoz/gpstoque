import React from 'react';
import { connect } from 'react-redux';
import { fetchRequests } from '../../actions/fetchRequests';

class Requests extends React.Component {
    componentDidMount() {
        this.props.fetchRequests();
    }

    render() {
        return (
            <div className="request-list">
                <h3>Lista de solicitações</h3>
                {this.props.requests && this.props.requests.map((request, i) => {
                    return <li key={i}>{request._id}</li>
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        requests: state.requests
    }
}

export default connect(mapStateToProps, { fetchRequests })(Requests);