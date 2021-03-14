export const REQUEST_APPS = 'REQUEST_APPS'
export const RECEIVE_APPS = 'RECEIVE_APPS'
export const PAGINATION_DATA = 'PAGINATION_DATA'
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH'
export const DISABLE_SEARCH = 'DISABLE_SEARCH'

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
    return fetch(`build/api/CONTENTLISTINGPAGE-PAGE1.json`)
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
    return fetch(`build/api/CONTENTLISTINGPAGE-PAGE${page}.json`)
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
