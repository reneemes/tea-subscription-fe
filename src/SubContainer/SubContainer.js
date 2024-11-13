import TeaSubs from "../TeaSubs/TeaSubs";
import './SubContainter.css'

function SubContainer({ subscriptions }) {
  console.log(subscriptions, "HERE")

  const showCards = subscriptions.map(sub => {
    console.log(sub.attributes.title, "sub")
    return (
      <TeaSubs 
        title={sub.attributes.title} 
        status={sub.attributes.status} 
        id={sub.id}
        key={sub.id}
        // deleteSub={deleteSub}
      />
    )
  })

  // const showDetails = (
  //   <SubDetails/>
  // )

  return (
    <div className='sub-container'>
      {/* <p>SubContainer</p> */}
      {/* { selectedSub ? showDetails : showCards } */}
      {showCards}
    </div>
  );
};

export default SubContainer;
