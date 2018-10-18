import React from 'react';
import { connect } from 'react-redux';
import { fetchDevolutions } from '../../actions/fetchDevolutions';
import ProductContaner from '../ProductContainer';

class Devolutions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    
    componentDidMount() {
        this.setState({loading: true});

        this.props.fetchDevolutions().then(
            (res) => this.setState({ loading: false }),
            (err) => this.setState({ loading: false })
        );
    }
    
    render() {
        const { devolutions, header } = this.props;

        return (
            <ProductContaner product={devolutions} header={header} loading={this.state.loading}/>
        )
    }
};

function mapStateToProps(state) {
    return {
        devolutions: state.devolutions
    }
}

export default connect(mapStateToProps, { fetchDevolutions })(Devolutions);