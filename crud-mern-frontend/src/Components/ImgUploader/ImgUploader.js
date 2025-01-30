import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";

function ImgUploader() {
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);

  const submitImg = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post(
      "http://localhost:5000/uploadImg",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    getImage();
  };
  const onImgChange = (e) => {
    setImage(e.target.files[0]); // Added the `onImgChange` function
  };
  const getImage = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getImage");
      setAllImage(res.data.data);
    } catch (e) {
      console.error("Error getting image", e);
    }
  };
  useEffect(() => {
    getImage();
  });

  return (
    <div>
      <Nav />
      <h1>ImgUploader</h1>
      <form onSubmit={submitImg}>
        <input
          type="file"
          accept="image/*"
          onChange={onImgChange}
        />
        <button type="submit">Upload</button>
      </form>

      {allImage=== null ?"": allImage.map((data) =>(
        <img key={data._id} src={`http://localhost:5000/file/${data.image}`} alt="uploaded image" height={100} width={100} />

      ))}
    </div>
  );
}

export default ImgUploader;
