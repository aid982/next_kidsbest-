
import { GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query";


const token = process.env.BACK_END_KEY;

const endpoint = (process.env.BACK_END_ADDRESS) as string;

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

