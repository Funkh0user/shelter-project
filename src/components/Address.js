import React, { useContext } from 'react';

const Address = (address) => {

  return(
    <div>
      <p> {address['Line1']} </p> <button>Trimet</button>
    </div>
  )

}
export default Address;
