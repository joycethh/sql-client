import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  ImageOutlined,
  AddLocationAltOutlined,
  AlternateEmailOutlined,
} from "@mui/icons-material";
import { useAuthContext } from "../../context/authContext";
import "./create.scss";
import { API } from "../../axios";

const Create = () => {
  const { currentUser } = useAuthContext();
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await API.post("/upload", formData);
      return response.data;
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation(
    (newPost) => {
      return API.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  const handleClick = async (e) => {
    e.preventDefault();

    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, image: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="create">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser?.profilePic} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser?.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src="" alt="" />
                <span>
                  <ImageOutlined />
                </span>
              </div>
            </label>
            {/* <div className="item">
              <img src="" alt="" />
              <span>
                <AddLocationAltOutlined />
              </span>
            </div>
            <div className="item">
              <img src="" alt="" />
              <span>
                <AlternateEmailOutlined />
              </span>
            </div> */}
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Create;
