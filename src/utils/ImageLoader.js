async function getProfilePicture(id) {
  return await fetch(`https://res.cloudinary.com/stanplan/image/upload/v1568237644/profiles/${id}_uzjzqq.jpg`, {
    method: "get"
  })
  .then(response => {
    return response.blob();
  })
  .then(data => {
    return URL.createObjectURL(data);
  })
  .catch(error => {
    fetch(`https://res.cloudinary.com/stanplan/image/upload/v1568238391/profiles/default.svg`, {
      method: "get"
    })
    .then(response => {
      return response.blob();
    })
    .then(data => {
      return URL.createObjectURL(data);
    })
    .catch(error => {
      throw(new Error("Error when fetching default profile picture: " + error));
    });
  });
}

module.exports = { getProfilePicture };
