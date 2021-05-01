import { gql } from 'apollo-boost';

import { addItemToCart } from './cart.utils';

export const typeDefs = gql`

    extend type Item {
        quantity: Int
    }

    extend type Mutation {
        ToggleCartHiden: Bolean!
        AddItemToCart(item: Item!): [Item]!
    }
`;

//@client talk for Apollo that your call getting in cart cache, don't in database.
const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`;

const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`;

export const resolvers = {
    /**
     * _root = higher component 
     * _args = all items and arguments that can be accessed in your mutation.
     * _context = What the Apollo client has access to, which includes the cache, as well as the client itself.
     */
    Mutation: {
        toggleCartHidden: (_root, _args, /*_context */ { cache })=> {
            const { cartHidden } = cache.readeQuery({
                query: GET_CART_HIDDEN,
            });

            cache.writeQuery({
                query: GET_CARt_HIDDEN,
                data: { cartHidden: !cartHidden }
            });

            return !cartHidden;
        },

        AddItemToCart: (_root, { item }, { cache })=>{
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = addItemToCart(cartItems, item);

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            });

            return newCartItems;
        }
    }
}