export const REQUEST_APPS = 'REQUEST_APPS'
export const RECEIVE_APPS = 'RECEIVE_APPS'
export const PAGINATION_DATA = 'PAGINATION_DATA'
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH'
export const DISABLE_SEARCH = 'DISABLE_SEARCH'

import contentPage1 from '../api/CONTENTLISTINGPAGE-PAGE1.json';
import contentPage2 from '../api/CONTENTLISTINGPAGE-PAGE2.json';
import contentPage3 from '../api/CONTENTLISTINGPAGE-PAGE3.json';

function requestApps() {
  return {
    type: REQUEST_APPS
  }
}

function receiveApps(json) {
  return {
    type: RECEIVE_APPS,
    apps: json
  }
}

function fetchApps() {
  return dispatch => {
    dispatch(requestApps())
    return fetch(contentPage1)
      .then(response => response.json())
      .then(json => dispatch(receiveApps(json)))
  }
}

function shouldFetchApps(state) {
  const apps = state.ProductReducer?.apps
  if (apps?.length==0) {
    return true
  } else if (state.isFetching) {
    return false
  }
}

export function fetchAppsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchApps(getState())) {
      return dispatch(fetchApps())
    }
  }
}

function receivePagination(json, page) {
  return {
    type: PAGINATION_DATA,
    apps: json,
    page
  }
}

export function fetchPagination(page=2) {
  return dispatch => {
    dispatch(requestApps())
    let data = contentPage2
    if(page === 3) {
      data = contentPage3
    }
    return fetch(data)
      .then(response => response.json())
      .then(json => dispatch(receivePagination(json, page)))
  }
}

export function fetchSearchHandler(searchTerm) {
  return {
    type: RECEIVE_SEARCH,
    searchTerm: searchTerm
  }
}

export function disableSearchHandler() {
  return {
    type: DISABLE_SEARCH,
  }
}
