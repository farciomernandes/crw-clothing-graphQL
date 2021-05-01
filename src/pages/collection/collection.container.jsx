import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionPage from './collection.component'
import Spinner from '../../components/spinner/spinner.component';

//use " $ " for specify that this is a object
const GET_COLLECTIONS_BY_TITLE = gql`
    query getCollectionsByTitle($title: String!){
        getCollectionsByTitle(title: $title){
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`;

const CollectionPageContainer = ({ match })=>(
    <Query query={GET_COLLECTION_BY_TITLTE} variables={{ title: match.params.collectionId}}>
        {
            ({loading, data })=>{
                if(loading) return <Spinner />
                const { getCollectionsByTitle } = data;
                return <CollectionPage collection={getCollectionsByTitle} />
            }
        }

    </Query>
);

export default CollectionPageContainer;