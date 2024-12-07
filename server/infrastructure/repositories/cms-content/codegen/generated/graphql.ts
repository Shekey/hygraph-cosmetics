import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;

export const PageDocument = gql`
    query Page($slug: String!, $stage: Stage! = PUBLISHED) {
  page(where: {slug: $slug}, stage: $stage) {
    __typename
    id
    slug
    title
    description
    ogImage {
      url
    }
    components {
      ... on Editorial {
        id
        __typename
        image {
          url
        }
        components {
          ... on Card {
            id
            __typename
            cta
            image {
              url
            }
            title
            url
          }
          ... on Cta {
            id
            __typename
            chapeau
            cta
            description
            title
            url
          }
        }
      }
      ... on Hero {
        id
        __typename
        description
        image {
          url
        }
        title
      }
      ... on ProductHighlight {
        id
        __typename
        productFocus {
          id
          __typename
          cta
          description
          image {
            url
          }
          productId
          title
          url
          product {
            description
            id
            images {
              alt
              url
            }
            ingredients
            price
            name
            shortDescription
            slug
            stock
          }
        }
      }
      ... on Routine {
        id
        __typename
        chapeau
        cta
        description
        image {
          url
        }
        title
        url
      }
    }
  }
}
    `;

/**
 * __usePageQuery__
 *
 * To run a query within a React component, call `usePageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      stage: // value for 'stage'
 *   },
 * });
 */
export function usePageQuery(baseOptions: Apollo.QueryHookOptions<Types.PageQuery, Types.PageQueryVariables> & ({ variables: Types.PageQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PageQuery, Types.PageQueryVariables>(PageDocument, options);
      }
export function usePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PageQuery, Types.PageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PageQuery, Types.PageQueryVariables>(PageDocument, options);
        }
export function usePageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.PageQuery, Types.PageQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PageQuery, Types.PageQueryVariables>(PageDocument, options);
        }
export type PageQueryHookResult = ReturnType<typeof usePageQuery>;
export type PageLazyQueryHookResult = ReturnType<typeof usePageLazyQuery>;
export type PageSuspenseQueryHookResult = ReturnType<typeof usePageSuspenseQuery>;
export type PageQueryResult = Apollo.QueryResult<Types.PageQuery, Types.PageQueryVariables>;
export const PdpDocument = gql`
    query Pdp($slug: String!, $stage: Stage! = PUBLISHED) {
  pdp(where: {slug: $slug}, stage: $stage) {
    id
    __typename
    slug
    title
    description
    ogImage {
      url
    }
    components {
      ... on Tutorial {
        __typename
        id
        title
        image {
          url
        }
        items {
          __typename
          text
        }
      }
      ... on Routine {
        __typename
        id
        chapeau
        cta
        description
        image {
          url
        }
        title
        url
      }
      ... on ProductList {
        __typename
        title
        relatedProductList {
          relatedProductId
          relatedProducts {
            products {
              description
              id
              images {
                alt
                url
              }
              ingredients
              name
              price
              shortDescription
              slug
              stock
            }
          }
        }
      }
    }
    product {
      id
      slug
      name
      price
      ingredients
      shortDescription
      description
      stock
      images {
        alt
        url
      }
    }
  }
}
    `;

/**
 * __usePdpQuery__
 *
 * To run a query within a React component, call `usePdpQuery` and pass it any options that fit your needs.
 * When your component renders, `usePdpQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePdpQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      stage: // value for 'stage'
 *   },
 * });
 */
export function usePdpQuery(baseOptions: Apollo.QueryHookOptions<Types.PdpQuery, Types.PdpQueryVariables> & ({ variables: Types.PdpQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PdpQuery, Types.PdpQueryVariables>(PdpDocument, options);
      }
export function usePdpLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PdpQuery, Types.PdpQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PdpQuery, Types.PdpQueryVariables>(PdpDocument, options);
        }
export function usePdpSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.PdpQuery, Types.PdpQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PdpQuery, Types.PdpQueryVariables>(PdpDocument, options);
        }
export type PdpQueryHookResult = ReturnType<typeof usePdpQuery>;
export type PdpLazyQueryHookResult = ReturnType<typeof usePdpLazyQuery>;
export type PdpSuspenseQueryHookResult = ReturnType<typeof usePdpSuspenseQuery>;
export type PdpQueryResult = Apollo.QueryResult<Types.PdpQuery, Types.PdpQueryVariables>;