import styled from "styled-components"
import Cart from "../../assets/cart.svg"

export const ShoppingIcon = styled(Cart)`
    width: 24px; 
    height: 24px;
`

export const CartIconContainer = styled.div`
    width: 45px; 
    height: 45px; 
    position: relative; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    cursor: pointer;
`

export const ItemCount = styled.span`
    position: absolute; 
    font-size: 10px; 
    font-weight: bold; 
    bottom: 12px;
`