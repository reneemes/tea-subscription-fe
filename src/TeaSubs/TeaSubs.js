import './TeaSubs.css'

function TeaSubs({ title, id, key, showSubDetails, teaImageUrl }) {
  // const teaImageUrl = "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg"

  return (
    <div className='subscription'>
      <img
        src={teaImageUrl}
        alt="yellow flowers next to a glass cup of tea"
        className="tea-photo"
        onClick={showSubDetails}
      />
      <h2>{title}</h2>
      <button>CANCLE SUBSCRIPTION</button>
    </div>
  );
};

export default TeaSubs;
