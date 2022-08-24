import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Loader from "./Loader";
import LogoLoader from "./LogoLoader";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

function Giphy() {
  const [data, setData] = useState([]);
  const [para, setPara] = useState("These are the top 10 trending gifs");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(0);
  const [history, setHistory] = useState([]);
  const historyCollectionRef = collection(db, "history");

  // Fetching the top 10 trending gifs

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "6UflaNASKuLEcTO7FRFau1VRKibvvljB",
          limit: "10",
        },
      });
      console.log(results);
      setData(results.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Rendering the gifs

  const renderGifs = () => {
    if (isLoading) {
      return <Loader></Loader>;
    }
    return data.map((el) => {
      return (
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url} alt=""></img>
        </div>
      );
    });
  };

  // Searching the input value

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handling the submit button to send the value to the api

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const results = await axios("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: "6UflaNASKuLEcTO7FRFau1VRKibvvljB",
        limit: "10",
        q: search,
      },
    });

    //Creating the document for the search input

    const createSearchHistory = async () => {
      await addDoc(historyCollectionRef, { searchHistory: search });
    };
    createSearchHistory();

    //Setting the ID counter for the local storage, loading the data and changing the paragraph

    setId(id + 1);
    setData(results.data.data);
    setIsLoading(false);
    
    if(search.length === 0) {
      setPara("Search bar is empty!")
    } else if (results.data.data.length === 0){
      setPara('There are no gifs found!');
    } else {
      setPara(`${results.data.data.length} GIF's available for: ${search}`);
    }
  };

  // Saving the data in the local storage with a search ID

  useEffect(() => {
    window.localStorage.setItem(`search ID ${id}`, JSON.stringify(search));
  }, [search]);

  //Hook to showcase the database history

  useEffect(() => {
    const getHistory = async () => {
      const data = await getDocs(historyCollectionRef);
      setHistory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getHistory();
  }, []);

  return (
    <Fragment>
      <form className="form">
        <input
          type="text"
          placeholder="search"
          className="searchbox"
          onChange={handleSearchChange}
          value={search}
        />
        <button onClick={handleSubmit} type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{para}</p>
      <div className="container gifs">{renderGifs()}</div>
      <LogoLoader></LogoLoader>
      <div className="container dbhistory">
        <h4>DATABASE SEARCH HISTORY:</h4>
        {history.map((el) => {
          return (
            <div className="dbel">
              <h4>{el.searchHistory}</h4>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}

export default Giphy;
