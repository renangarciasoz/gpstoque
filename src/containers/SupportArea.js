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
                        route: '/application/support-area/request',
                        label: 'Solicitar Uniforme',
                        icon: 'fas fa-folder-open'
                    },
                    {
                        route: '/application/support-area/give-back',
                        label: 'Devolver Uniforme',
                        icon: 'fas fa-folder-open'
                    },
                    {
                        route: '/application/support-area/recycling',
                        label: 'Reciclagem',
                        icon: 'fas fa-folder-open'
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
                    <div className="content"></div>
                </div>
            </div>
        );
    };
};

export default SupportArea;