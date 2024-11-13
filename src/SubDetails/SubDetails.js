import { useEffect, useState } from 'react';
import './SubDetails.css'

function SubDetails({ selectedSub, teaImageUrl }) {
  const [subDetails, setSubDetails] = useState();
  const sub = selectedSub.attributes
  const id = parseInt(selectedSub.id)

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/subscriptions/${id}`)
    .then(response => response.json())
    .then(data => setSubDetails(data))
  },[]);

  const customer = subDetails?.attributes?.customer || {};
  const tea = subDetails?.attributes?.tea || {};

  function getStatus() {
    return sub.status ? "Active" : "Inactive";
  }

  return(
    <section className='subscription-details-wrapper'>
      <h2>{sub.title}</h2>
      <div className='details-container'>
        <img
          src={teaImageUrl}
          alt="yellow flowers next to a glass cup of tea"
          className="tea-photo"
        />
          <div className='tea-info'>
            <p>Description:<br/>{tea.description}</p>
            <p>Ingredients: {tea.title}</p>
            <p>For the perfect cup, brew at {tea.tempature}°F for {tea.brew_time} minutes.</p>
          </div>
      </div>
        <section className='subscription-box'>
          <div className='sub-info'>
            <p>Subscription Frequency: {sub.frequency}</p>
            <p>{sub.frequency} price: ${sub.price} + shipping and handling</p>
            <p>Status: {getStatus()}</p>
          </div>
          <div className='customer-info'>
            <p>Customer Name: {customer.first_name} {customer.last_name}</p>
            <p>Email: {customer.email}</p>
          </div>
        </section>
    </section>
  );
};

export default SubDetails;
