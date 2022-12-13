import Stories from "../../component/stories/Stories";
import PostLists from "../../component/postLists/PostLists";
import Create from "../../component/create/Create";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Stories />
      <Create />
      <PostLists />
    </div>
  );
};

export default Home;
