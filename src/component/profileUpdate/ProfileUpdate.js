import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AddAPhoto } from "@mui/icons-material";
import { API } from "../../axios";
import "./profileUpdate.scss";

const ProfileUpdate = ({ setOpenUpdate, user }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [input, setInput] = useState({
    city: "",
    website: "",
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await API.post("/upload", formData);
      console.log("files response", response);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation(
    (updates) => {
      return API.put("/users", updates);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["users"]);
      },
    }
  );
  const handleUpdate = async (e) => {
    e.preventDefault();

    let coverUrl;
    let profileUrl;

    coverUrl = coverPic ? await upload(coverPic) : user.coverPic;
    profileUrl = profilePic ? await upload(profilePic) : user.profilePic;

    mutation.mutate({ coverPic: coverUrl, profilePic: profileUrl, ...input });

    setOpenUpdate(false);
  };
  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={coverPic ? URL.createObjectURL(coverPic) : user.coverPic}
                  alt=""
                />
                <AddAPhoto className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCoverPic(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profilePic
                      ? URL.createObjectURL(profilePic)
                      : user.profilePic
                  }
                  alt=""
                />
                <AddAPhoto className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </div>

          <label>City</label>
          <input
            type="text"
            name="city"
            value={input.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={input.website}
            onChange={handleChange}
          />
          <button onClick={handleUpdate}>Update</button>
        </form>
        <button className="cancel" onClick={() => setOpenUpdate(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProfileUpdate;
