import React from 'react';
import styled from 'styled-components';
import HeaderComponent from './HeaderComponent';
import ListItems from './ListItems';


const RequestComponent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

class ProductContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(value) {
        this.setState({
            searchValue: value
        });
    }
    
    render() {
        const { product, header } = this.props;

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
                        if(propArray.name.toLowerCase().includes(value)) {
                            return returnItem = item;
                        }

                        return false
                    })
                }

                // Verificar se a property é igual ou se é string e contém o valor nela.
                if(prop === value || (typeof prop === "string" && prop.toLowerCase().includes(value))) {
                    return returnItem = item;
                }

                return false
            })

            return returnItem
        }

        let productFilter = product && product.map((request) => {
            return filterByValue(request, this.state.searchValue.toLowerCase())
        });

        return (
            <RequestComponent>
                <HeaderComponent title={header.title} buttonText={header.registerText} searchText={header.searchText} action={this.handleSearch} searchValue={this.state.searchValue} link={header.registerLink}/>
                <ListItems items={productFilter.sort()[0] ? productFilter : false} loading={this.props.loading}/>
            </RequestComponent>
        )
    }
}

export default ProductContainer;