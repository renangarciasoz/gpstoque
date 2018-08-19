import React from 'react';
import SubMenu from '../../components/SubMenu';
import { BrowserRouter as Router, Route, withRouter, Redirect } from "react-router-dom";
import DevolutionList from "./DevolutionList";
import DevolutionRegister from "./DevolutionRegister";
import RequestList from "./RequestList";
import RequestRegister from "./RequestRegister";

class SupportArea extends React.Component {
    constructor(props) {
        super(props);

        let path = '/application/support-area/';
        
        this.state = {
            menu: {
                title : 'Área de apoio',
                items : [
                    {
                        route: `${path}request-list`,
                        label: 'Solicitações',
                        icon: 'fas fa-folder-open',
                        component: RequestList
                    },
                    {
                        route: `${path}devolution-list`,
                        label: 'Devoluções',
                        icon: 'fas fa-folder-open',
                        component: DevolutionList
                    },
                    {
                        route: `${path}request-register`,
                        label: 'Registrar solicitação',
                        icon: 'fas fa-folder-open',
                        component: RequestRegister
                    },
                    {
                        route: `${path}devolution-register`,
                        label: 'Registrar devolução',
                        icon: 'fas fa-folder-open',
                        component: DevolutionRegister
                    }
                ]
            }
        }
    }

    render() {
        return (
            <div className="support-area">
                <h1>Área de apoio</h1>
                <div className="component-wrapper">
                    <SubMenu menu={this.state.menu}/>
                    <div className="content">
                        {this.state.menu.items.map((itemRoute, key) =>{
                            return <Route path={itemRoute.route} component={itemRoute.component} key={key} />
                        })}
                    </div>
                </div>
            </div>
        );
    };
};

export default SupportArea;