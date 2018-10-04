import React from 'react';
import styled from 'styled-components';

const ItemsWrapper = styled.div`
    width: 100%;
    max-width: 747px;
    display: flex;
    margin-top: 20px;
    position: relative;
`

const TableScroll = styled.div`
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    padding-bottom: 2px;
`

const TableMain = styled.table`
    font-size: 18px;
`

const TableHeader = styled.tr`
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
`

const ThTitle = styled.th`
    padding: 10px 20px;
    text-align: center;
    max-width: 200px;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
` 

const TdValue = styled.td`
    padding: 10px 20px;
    max-width: 200px;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
    border-bottom: 1px solid #ccc;
`

const ItemInValue = styled.div`
    padding: 0px 6px;
    background: var(--light);
    text-align: center;
    border-radius: 2px;
    margin-right: 3px;
`

const TableActions = styled.table`
    font-size: 18px;
`

const TdActions = styled.td`
    display: flex;
    padding: 10px 0px;
    min-height: 48px;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #ccc;
`

const BtnAction = styled.button`
    width: 30px
    height: 20px;
    border: none;
    font-size: 12px;
    border-radius: 2px;
    border: 1px solid #ccc;
    background: transparent;
    color: rgba(0,0,0,0.7);
    cursor: pointer;
`

const LoadingWrapper = styled.div`
    height: 100%;
    position: absolute;
    bottom: -125px;
    right: 310px;
    display: flex;
    align-items: center;
    z-index: 999;
`
const Loading = styled.img`
    background: url("https://i.gifer.com/OFuO.gif")center center no-repeat;
    background-size: cover;
    height: 100px;
    width: 100px;
    border-radius: 300%;
`

const NotFoundItems = styled.div`
    height: 100%;
    position: absolute;
    bottom: -90px;
    right: 290px;
    display: flex;
    align-items: center;
`

class ListItems extends React.Component {
    constructor(props){
        super(props) 
        this.state = {
            
        }
    }
    render() {
        if (this.props.items.length && this.props.items.length > 0 && !this.props.loading) {    
            return (
                <ItemsWrapper>
                    <Table items={this.props.items}/>
                    <ItemActions items={this.props.items}/>
                </ItemsWrapper>
            )
        }
        else if (!this.props.loading && (!this.props.items.length || this.props.items.length <= 0)) {
            return (
                <ItemsWrapper>
                    <NotFoundItems>Não possui items...</NotFoundItems>
                </ItemsWrapper>
            )
        }
        else if (this.props.loading) {
            return (
                <ItemsWrapper>
                    <LoadingWrapper><Loading></Loading></LoadingWrapper>
                </ItemsWrapper>
            )
        }
    }
}

class Table extends React.Component {
    render() {
        return (
            <TableScroll>
                <TableMain>
                    <tbody>
                        <Header items={this.props.items}/>
                        <Items items={this.props.items}/>
                    </tbody>
                </TableMain>
            </TableScroll>
        )
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            scaffolding: {
                created: "Data de criação",
                createdAt: "Data de criação",
                updatedAt: "Data de atualização",
                uniforms: "Uniformes",
                description: "Descrição",
                id: "Código"
            }
        }
    }

    render() {
        return (
            <TableHeader>
                {this.props.items && this.props.items.map((item) => {
                    let header = []
                    
                    Object.keys(item).map((propKey, i) => {
                        
                        // Não exibir properties que contém "_", pois são criadas pelo mongodb.
                        if (propKey.includes("_")){
                            return false
                        }

                        // Retornar o valor traduzido conforme o objeto "scaffolding" ou o valor da key.
                        return header.push(<ThTitle key={i}>{this.state.scaffolding[propKey] || propKey}</ThTitle>)
                    })

                    return header.reverse();
                })}
            </TableHeader>
        )
    }
}

class Items extends React.Component {
    render() {
        return (
            <tr>
                {this.props.items && this.props.items.map((item) => {
                    let table = []

                    Object.keys(item).map((propKey, i) => {                        
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

                        // Se a property for um Array de items, retornar cada item dentro de uma div.
                        if(Array.isArray(prop)) {
                            let propArray = []

                            prop.map((propInList, i) => {
                                return propArray.push(<ItemInValue key={i}>{propInList.name} </ItemInValue>)
                            });

                            return table.push(<TdValue key={i}>{propArray}</TdValue>)
                        } else {
                            return table.push(<TdValue key={i}>{prop}</TdValue>)
                        }

                    })

                    return table.reverse();
                })}
            </tr>
        )
    }
}

class ItemActions extends React.Component {
    render() {
        return (
            <TableActions>
                <tbody>
                    <TableHeader>
                        <ThTitle>Ações</ThTitle>
                    </TableHeader>
                    <tr>
                        {!this.props.loading && this.props.items && this.props.items.map((item, i) => {
                            return (
                                <TdActions key={i}>
                                    <BtnAction edit><i className="fas fa-pencil-alt"></i></BtnAction>
                                    <BtnAction delete><i className="fas fa-trash"></i></BtnAction>
                                </TdActions>
                            )
                        })}
                    </tr>
                </tbody>
            </TableActions>
        )
    }
}

export default ListItems;