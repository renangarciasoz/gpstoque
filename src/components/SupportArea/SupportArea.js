import React from 'react';
import SubMenu from '../../components/SubMenu';
import { Route } from 'react-router-dom';
import Devolutions from './Devolutions';
import Requests from './Requests';
import RegisterForm from "../RegisterForm";

class SupportArea extends React.Component {
    constructor(props) {
        super(props);

        let path = '/application/support-area/';
        
        this.state = {
            menu: {
                title : 'Área de apoio',
                items : [
                    {
                        route: `${path}requests`,
                        label: 'Solicitações',
                        header: {
                            title:'Solicitações',
                            searchText: 'Digite algo sobre a solicitação',
                            registerText: 'Registrar uma solicitação',
                            registerLink: 'requests-register',
                        },
                        component: Requests
                    },
                    {
                        route: `${path}devolutions`,
                        label: 'Devoluções',
                        header: {
                            title:'Devoluções',
                            searchText: 'Digite algo sobre a devolução',
                            registerText: 'Registrar uma devolução',
                            registerLink: 'devolutions-register',
                        },
                        component: Devolutions
                    },
                    {
                        route: `${path}requests-register` ,
                        component: RegisterForm
                    },
                    {
                        route: `${path}devolutions-register` ,
                        component: RegisterForm
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
                            return <Route path={itemRoute.route} render={() => <itemRoute.component header={itemRoute.header}/> } key={key} />
                        })}
                    </div>
                </div>
            </div>
        );
    };
};

export default SupportArea;