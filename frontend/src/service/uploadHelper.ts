/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides helper functions for uploading a new image and
 * deleting an image.
 */
import type TImage from "@/type/TImage"

import StoreSession from '@/store/StoreSession'
import StoreUser from '@/store/StoreUser'

import config from '@/json/config.json'

import { postJsonImage, deleteJson } from './rest';
const
  storeSession = StoreSession(),
  session = storeSession.session,
  saveSessionInfo = storeSession.saveSessionInfo,
  
  storeUser = StoreUser(),
  user = storeUser.user,

  uploadImage = async (image: TImage) => {
    const
      data = new FormData();

    // Add all properties to the form data (if they exist)
    data.append('account_id', user.id);
    if(image.title) data.append('title', image.title as string);
    if(image.desc)  data.append('desc',  image.desc as string);
    if(image.file)  data.append('file',  image.file as Blob);

    // If the user set image properties correctly, add them as array of arrays.
    const imageProps = new Map<string, string>();
    image.customProps.forEach((prop) => {
      if(prop['key'] && prop['value']) {
        imageProps.set(prop['key'], prop['value']);
      }
    });
    if(imageProps.size > 0) {
      data.append('customProps', JSON.stringify(Array.from(imageProps.entries())));
    }

    // POST the image with all data.
    const res = await postJsonImage(session.token, config.paths.upload, data);
    saveSessionInfo(res);

    return res.status < 300
  },

  deleteUpload = async (id: string) => {
    const res = await deleteJson(session.token, config.paths.image.replace('$1', id), {'accountid': storeUser.user.id, 'imageid': id});
    saveSessionInfo(res);

    return res.status < 300
  }

export default { uploadImage, deleteUpload };

export { uploadImage, deleteUpload };
