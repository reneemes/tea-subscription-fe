import { useEffect, useState } from 'react';
import './SubDetails.css'

function SubDetails({ selectedSub, showTeaSubs, teaImageUrl }) {
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
      {/* <div className='details-container'> */}
        <img
          src={teaImageUrl}
          alt="yellow flowers next to a glass cup of tea"
          className="tea-photo"
          // onClick={showSubDetails}
        />
        <section className='tea-info-box'>
          <div className='tea-info'>
            <p>{tea.title}</p>
            <p>{tea.description}</p>
            <p>{tea.tempature}</p>
            <p>{tea.brew_time}</p>
          </div>
        </section>
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
      {/* </div> */}
    </section>
  );
};

export default SubDetails;
