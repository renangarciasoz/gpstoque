import React from 'react';
import SubMenu from '../components/SubMenu';

class Warehouse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: {
                title : 'Ações do almoxarifado',
                items : [
                    {
                        route: '/application/warehouse/requests',
                        label: 'Solicitações',
                        icon: 'fas fa-folder-open'
                    },
                    {
                        route: '/application/warehouse/insert-uniform',
                        label: 'Inserir novos uniformes',
                        icon: 'fas fa-folder-open'
                    },
                    {
                        route: '/application/warehouse/register-uniform',
                        label: 'Cadastrar uniforme',
                        icon: 'fas fa-folder-open'
                    },
                    {
                        route: '/application/warehouse/consulting-uniform',
                        label: 'Consultar uniformes',
                        icon: 'fas fa-folder-open'
                    },
                    {
                        route: '/application/warehouse/register-client',
                        label: 'Cadastrar cliente',
                        icon: 'fas fa-folder-open'
                    }
                ]
            }
        }
    }

    render () {
        return (
            <div className="warehouse">
                <h1>Almoxarifado</h1>
                <div className="component-wrapper">
                    <SubMenu menu={this.state.menu}/>
                    <div className="content"></div>
                </div>
            </div>
        );
    };
};

export default Warehouse;