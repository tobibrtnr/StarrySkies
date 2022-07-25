/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @author    Tobias Breitenauer   <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2021-2022
 * @license   MIT
 * 
 * This store handles the user login, logout, and other account operations.
 */

import { defineStore }        from 'pinia'
import { reactive, computed, inject, provide } from 'vue'

import config from '@/json/config.json'
 
import type IAccount      from '@/type/TAccount'
import type TStringRecord from '@/type/TStringRecord'

import defaultAccount from '@/model/defaultAccount'

import StoreSession from '@/store/StoreSession'

import jwt_decode from 'jwt-decode'

import { getJson, postJson, patchJson, deleteJson } from '@/service/rest'
import { useCookies } from 'vue3-cookies'

const
  { cookies } = useCookies(),
  StoreUser =
    defineStore (
    'user',

      () =>
      { const
          paths =
            config.paths,

          user = 
            reactive(defaultAccount()),
  
          storeSession = 
            StoreSession(),
          
          session =
            storeSession.session,
            
          saveSessionInfo =
            storeSession.saveSessionInfo,

          reset = 
            () =>
            { storeSession.reset();
              cookies.remove("token");
              Object.assign(user, defaultAccount());
            },   
              
          getUser =
            async (id: string) =>
            { const res = await getJson(session.token, `${paths.accounts}/${id}`);
              saveSessionInfo(res);
              Object.assign(user, 
                            (res.status === 200) 
                            ? (res.data as unknown as IAccount) 
                            : defaultAccount()
                           );
              return res.status < 300
            },
        
          patchUser =  
            async () =>
            { const res = await patchJson(session.token, `${paths.accounts}/${user.id}`, user);
              saveSessionInfo(res);  
              user.password = undefined; // don't store the password
              return res.status < 300
            },
        
          deleteUser =  
            async () =>
            { const res = await deleteJson(session.token, `${paths.accounts}/${user.id}`);
              saveSessionInfo(res);  
              return res.status === 200
            },

          register =
            async () =>
            { const res = await postJson(null, paths.register, user);
              saveSessionInfo(res);                         
                    
              if (res.status === 201)
              { return login(true) }
        
              return res.status < 300
            },
    
          login =
            async (stay: boolean) =>
            { const
                res = 
                  await postJson(
                  session.token,
                    paths.login, 
                    { user:     user.username     
                                ? user.username.trim().toLowerCase()
                                : user.email 
                                  ? user.email.trim().toLowerCase()
                                  : null, 
                      password: user.password ? user.password.trim() : '',
                    }
                  )

            if (res.status === 200)
            { const 
                c_token     = (res.token as string),
                c_payload   = jwt_decode(c_token) as unknown as TStringRecord;
              session.token   = c_token;
              session.isAdmin = c_payload.isAdmin === 'true';

              if(stay) {
                user.stay = true;
                cookies.set("token", c_token, "1d");
              }

              await getUser(c_payload.id);
              user.password = undefined; // don't store the password
            }
            else
            { reset() } // reset the session
        
            return res.status < 300
          },

          loginCookie = async () => {

            const c_payload   = jwt_decode(cookieToken) as unknown as TStringRecord;
            session.token   = cookieToken;
            session.isAdmin = c_payload.isAdmin === 'true';

            await getUser(c_payload.id);
          },
  
          logout = () => {
            reset();
          },

          isNotAuthorized = computed(() => !session.token),
          isAuthorized    = computed(() => !!session.token), // bug: Token muss gültig sein

          visibilityNotAuthorized = computed(() => isNotAuthorized.value ? '' : 'hidden'),
          visibilityAuthorized    = computed(() => isAuthorized.value    ? '' : 'hidden'),

          cookieToken = cookies.get("token");

          // login via cookie if the user holds one
          if(cookieToken) {
            loginCookie();
          }

        return { user, register, login, logout, reset, getUser,  patchUser, deleteUser,
                 isNotAuthorized, isAuthorized,
                 visibilityNotAuthorized, visibilityAuthorized
               }
      }
    )
   
export default StoreUser
