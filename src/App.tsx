import {Outlet} from 'react-router-dom'
import {AuthInit} from "./sections/auth/core/Auth.tsx";

export const App = ()  => {

  return (
      <>
          <AuthInit>
              <Outlet/>
          </AuthInit>
      </>
  )
}