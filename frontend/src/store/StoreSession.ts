/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2021-2022
 * @license   MIT
 * 
 * This file provides a store to store session information
 * globally.
 */

import { defineStore }      from 'pinia'
import { reactive } from 'vue'

import config from '@/json/config.json'

import defaultSession from '@/model/defaultSession'

import type TErrorMessages from '@/type/TErrorMessages'
import type TStringRecord  from '@/type/TStringRecord'

import jwt_decode from 'jwt-decode'
import { useCookies } from 'vue3-cookies'

// this store handles all session data

const 
  { cookies } = useCookies(),
  StoreSession =
    defineStore(
      'session',
    
      () =>
      { const 
          constraintErrorMessage = 
            reactive(config.constraintErrorMessages as TErrorMessages), 

          session =
            reactive(defaultSession()),
          
          reset = 
            () =>
            { Object.assign(session, defaultSession()) },

          saveSessionInfo =
            ( res: { token: string|null, data: Promise<unknown> } ) =>
            { const 
                c_token = session.token
                
              session.token        = res.token;  
              session.errorMessage = constraintErrorMessage[(res.data as unknown as TStringRecord).constraint ?? '']
  
              if (c_token != null && session.token == null)
              { reset() } // auto logout if no new token had be passed to the client
        
              if (session.token != null) {
                session.isAdmin = ((jwt_decode(c_token ?? "") as { isAdmin: boolean })?.isAdmin)
                cookies.set("token", session.token, "1d");
              }  
            }

        return { session, reset, saveSessionInfo }
      }
    )

export default StoreSession