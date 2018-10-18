import React from 'react';
import styled, { css } from 'styled-components';

const ItemsWrapper = styled.div`
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    display: flex;
    margin-top: 20px;
    position: relative;
    overflow: scroll;
`

const Th = styled.th`
    background: white;
    position: sticky;
    top: 0;
    z-index: 10;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    box-sizing: content-box;
    padding: 10px 20px;
    max-width: 230px;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
    font-weight: 400;

    ${props => props.action && css`
        text-align: center;
        background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 25%);
        right: 0;
    `}
`

const Td = styled.td`
    padding: 10px 20px;
    max-width: 200px;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
    border-bottom: 1px solid #ccc;

    ${props => props.action && css`
        z-index: 5;
        position: sticky;
        right: 0;
        background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 25%);
    `}
`

const TrItem = styled.tr`
    cursor: pointer
`

const BtnAction = styled.button`
    width: 30px;
    height: 20px;
    border: none;
    font-size: 12px;
    margin:0 5px;
    border-radius: 2px;
    border: 1px solid #ccc;
    background: transparent;
    color: rgba(0,0,0,0.7);
    cursor: pointer;
`

const LoadingWrapper = styled.div`
    height: 100%;
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
    display: flex;
    align-items: center;
    white-space: nowrap;
`

class ListItems extends React.Component {
    constructor(props){
        super(props) 
        this.state = {
            itemsNotActive: 0
        }

        this.changeNumber = this.changeNumber.bind(this)
    }

    changeNumber(value) {
        this.setState({itemsNotActive: value})
    }

    render() {
        if (this.props.items.length && this.props.items.length > 0 && !this.props.loading && this.state.itemsNotActive !== this.props.items.length) { 
            return (
                <ItemsWrapper>
                    <Table items={this.props.items} changeNumber={this.changeNumber}/>
                </ItemsWrapper>
            )
        }
        else if (!this.props.loading && (!this.props.items.length || this.props.items.length <= 0 || this.state.itemsNotActive === this.props.items.length)) {
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
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            itemModal: ''
        }
    }

    componentWillMount() {
        let notActive = 0

        this.props.items && this.props.items.map((item) => {
            if(!item.active) {
                notActive += 1

                return true
            }

            return false
        })

        return notActive > 0 ? this.props.changeNumber(notActive) : false
    }

    onOpenModal = (item) => {
        this.setState({ openModal: true, itemModal: item });
    };

    onCloseModal = () => {
        this.setState({ openModal: false, itemModal: ''});
    };

    render() {
        return (
            <table>
                <Header item={this.props.items[0]}/>
                <tbody>
                    {this.props.items && this.props.items.map((item, i) => {                
                        return item && <Item key={i} item={item}/>
                    })}
                </tbody>
            </table>
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
                id: "Identificador (QR Code)",
                code: "Código",
                status: "Status",
                user: "Funcionário responsável",
            }
        }
    }

    render() {
        return (
            <thead>
                <tr>
                    {Object.keys(this.props.item).map((propKey, i) => {
                        
                        // Se o item for estiver ativo exibir na tabela.
                        if(propKey === "active") {
                            return false
                        }
    
                        // Não exibir properties que contém "_", pois são criadas pelo mongodb.
                        if (propKey.includes("_")){
                            return false
                        }
    
                        // Retornar o valor traduzido conforme o objeto "scaffolding" ou o valor da key.
                        return <Th key={i}>{this.state.scaffolding[propKey] || propKey}</Th>
                    })}
                    <Th action="true">Ações</Th>
                </tr>
            </thead>
        )
    }
}

class Item extends React.Component {
    render() {
        return (
            <TrItem>
                {Object.keys(this.props.item).map((propKey, i) => {         
                    let prop = this.props.item[propKey]

                    // Se o item for estiver ativo exibir na tabela.
                    if(propKey === "active") {
                        return false
                    }

                    // Não exibir properties que contém "_", pois são criadas pelo mongodb.
                    if (propKey.includes("_")){
                        return false
                    }

                    // Se a property for uma data, formatá-la.
                    if(propKey.includes("created") || propKey.includes("updated") ) {
                        var date = new Date(prop)

                        prop = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                    }

                    // Se a property for um Array de items, retornar cada item dentro de uma div.
                    if(Array.isArray(prop)) {
                        let propArray = []

                        prop.map((propInList, i) => {
                            return propArray.push(`${propInList.name}, `)
                        });

                        return <Td key={i}>{propArray}</Td>
                    }

                    // Se a property for um objeto, exibir o nome.
                    if(prop.name) {
                        return <Td key={i}>{prop.name}</Td>
                    }
                        
                    return <Td key={i}>{prop}</Td>
                })}
                <Td action="true">
                    <BtnAction edit><i className="fas fa-pencil-alt"></i></BtnAction>
                    <BtnAction delete><i className="fas fa-trash"></i></BtnAction>
                </Td>
            </TrItem>
        )
    }
}

export default ListItems;