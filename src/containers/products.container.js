import React, { Component } from 'react'
import { connect } from 'react-redux'
import loadable from '@loadable/component'

import { fetchAppsIfNeeded, fetchPagination, fetchSearchHandler, disableSearchHandler } from '../actions'
import Home from '../components/Home'
import Header from '../components/Header'

const FooterSectionView = loadable(
  () =>
    import(
      /* webpackChunkName: "home-footer" */
      /* webpackPrefetch: true */
      '../components/Footer'
    ),
  {
    fallback: null,
    ssr: false,
  },
);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      page: 0,
      loading: false,
      prevY: 0,
      isSearchFetching: false,
      isVisible: false
    };
  }

  componentDidMount() {
    const { dispatch, fetchData } = this.props
    fetchData()

    var scrollComponent = this;
    document.addEventListener("scroll", function(e) {
      scrollComponent.toggleVisibility();
    });

      // Options
     var options = {
       root: null, // Page as root
       rootMargin: "0px",
       threshold: 0.8
     };
     // Create an observer
     this.observer = new IntersectionObserver(
       this.handleObserver.bind(this),
       options
     );
     this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {
    const {fetchPaginationData, page, totalContentItems, apps, isSearch} = this.props;
    if(totalContentItems !== apps.length && !isSearch) {
      const y = entities[0].boundingClientRect.y;
      if (this.state.prevY > y) {
        const curPage = page + 1;
        this.setState({ page: curPage });
        fetchPaginationData(curPage);
      }
      this.setState({ prevY: y });

    }
  }

  getSearchData(searchTerm) {
    const {fetchSearchData} = this.props
    fetchSearchData(searchTerm)
  }

  closeSearch() {
    const {disableSearch} = this.props
    disableSearch()
  }

  toggleVisibility() {
    if (window.pageYOffset > 300) {
      this.setState({
        isVisible: true
      });
    } else {
      this.setState({
        isVisible: false
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  render() {
    const { isFetching, apps, pageTitle, isSearch, searchFinal } = this.props
    const { isVisible } = this.state;
    const totalData = apps.length;

    const loadingCSS = {
      height: "100px",
      margin: "30px",
      marginTop: "-100px"
    };
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

    return (
       <>
        <Header pageTitle={pageTitle} getSearchData={(searchTerm) => this.getSearchData(searchTerm)} closeSearch={() => this.closeSearch()}/>
        {isFetching && totalData === 0 && <h2>Loading...</h2>}
        {!isFetching && totalData === 0 && <h2>Empty.</h2>}
        {false && (
          <img src={"media/loader.gif"} />
        )}
        {isSearch && searchFinal?.length === 0 && (
          <div className="emptyState">No Data Found</div>
        )}
        {
          searchFinal?.length>0 && isSearch && (
            <Home data={searchFinal} totalData={totalData} />
          )
        }
        {
          !isSearch && (
            <Home data={apps} totalData={totalData} />
          )
        }
        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
        {!isFetching && <FooterSectionView />}
        {isVisible && (
          <div onClick={() => this.scrollToTop()} className="scroll-top">
            <img src='media/backtotop.svg' alt='Go to top' className="back-to"/>
          </div>
        )}
       </>
    );
  }
}

const bindAction = (dispatch) => ({
    fetchData: () => dispatch(fetchAppsIfNeeded()),
    fetchSearchData: (seachTerm) => dispatch(fetchSearchHandler(seachTerm)),
    fetchPaginationData: (curPage) => dispatch(fetchPagination(curPage)),
    disableSearch: () => dispatch(disableSearchHandler())
});

const mapStateToProps = state => ({
    isFetching: state.ProductReducer.isFetching,
    apps: state.ProductReducer.apps,
    page: state.ProductReducer.page,
    totalContentItems: state.ProductReducer.totalContentItems,
    pageTitle: state.ProductReducer.pageTitle,
    isSearch: state.ProductReducer.isSearch,
    searchFinal: state.ProductReducer.searchFinal,
});
 
export default connect(mapStateToProps, bindAction)(App)
