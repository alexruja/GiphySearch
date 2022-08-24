import React, { useEffect, useState } from "react";
import Giphy from "./Components/Giphy";
import "./Styles/App.css";
import "./Styles/Form.css";
import "./Styles/Loader.css";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

const App = () => {
  const [history, setHistory] = useState([]);
  const historyCollectionRef = collection(db, "history");
  useEffect(() => {
    const getHistory = async () => {
      const data = await getDocs(historyCollectionRef);
      setHistory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getHistory();
  }, []);

  return (
    <div>
      {/* {history.map((el) => {
        return <div>
          <h1>Searched: {el.searchHistory}</h1>
        </div>;
      })} */}
      <Giphy/>
    </div>
  );
};

export default App;
