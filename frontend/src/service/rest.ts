/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2021-2022
 * @license   MIT
 * 
 * This file provides REST helper functions.
 */

import type TJsonAtom from '@/type/TJsonAtom'
import type TStringRecord from '@/type/TStringRecord';

const
  f_options = 
    ( p_method: string, p_token: string|null,
      p_data: FormData|Record<string, TJsonAtom>|null = null, isJSON: boolean
    ) =>
    { return { method:  p_method,
               headers: 
               { ...(isJSON ? {'Accept': 'application/vnd.api+json',
                               'Content-Type': 'application/json'} : {}),
                 ...(p_token ? {'Authorization': `Bearer ${p_token}`} : {})
               },
               ...(p_data ? { body: (isJSON ? JSON.stringify(p_data) : p_data as FormData) } : {})
             }
    },
    
  f_json = 
    async ( p_method: string, p_token: string|null, p_url: string, 
            p_data: FormData|Record<string, TJsonAtom>|null = null, isJSON = true
          ) =>
    {
      const 
        res = await fetch(p_url, f_options(p_method, p_token, p_data, isJSON)),
        headers: TStringRecord = {}
      
      res.headers
         .forEach((value:string, name: string) => headers[name] = value)

      return { status:     res.status, 
               statusText: res.statusText, 
               headers:    headers,
               token:      headers.authorization ? headers.authorization.split(' ')[1] : null,
               data:       await res.json(),
             }
    };

async function getJson(p_token: string|null, p_url: string)
{ const res = await f_json('GET', p_token, p_url);
  
  if (res.status === 200)
  { return res }
  else
  { throw new Error(`'${p_url}' not found`) }
}

async function postJson(p_token: string|null, p_url: string, p_data: Record<string, TJsonAtom> = {}) {
  return await f_json('POST', p_token, p_url,  p_data)
}

async function postJsonImage(p_token: string|null, p_url: string, p_data: FormData) {
  return await f_json('POST', p_token, p_url, p_data, false);
}

async function putJson(p_token: string|null, p_url: string, p_data: Record<string, TJsonAtom> = {}) {
  return await f_json('PUT', p_token, p_url,  p_data) 
}

async function patchJson(p_token: string|null, p_url: string, p_data: Record<string, TJsonAtom> = {}) {
  return await f_json('PATCH', p_token, p_url,  p_data) 
}

async function deleteJson(p_token: string|null, p_url: string, p_data: Record<string, TJsonAtom> = {}) {
  return await f_json('DELETE', p_token, p_url, p_data) 
}

export { 
  getJson,
  postJson,
  postJsonImage,
  putJson,
  patchJson,
  deleteJson
}

export default {
  getJson,
  postJson,
  postJsonImage,
  putJson,
  patchJson,
  deleteJson
}
