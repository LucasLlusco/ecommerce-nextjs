"use server"
import { GraphQLClientSingleton } from "app/graphql"
import { createCartMutation } from "app/graphql/mutations/createCartMutation"
import { createUserMutation } from "app/graphql/mutations/createUserMutation"
import { createAccessToken } from "app/utils/auth/createAccessToken"
import { validateAccessToken } from "app/utils/auth/validateAccessToken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type cartCreateType = { 
  cartCreate?:{
    cart?:{
      checkoutUrl: string
    }
  }
}

type customerCreateType = {
  customerCreate: {
    customer: {
      firstName: string
      email: string
    },
    customerUserErrors: []
  }
}

export const handleCreateUser = async (formData: FormData) => {
	const formDataObject = Object.fromEntries(formData)
  delete formDataObject["password_confirmation"] 
  const graphqlClient = GraphQLClientSingleton.getInstance().getClient()
  const variables = {
    input: {
      ...formDataObject, 
      phone: '+54' + formDataObject.phone 
    }
  }

  const { customerCreate }:customerCreateType = await graphqlClient.request(createUserMutation, variables)
  const { customerUserErrors, customer } = customerCreate

  if(customerUserErrors.length >= 1) { 
    return customerUserErrors; 
  }

  if(customer?.firstName){ 
    await createAccessToken(formDataObject.email as string, formDataObject.password as string)
    redirect('/store')
  }
}

export const handleLogin = async (formData: FormData) => {
  const formDataObject = Object.fromEntries(formData)
  const {customerUserErrors, customerAccessToken } = await createAccessToken(formDataObject.email as string, formDataObject.password as string)
  if(customerUserErrors?.length >= 1) { 
    return customerUserErrors
  }
  if(customerAccessToken?.accessToken){ 
    redirect('/store')
  } 
}

export const handleCreateCart = async (items: CartItem[]) => {
  const cookiesStore = cookies()
  const accesToken = cookiesStore.get('accessToken')?.value as string

  if(!accesToken) redirect('/login') 

  const graphqlClient = GraphQLClientSingleton.getInstance().getClient()
  const customer = await validateAccessToken() 
  const variables = { 
    input: {
      buyerIdentity: {
        customerAccessToken: accesToken,
        email: customer?.email 
      },
      lines: items.map(item => ({ 
        merchandiseId: item.merchandiseId,
        quantity: item.quantity
      }))
    }
  }
	
  const { cartCreate }:cartCreateType = await graphqlClient.request(createCartMutation, variables)
  return cartCreate?.cart?.checkoutUrl 
}