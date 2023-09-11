import UserProfile from "../features/user/components/UserProfile";
import Navbar from "../features/navbar/Navbar";
export default function UserProfilePage() {
  return (
    <div>
      <Navbar>
        <h2 className="mx-auto text-2xl">My Profile</h2>
        <UserProfile></UserProfile>
      </Navbar>
    </div>
  );
}
