/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides helper functions to get profile information via REST requests.
 */
import StoreUser from '@/store/StoreUser';

import config from '@/json/config.json';

import { getJson }    from './rest';

import formatDate     from './dateUtil';
import type TSaved    from '@/type/TSaved';
import type TImages   from '@/type/TImages';
import type TImage    from '@/type/TImage';
import type TProfiles from '@/type/TProfiles';

const
  // GET if a profile is existing
  getProfileExisting = async (accName: string) => {
    const 
      res = await getJson(null, config.paths.userProfile.replace('$1', accName));
    return Object.keys(res.data).length !== 0;
  },

  // GET if an image is existing
  getImageExisting = async (imageid: string) => {
    const 
      res = await getJson(null, config.paths.image.replace('$1', imageid));
    return Object.keys(res.data).length !== 0;
  },

  // GET a profile with its information
  getProfile = async (accName: string) => {
    const 
      storeUser = StoreUser(),
      profile = (await getJson(null, config.paths.userProfile.replace('$1', accName))).data;
      profile.created_at = formatDate(profile.created_at);

      if(storeUser.isAuthorized) {
        const res = await getJson(null, config.paths.isSavedBy
                                              .replace('$1', accName)
                                              .replace('$2', storeUser.user.username as string));
        profile.savedByUser = res.data.saved;
      }

      return profile;
  },

  // GET all profiles that are suiting the search query
  getProfileSearch = async (query: string) => {
    const
      res: TProfiles = (await getJson(null, config.paths.profilesSearch.replace('$1', query))).data;
      for(const i in res) {
        res[i].created_at = formatDate(res[i].created_at as string);
      }
      return res;
  },

  // GET all profiles that a user has saved
  getSaved = async (accName: string) => {
    const
      res: TSaved = (await getJson(null, config.paths.userSaved.replace('$1', accName))).data;
    for(const i in res) {
      res[i].saved_at = formatDate(res[i].saved_at as string);
    }
    return res;
  },

  // GET all profiles that saved a user
  getSavedBy = async (accName: string) => {
    const
      res: TSaved = (await getJson(null, config.paths.userSavedBy.replace('$1', accName))).data;
    for(const i in res) {
      res[i].saved_at = formatDate(res[i].saved_at as string);
    }
    return res;
  },

  // GET all images a user has saved
  getSavedImages = async (accName: string) => {
    const
      res: TSaved = (await getJson(null, config.paths.userSavedImages.replace('$1', accName))).data;
      for(const i in res) {
        res[i].saved_at = formatDate(res[i].saved_at as string);
      }
      return res;
  },

  // GET the feed (newes images by saved profiles) for a user
  getNewestImages = async (accName?: string) => {
    if(accName) {
      return (await getJson(null, config.paths.profileFeed.replace('$1', accName))).data;
    } else {
      return (await getJson(null, config.paths.newestImages)).data;
    }
  },

  // GET all images of a user
  getImages = async (accName: string) => {
    const 
      res: TImages = (await (getJson(null, config.paths.userImages.replace('$1', accName)))).data;
    for(const i in res) {
      res[i].created_at = formatDate(res[i].created_at as string);
    }
    return res;
  },

  // GET a certain image by its ID
  getImage = async (imageid: string) => {
    const 
      storeUser = StoreUser(),
      image: TImage = (await (getJson(null, config.paths.image.replace('$1', imageid)))).data;
    
    image.created_at = formatDate(image.created_at as string);

    if(storeUser.isAuthorized) {
      const res = await getJson(null, config.paths.isImageSavedBy
                          .replace('$1', storeUser.user.username as string)
                          .replace('$2', imageid));
      image.savedByUser = res.data.saved;
    }
    return image;
  }

export default {
  getProfileExisting,
  getImageExisting,
  getProfile,
  getProfileSearch,
  getSaved,
  getSavedBy,
  getSavedImages,
  getImages,
  getImage,
  getNewestImages
}

export {
  getProfileExisting,
  getImageExisting,
  getProfile,
  getProfileSearch,
  getSaved,
  getSavedBy,
  getSavedImages,
  getImages,
  getImage,
  getNewestImages
}
