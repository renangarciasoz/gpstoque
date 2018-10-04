import React from 'react';
import { connect } from 'react-redux';
import { fetchDevolutions } from '../../actions/fetchDevolutions';
import styled from 'styled-components';
import HeaderComponent from '../HeaderComponent';
import ListItems from '../ListItems';

const DevolutionComponent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

class Devolutions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            searchValue: '',
        }

        this.handleSearch = this.handleSearch.bind(this);
    }
    componentDidMount() {
        this.props.fetchDevolutions();
    }

    handleSearch(value) {
        this.setState({
            searchValue: value
        });
    }
    
    render() {
        const { devolutions } = this.props;

        // Função que retorna o item conforme condições de igualdade do value.
        let filterByValue = (item, value) => {
            let returnItem = false
            
            Object.keys(item).map((propKey) => {
                let prop = item[propKey]

                // Se o item for estiver ativo exibir na tabela.
                if(propKey === "active" && !prop) {
                    return false
                }

                // Não exibir properties que contém "_", pois são criadas pelo mongodb.
                if (propKey.includes("_")){
                    return false
                }

                // Se a property for uma data, formatá-la.
                if(propKey.includes("created") || propKey.includes("updated") ) {
                    var date = new Date(prop);
                    
                    prop = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                }

                // Se a property for um Array de items, procurar o valor dentro dela.
                if(Array.isArray(prop)) {
                    Object.values(prop).map((propArray) => {    
                        if(propArray.name.includes(value)) {
                            return returnItem = item;
                        }

                        return false
                    })
                }

                // Verificar se a property é igual ou se é string e contém o valor nela.
                if(prop === value || (typeof prop === "string" && prop.includes(value))) {
                    return returnItem = item;
                }

                return false
            })

            return returnItem
        }

        let devolutionsFilter = devolutions.map((devolution) => {
            return filterByValue(devolution, this.state.searchValue)
        });

        return (
            <DevolutionComponent>
                <HeaderComponent title="Devoluções" buttonText="Registrar uma devolução" searchText="Digite algo sobre a devolução" action={this.handleSearch} searchValue={this.state.searchValue}/>
                <ListItems items={devolutionsFilter[0] ? devolutionsFilter : false} loading={this.state.loading}/>
            </DevolutionComponent>
        )
    }
};

function mapStateToProps(state) {
    return {
        devolutions: state.devolutions
    }
}

export default connect(mapStateToProps, { fetchDevolutions })(Devolutions);