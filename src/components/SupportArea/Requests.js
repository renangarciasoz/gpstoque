import React from 'react';
import { connect } from 'react-redux';
import { fetchRequests } from '../../actions/fetchRequests';
import ProductContaner from '../ProductContainer';

class Requests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        this.setState({loading: true});

        this.props.fetchRequests().then(
            (res) => this.setState({ loading: false }),
            (err) => this.setState({ loading: false })
        );
    }
    
    render() {
        const { requests, header } = this.props;

        return (
            <ProductContaner product={requests} header={header} loading={this.state.loading}/>
        )
    }
};

function mapStateToProps(state) {
    return {
        requests: state.requests
    }
}

export default connect(mapStateToProps, { fetchRequests })(Requests);