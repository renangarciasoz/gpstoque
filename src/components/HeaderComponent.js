import React from 'react';
import styled from 'styled-components';

// const HeaderComponent = styled.div`

// `

const HeaderWrapper = styled.div`
    width: 100%;
    justify-content: space-between;
    display: flex;
`

const Title = styled.h3`
    
`

const AddButton = styled.button`
    background: linear-gradient(315deg,#0097f6,#005eea);
    border: none;
    border-radius: 2px;
    padding: 10px;
    color: white;
`

const ButtonText = styled.span`
    margin-left: 10px;
`

const SearchWrapper = styled.div`
    width:100%;
    display: flex;
    align-items center;
    height: 60px;
    border-bottom: 1px solid #ccc;
    color: rgba(0,0,0,0.5);
`

const InputSearch = styled.input`
    width: 80%;
    background: transparent;
    margin-left: 10px;
    border: none;
    outline: none;
    color: rgba(0,0,0,0.7);
`

class HeaderComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            searchValue: ''
        }
    }

    // input change handler
    handleSearch = (e) => {
        this.setState({
            searchValue: e.target.value
        });
        
        this.props.action(e.target.value);
    } 

    render() {
        return (
            <header>
                <HeaderWrapper>
                    <Title>{this.props.title}</Title> 
                    <AddButton>
                        <i className="fas fa-plus"></i> 
                        <ButtonText>{this.props.buttonText}</ButtonText>
                    </AddButton>
                </HeaderWrapper>
                <SearchWrapper>
                    <i className="fas fa-search"></i>
                    <InputSearch placeholder={this.props.searchText} onChange={this.handleSearch} value={this.state.searchValue}></InputSearch>
                </SearchWrapper>
            </header>
        )
    }
}

export default HeaderComponent;