import { GraphQLClientSingleton } from "app/graphql"
import { customerAccessTokenCreateMutation } from "app/graphql/mutations/customerAccessTokenCreate"
import { cookies } from 'next/headers'

export const createAccessToken = async (email: string, password: string) => {
  const cookiesStore = cookies()
  const graphqlClient = GraphQLClientSingleton.getInstance().getClient()
  const { customerAccessTokenCreate }: {
    customerAccessTokenCreate: {
      customerAccessToken: {
        accessToken: string
        expiresAt: string
      },
      customerUserErrors: []
    }
  } = await graphqlClient.request(customerAccessTokenCreateMutation, {
    "email": email,
    "password": password
  })

  const customerCreate = customerAccessTokenCreate;
  const { customerAccessToken } = customerCreate;

  if(customerAccessToken?.accessToken){ 
    const {accessToken, expiresAt} = customerAccessToken;
    cookiesStore.set("accessToken", accessToken, {
      path: "/",
      expires: new Date(expiresAt),
      httpOnly: true,
      sameSite: "strict"
    })
  }

  return customerCreate; 
}