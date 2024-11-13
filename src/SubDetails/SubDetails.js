import './SubDetails.css'

function SubDetails({ selectedSub, showTeaSubs }) {
  console.log(selectedSub.attributes.status, "HERE")
  const sub = selectedSub.attributes
  return(
    <section>
      <h2>{sub.title}</h2>
      <p>{sub.frequency}</p>
      <p>{sub.price}</p>
      <p>{sub.status}</p>
    </section>
  );
};

export default SubDetails;
