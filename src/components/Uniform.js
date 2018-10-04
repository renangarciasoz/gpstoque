import React from 'react';
import SubMenu from '../components/SubMenu';

class SupportArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: {
                title : 'Gerenciamento de uniformes',
                items : [
                    {
                        route: '/application/uniform/list',
                        label: 'Uniformes',
                        icon: 'fas fa-folder-open'
                    },
                    {
                        route: '/application/uniform/insert',
                        label: 'Inserir uniforme',
                        icon: 'fas fa-folder-open'
                    },
                    {
                        route: '/application/uniform/register',
                        label: 'Cadastrar uniforme',
                        icon: 'fas fa-folder-open'
                    },
                    {
                        route: '/application/uniform/type-register',
                        label: 'Cadastrar um tipo (uniforme)',
                        icon: 'fas fa-folder-open'
                    }
                ]
            }
        }
    }

    render() {
        return (
            <div className="support-area">
                <h1>Uniformes</h1>
                <div className="component-wrapper">
                    <SubMenu menu={this.state.menu}/>
                    <div className="content"></div>
                </div>
            </div>
        );
    };
};

export default SupportArea;