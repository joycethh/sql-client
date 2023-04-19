import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./stories.scss";
//TEMPORARY
const stories = [
  {
    id: 1,
    name: "John Doe",
    img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
  {
    id: 2,
    name: "John Doe",
    img: "https://image.ibb.co/cks4Rz/typing_849806_340.jpg",
  },
  {
    id: 3,
    name: "John Doe",
    img: "https://image.ibb.co/e0RLzK/entrepreneur_1340649_340.jpg",
  },
  {
    id: 4,
    name: "John Doe",
    img: "https://image.ibb.co/gmmneK/children_593313_340.jpg",
  },
];

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser?.profilePic} alt="" />
        <span>{currentUser?.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
