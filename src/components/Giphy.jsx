import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Loader from "./Loader";

function Giphy() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(0);

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

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
    setId(id + 1);
    setData(results.data.data);
    setIsLoading(false);
    
  };


  useEffect(()=> {
    window.localStorage.setItem(`search ID ${id}`, JSON.stringify(search));
  },[search])

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
      <p>
        10 GIF's available for: <b>{search}</b>
      </p>
      <div className="container gifs">{renderGifs()}</div>
    </Fragment>
  );
}

export default Giphy;
