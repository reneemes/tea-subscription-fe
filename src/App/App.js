// import logo from '../logo.svg';
import './App.css';
import SubContainer from '../SubContainer/SubContainer.js'
import { useEffect, useState } from 'react';

function App() {
  // const dummy = [
  //           {"id": "1", "type": "subscription", "attributes": {
  //               "title": "Monthly Green Tea Subscription", "price": 10.99, "status": true, "frequency": "monthly"}
  //            }];
  const [selectedSub, setSelectedSub] = useState(null);

  const [subscriptions, setSubscriptions] = useState([]);
  console.log(subscriptions, '<><><> subscriptions')

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/subscriptions")
    .then(response => response.json())
    .then(data => {console.log('data', data.data); setSubscriptions(data.data)})
  },[]);

  function showSubDetails(sub) {
    fetch(`http://localhost:3001/api/v1/subscriptions/${sub.id}`)
    .then(response => response.json())
    console.log("showMovieDetails CLICK!")
    setSelectedSub(sub);
  };

  function showTeaSubs() {
    console.log("showTeaSubs CLICK!")
    setSelectedSub(null);
  };

  return (
    <main className="App">
      <header className="App-header">
        <h1>Tea Time</h1>
      </header>
        <SubContainer
          subscriptions={subscriptions}
          selectedSub={selectedSub}
          showSubDetails={showSubDetails}
          showTeaSubs={showTeaSubs}
        />
    </main>
  );
};

export default App;
