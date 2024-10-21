
export const handleLogout = () => {
  Meteor.logout(() => {
  });
};


export const getFullnameUser = async () => {
  try {
    var profile = Meteor.user().profile;
    return `${(profile.name)?.split(" ")[0]} ${(profile.lastname)?.split(" ")[0]}`;
  } catch (error) {
    return ''
  }
}


export const getIdUser = () => {
  return Meteor.user()._id;
}

