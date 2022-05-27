
import { GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query";


const token = process.env.NEXT_PUBLIC_BACK_END_KEY;
//const token = '63e0e7c3628803fab21b45693cfdfab1d0cc18a6e80cf2da36e09a6b7f0274029df31962e7d57b543d09b3b4c925eece6b1b8c754210a1abb8c58f3fd8c6644b47b410acb3337282c18a0407afc17ed185c04422a07ae4682b4c013e24082f8bb226f818b597d66138e822ef7534b1edef4b303399a55ef903f4db45e23a2960';

const endpoint = (process.env.NEXT_PUBLIC_BACK_END_ADDRESS) as string;
//const endpoint = 'http://localhost:3001/graphql';

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
})
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

