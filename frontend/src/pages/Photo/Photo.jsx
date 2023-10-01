import "./Photo.css";

import { uploads } from "../../utils/config";

// Components
import Message from "../../components/Message";
import { Link } from "react-router-dom";

// Hooks
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { getPhoto, like } from "../../slices/photoSlice";
import { useDispatch, useSelector } from "react-redux";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";

// Redux

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  // Comentários

  // Load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  const handleLike = () => {
    dispatch(like(photo._id));
  };

  if (loading) {
    <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="error" />}
      </div>
    </div>
  );
};

export default Photo;
