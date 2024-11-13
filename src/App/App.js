import './App.css';
import searchIcon from '../icons/search.png'
import SubContainer from '../SubContainer/SubContainer.js'
import { useEffect, useState } from 'react';

function App() {
  const [selectedSub, setSelectedSub] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const [subSearch, setSubSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/subscriptions")
    .then(response => response.json())
    .then(data => {setSubscriptions(data.data); setAllSubscriptions(data.data)})
  },[]);

  function showSubDetails(sub) {
    setSelectedSub(sub);
  };

  function showTeaSubs() {
    setSelectedSub(null);
  };

  function updateStatus(id) {
    console.log(id)
    fetch(`http://localhost:3001/api/v1/subscriptions/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => response.json())
    .then(specificSub => {
      const newSubs = subscriptions.map(currentSub => {
        if (currentSub.id === specificSub.data.id) {
          return specificSub.data;
        } else {
          return currentSub;
        }
      });
      setSubscriptions(newSubs);
      alert(`Active status for subscription ID: ${id} has been changed`);
    });
  };

  function searchSubList(event) {
    const search = event.target.value
    setSubSearch(search);
    if (search === "") {
      setSubscriptions(allSubscriptions)
    } else {
      const filteredSubs = allSubscriptions.filter(sub => {
        console.log(sub.attributes.title, "searching here")
        return sub.attributes.title.toLowerCase().includes(search.toLowerCase())
      })
      setSubscriptions(filteredSubs)
    }   
  };

  const searchBar = (
    <form onSubmit={(event) => event.preventDefault()}>
      <img className='search-icon' src={searchIcon} alt='search icon'/>
      <input
        type="search"
        id="site-search"
        placeholder='  Start typing here...'
        value={subSearch}
        onChange={searchSubList}
      />
    </form>)


  return (
    <main className="App">
      <header className="App-header">
        <h1 onClick={(() => {showTeaSubs()})}>Tea Time</h1>
        {searchBar}
      </header>
        <SubContainer
          subscriptions={subscriptions}
          selectedSub={selectedSub}
          showSubDetails={showSubDetails}
          updateStatus={updateStatus}
        />
    </main>
  );
};

export default App;
