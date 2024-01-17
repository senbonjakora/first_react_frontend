const Profile = ({ user }) => {

  const me = { ...user };
 

  return (
    <div>
      <h1>{me.username}</h1>
      <h3>{me._id}</h3> 
    </div>
  );
};

export default Profile;
