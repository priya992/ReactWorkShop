import { DISABLE_SEARCH, REQUEST_APPS,  RECEIVE_APPS, PAGINATION_DATA, RECEIVE_SEARCH } from '../actions';

const initialState = {
    isFetching: false,
    apps: [],
    page: 1,
    totalContentItems: undefined,
    pageTitle: 'Romantic Comedy',
    isSearch: false,
    searchFinal: null
};

function apps( state=initialState, action={}) {
  switch (action.type) {
    case REQUEST_APPS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_APPS: {
      const pageDataCount = action.apps?.page?.['total-content-items']
      return Object.assign({}, state, {
        isFetching: false,
        apps: action.apps?.page?.['content-items']?.content,
        totalContentItems: parseInt(pageDataCount, 10),
        pageTitle: action.apps?.page?.['title']
      });
    }

    case PAGINATION_DATA:{
      const newData = state?.apps
      const actionData = action.apps?.page?.['content-items']?.content
      const pageDataCount = action.apps?.page?.['total-content-items']

      return Object.assign({}, state, {
        isFetching: false,
        apps: [ ...newData, ...actionData],
        page: action.page,
        totalContentItems: parseInt(pageDataCount, 10),
      });
    }

    case RECEIVE_SEARCH:{
      const newData = state.apps.filter((data) => data.name.toLowerCase().includes(action.searchTerm) )

      if(!action.searchTerm) {
        return Object.assign({}, state, {
          isSearch: false,
          searchFinal: null
        });
      } else {
        return Object.assign({}, state, {
          isSearch: true,
          searchFinal: newData
        });
      }
    }

    case DISABLE_SEARCH:{
      return Object.assign({}, state, {
        isSearch: false,
        searchFinal: null
      });
    }

    default:
      return state
  }
}

export default apps
