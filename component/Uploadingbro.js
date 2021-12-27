import React, { useState } from "react"
import axios from "axios"
import Loader from "./component/loader"

export default function UploadingStuff() {
  const [parcent, setParcent] = useState(0)
  const [imageUrl, setImageUrl] = useState(false)
  const [fileName, setfileName] = useState(null)
  const uploadFile = async ({ target: { files } }) => {
    let data = new FormData()
    let res
    data.append("images", files[0])
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent
        let percent = Math.floor((loaded * 100) / total)
        setParcent(percent)
      },
    }
    if (data) {
      res = await axios.post("uploadUrl", data, options)
      console.log("res-gcp", res.data)
      setImageUrl(res.data)
      setfileName(files[0].name)
    }
    return await 
  }

 
  const removeImage  = async () => {
   
    setImageUrl(false)
    setParcent(0)
  }

  return (
    <>
      <div className="col-md-6">
        <label className="clr-grey fs-13">
          Preview Image<span className="clr-red">*</span>
        </label>
        <br />
        {imageUrl ? (
          <div
            onClick={removeImage}
            className="pointer"
            style={{
              position: "absolute",
              color: "#fc5757",

              paddingLeft: "5px",
              paddingTop: "2px",
            }}
          >
            <i className="fa fa-times-circle fa-lg" />
          </div>
        ) : (
          ""
        )}
        <label>
          {!imageUrl && parcent < 1 ? (
            <div
              className="text-center fs-13"
              style={{
                color: "black",
                border: "0.5px solid #F3F3F3",
                borderRadius: 4,
                cursor: "pointer",
                height: "120px",
                width: "165px",
                padding: "25px",
              }}
            >
              {" "}
              <i
                className="fa fa-image fa-3x pb-10"
                style={{ color: "#3660C1" }}
              />
              <br />
              Add Image
            </div>
          ) : parcent !== 100 ? (
            <div
              className="text-center fs-13"
              style={{
                color: "black",
                border: "0.5px solid #F3F3F3",
                borderRadius: 4,
                cursor: "pointer",
                height: "130px",
                width: "165px",
                padding: "25px",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Loader parcent={parcent} />
            </div>
          ) : (
            <>
              <div
                className="d-flex justify-content-center"
                style={{
                  height: "120px",
                  width: "165px",
                  border: "0.5px solid #F3F3F3",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "65px",
                    color: "#ffffff8f",
                  }}
                  className="text-center"
                >
                  <br />
                </div>

                <img
                  src={imageUrl}
                  style={{
                    maxWidth: "165px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </>
          )}

          <input
            style={{ display: "none" }}
            type="file"
            accept="image/png, image/jpeg, image/png, video/mp4, video/avi, video/avi, video/mkv, application/pdf, application/vnd.ms-excel, .docx"
            onChange={uploadFile}
          />
        </label>
      </div>
    </>
  )
}
