import React, { useCallback, useEffect, useRef, useState } from "react";
import { getStockSuggestions } from "../../api/ApiRequest";
import debaunce from "lodash.debounce";

import classes from "./searchbox.module.scss";
import { useOnClickOutside } from "../../utils/apputils";
import { useNavigate, useParams } from "react-router";

const SearchBox = (props) => {
  const { setSelectedStock } = props;

  const searchElRef = useRef();
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { symbol } = useParams();
  const navigate = useNavigate();

  const closeDropDown = useCallback(() => {
    // this will simply close the dropdown .
    setSuggestions([]);
  }, [setSuggestions]);

  useOnClickOutside(searchElRef, closeDropDown);

  const doSearch = async (word) => {
    if (word) {
      const resp = await getStockSuggestions(word);
      setSuggestions(resp?.bestMatches);
    } else {
      setSuggestions([]);
    }
  };

  const selectStock = useCallback(
    (symbol) => {
      setSelectedStock(symbol);
      // set input box value to selected one.
      setKeyword(symbol);
      // clear old suggestions
      setSuggestions([]);
    },
    [setSelectedStock, setSuggestions, setKeyword]
  );

  // whenever the symbol changes do the search ...
  useEffect(() => {
    selectStock(symbol);
  }, [symbol]);

  const debauncedSearch = useCallback(
    debaunce((word) => doSearch(word), 1000),
    []
  );

  const onChange = async (word) => {
    setKeyword(word);

    debauncedSearch(word);
  };

  const searchOnKeyDown = (ev) => {
    if (ev.key === "Enter") {
      getStockDetails(keyword);
    }
  };
  const getStockDetails = useCallback(
    (symbol) => {
      navigate(`/${symbol}`);
      // on the same route if you click the same options again then you have to close the dropdown.
      closeDropDown();
    },
    [navigate]
  );

  return (
    <div className={classes.searchContainer}>
      <label>Enter the stock search symbol</label>
      <div className={classes.autocomplete} ref={searchElRef}>
        <input
          type="text"
          placeholder="type symbols for stock search like tesco etc."
          value={keyword}
          onChange={(ev) => onChange(ev.target.value)}
          onKeyDown={searchOnKeyDown}
        />
        {Array.isArray(suggestions) && suggestions.length > 0 && (
          <ul>
            {suggestions.map((stock) => {
              {
                /** API is returning the strange keys.. */
              }
              return (
                <li
                  key={stock["1. symbol"]}
                  className={classes.suggestionsList}
                  onClick={() => {
                    // selectStock(stock["1. symbol"]);
                    getStockDetails(stock["1. symbol"]);
                  }}
                >
                  <div>{stock["1. symbol"]}</div>
                  <div>{stock["2. name"]}</div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <button
        onClick={() => {
          getStockDetails(keyword);
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
