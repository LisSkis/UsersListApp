export const checkIfAnyFieldIsEmpty = (userData) => {
  let isAnythingEmpty = false;
  Object.keys(userData).forEach((stateKey) => {
    if (stateKey === 'address') {
      Object.keys(userData.address).forEach((addressKey) => {
        const { address } = userData;
        if (addressKey === 'geo') {
          if (!address.geo.lat || !address.geo.lng) {
            isAnythingEmpty = true;
          }
        } else if (!address[addressKey]) {
          isAnythingEmpty = true;
        }
      });
    } else if (stateKey === 'company') {
      Object.keys(userData.company).forEach((companyKey) => {
        const { company } = userData;
        if (!company[companyKey]) {
          isAnythingEmpty = true;
        }
      });
    } else if (!userData[stateKey]) {
      isAnythingEmpty = true;
    }
  });

  return isAnythingEmpty;
}

export const emailValidator = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}