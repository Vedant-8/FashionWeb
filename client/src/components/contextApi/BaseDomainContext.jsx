import React, { createContext, useContext } from 'react'

const BaseContext = createContext('')
const BaseDomainContext = ({children}) => {

  
  const value ='https://academics.newtonschool.co'
  return (
    <>
     <BaseContext.Provider value={value}>
        {children}
     </BaseContext.Provider>
    </>
  )
}

export const useBaseApi = ()=> useContext(BaseContext)

export default BaseDomainContext;