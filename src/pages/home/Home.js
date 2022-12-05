import Stories from "../../component/stories/Stories";
import PostLists from "../../component/postLists/PostLists";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Stories />
      <PostLists />
    </div>
  );
};

export default Home;
