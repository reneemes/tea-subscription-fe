// import logo from '../logo.svg';
import './App.css';
import SubContainer from '../SubContainer/SubContainer.js'
import { useEffect, useState } from 'react';

function App() {
  const dummy = [
            {"id": "1", "type": "subscription", "attributes": {
                "title": "Monthly Green Tea Subscription", "price": 10.99, "status": true, "frequency": "monthly"}
             }];

  const [subscriptions, setSubscriptions] = useState(dummy)
  console.log(subscriptions, '<><><> subscriptions')

  // useEffect(() => {
  // },[])


  return (
    <main className="App">
      <header className="App-header">
        <h1>Tea Time</h1>
      </header>
        <SubContainer
          subscriptions={subscriptions}
        />
    </main>
  );
}

export default App;
