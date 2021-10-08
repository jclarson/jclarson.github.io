const Pagination = ({ items, pageSize, onPageChange }) => {
  const { Button } = ReactBootstrap;
  if (!items || items.length <= 1) return null;

  let num = Math.ceil(items.length / pageSize);
  let pages = range(1, num + 1);
  const list = pages.map((page) => {
    return (
      <Button key={page} onClick={onPageChange} className="page-item">
        {page}
      </Button>
    );
  });
  return (
    <nav>
      <ul className="pagination">{list}</ul>
    </nav>
  );
};
const range = (start, end) => {
  return Array(end - start + 1)
    .fill(0)
    .map((item, i) => start + i);
};
function paginate(items, pageNumber, pageSize) {
  const start = (pageNumber - 1) * pageSize;
  let page = items.slice(start, start + pageSize);
  return page;
}
const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;
    console.log('in useEffect');
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
        console.log(result);
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};
// App that gets data from freetogame url
function App() {
  const { Fragment, useState, useEffect, useReducer } = React;
  const [query, setQuery] = useState("Card");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "https://www.freetogame.com/api/games",
    []
  );
  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.textContent));
  };
  let page = data;
  if (page.length >= 1) {
    page = paginate(page, currentPage, pageSize);
    console.log(`currentPage: ${currentPage}`);
  }
  return (
    <Fragment>
        <div id="main">
        <div className="selectors-container">
          <div className="selector">
            <div className="selector-title">Category:</div>
            <div className="selector-select">
              <select
                name="category"
                id="category"
                onChange={event => {
                  setQuery(event.target.value);
                  if (event.target.value != "none") {
                    doFetch(`https://www.freetogame.com/api/games?category=${event.target.value}&sort-by=alphabetical`);
                    document.getElementById("nocategory").style.display="none";
                    event.preventDefault();
                  }
                }}>
                <option id="nocategory" value="none">Select</option>
                <option value="card">Card</option>
                <option value="mmo">MMO</option>
                <option value="mmorpg">MMORPG</option>
                <option value="moba">Moba</option>
                <option value="shooter">Shooter</option>
                <option value="strategy">Strategy</option>
              </select>
            </div>
          </div>
          <div className="selector">
            <div className="selector-title">Platform:</div>
            <div className="selector-select">
              <select
                name="platform"
                id="platform"
                onChange={event => {
                  setQuery(event.target.value);
                  doFetch(`https://www.freetogame.com/api/games?platform=${event.target.value}&sort-by=alphabetical`);
                  event.preventDefault();
                }}>
                <option value="all">All</option>
                <option value="pc">PC</option>
                <option value="browser">Browser</option>
              </select>
            </div>
          </div>
        </div>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="list-group">
          {page.map((item) => (
              <div className="list-group-item">
              <a href={item.game_url}><img src={item.thumbnail} alt="thumbnail" />{item.title}</a> | genre: {item.genre} | platform: {item.platform}<p>Description: {item.short_description}</p>
              </div>
          ))}
        </div>
      )
      }
      </div>
      <Pagination
        items={data}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      ></Pagination>
    </Fragment>
  );
}

// ========================================
ReactDOM.render(<App />, document.getElementById("root"));
