export const fillteredSessions = (sessions, _id) => {
  return {
    ownSessions: sessions.filter((see) => see._owner?._id === _id),
    participateSessions: sessions.filter(
      (see) => see._participator?._id === _id
    )
  };
};
