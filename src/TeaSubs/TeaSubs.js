import './TeaSubs.css'

function TeaSubs({ title, status, id, showSubDetails, teaImageUrl, updateStatus }) {

  function getStatus() {
    return status ? "Active" : "Inactive";
  }

  return (
    <div className='subscription'>
      <img
        src={teaImageUrl}
        alt="yellow flowers next to a glass teacup"
        className="tea-photo"
        onClick={showSubDetails}
      />
      <h2>{title}</h2>
      <p>Subscription ID: {id}</p>
      <p>Status: {getStatus()}</p>
      <button onClick={(() => updateStatus(id))}>Toggle Status</button>
    </div>
  );
};

export default TeaSubs;
