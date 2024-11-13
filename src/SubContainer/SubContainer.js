import TeaSubs from "../TeaSubs/TeaSubs";
import './SubContainter.css'
import SubDetails from '../SubDetails/SubDetails.js'

function SubContainer({ subscriptions, selectedSub, showSubDetails, updateStatus }) {
  const teaImageUrl = "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg"

  const showCards = subscriptions.map(sub => {
    return (
      <TeaSubs 
        title={sub.attributes.title} 
        status={sub.attributes.status} 
        id={sub.id}
        key={sub.id}
        teaImageUrl={teaImageUrl}
        showSubDetails={() => showSubDetails(sub)}
        updateStatus={updateStatus}
      />
    )
  })

  const showDetails = (
    <SubDetails
      selectedSub={selectedSub}
      teaImageUrl={teaImageUrl}
    />
  )

  return (
    <div className='sub-container'>
      { selectedSub ? showDetails : showCards }
    </div>
  );
};

export default SubContainer;
