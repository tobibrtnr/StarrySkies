/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides helper functions for saving / unsaving images
 * and profiles via REST requests.
 */
import StoreSession from '@/store/StoreSession';

import config from '@/json/config.json';

import { postJson, deleteJson } from './rest';

const
  storeSession = StoreSession(),
  session = storeSession.session,
  saveSessionInfo = storeSession.saveSessionInfo,

  // POST a new saved account relation
  postSavedAccount = async (id: string) => {
    await postSaved(id, config.paths.saveAccount)
  },

  // DELETE a saved account relation
  deleteSavedAccount = async (id: string) => {
    await deleteSaved(id, config.paths.saveAccount)
  },

  // POST a new saved image relation
  postSavedImage = async (id: string) => {
    await postSaved(id, config.paths.saveImage)
  },

  // DELETE a saved image relation
  deleteSavedImage = async (id: string) => {
    await deleteSaved(id, config.paths.saveImage)
  },

  // Helper function for saving a relation.
  postSaved = async (id: string, path: string) => {
    const res = await postJson(session.token, path, { "saved_id": id });
    saveSessionInfo(res);
  },

  // Helper function for deleting a relation
  deleteSaved = async (id: string, path: string) => {
    const res = await deleteJson(session.token, path, { "saved_id": id });
    saveSessionInfo(res);
  }

export default {
  postSavedAccount,
  deleteSavedAccount,
  postSavedImage,
  deleteSavedImage
}

export {
  postSavedAccount,
  deleteSavedAccount,
  postSavedImage,
  deleteSavedImage
}
