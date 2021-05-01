import React from 'react';
import { Query, Mutation } from 'react-apollo';

import CartDropDown from './cart-dropdown.component';

const TOGGLE_CART_HIDDEN = gql`
    mutation TogglecartHidden {
        toggleCartHidden @client
    }
`;

const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`;

const CartDropdownContainer = () =>(
    <Mutation mutation={TOGGLE_CART_HIDDEN}>
        <Query query={GET_CART_ITEMS}>
            ({ data: { cartItems } })=> (
                <CartDropdown 
                    cartItems={cartItems}
                    toggleCartHidden={toggleCartHidden}
                    />
            )
        </Query>
    </Mutation>
);

export default CartDropdownContainer;