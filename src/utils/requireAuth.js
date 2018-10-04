import React from 'react';
import { connect } from 'react-redux';
// import { addFlashMessage } from '../actions/flashMessages';
import history from "../routes/history";

export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {       
                // this.props.addFlashMessage({
                //     type: 'error',
                //     text: 'You need to login to access this page'
                // });
                history.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                history.push('/application/');
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        };
    }

    return connect(mapStateToProps, {})(Authenticate);
}