import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlepost.css";

export default function SinglePost() {
;
  
  const [post, setPost] = useState({});

  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(user.portfilepic);
  const [username, setUsername] = useState(user.username );
  const [email, setEmail] = useState( user.email );
  
  const [password, setPassword] = useState("user.password");
  const [success, setSuccess] = useState(false)
  const [updateMode, setUpdateMode] = useState(false);

  

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

   console.log(username)
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      setUpdateMode(false)
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err)
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {user.porfilepic && (
          <img src={ user.portfilepic} alt="xfx" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={username}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {username}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                >  update profile</i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                > delete user</i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{email}</p>
        )}
        
        {updateMode && (
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          )}
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        

      </div>
    </div>
  );
}