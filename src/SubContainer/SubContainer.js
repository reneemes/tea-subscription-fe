import TeaSubs from "../TeaSubs/TeaSubs";
import './SubContainter.css'
import SubDetails from '../SubDetails/SubDetails.js'

function SubContainer({ subscriptions, selectedSub, showSubDetails, showTeaSubs }) {
  // console.log(subscriptions, "HERE")

  const showCards = subscriptions.map(sub => {
    // console.log(sub.attributes.title, "sub")
    return (
      <TeaSubs 
        title={sub.attributes.title} 
        status={sub.attributes.status} 
        id={sub.id}
        key={sub.id}
        showSubDetails={() => showSubDetails(sub)}
        // deleteSub={deleteSub}
      />
    )
  })

  const showDetails = (
    <SubDetails
      selectedSub={selectedSub}
      showTeaSubs={showTeaSubs}
    />
  )

  return (
    <div className='sub-container'>
      {/* <p>SubContainer</p> */}
      { selectedSub ? showDetails : showCards }
      {/* {showCards} */}
    </div>
  );
};

export default SubContainer;
