import React, { useState } from "react"
import axios from "axios"
import Loader from "../component/loader"
export default function Home() {
  const [parcent, setParcent] = useState(0)
  const [error, setError] = useState("")
  const uploadFile = async ({ target: { files } }) => {
    if (
      files[0]?.type === "image/png" ||
      files[0]?.type === "image/jpeg" ||
      files[0]?.type === "image/png" ||
      files[0]?.type === "video/mp4" ||
      files[0]?.type === "video/avi" ||
      files[0]?.type === "video/avi" ||
      files[0]?.type === "video/mkv" ||
      files[0]?.type === "application/pdf" ||
      files[0]?.type === "application/vnd.ms-excel" ||
      files[0]?.name.substr(-5) === ".docx"
    ) {
      setError("")

      let data = new FormData()
      data.append("images", files[0])
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent

          let percent = Math.floor((loaded * 100) / total)
          setParcent(percent)
        },
      }
      const res = await axios.post(
        `https://guardaround.herokuapp.com/api/v1/incidentimg`,
        data,
        options
      )
    } else {
      setError(
        "Please Upload on of these file : image/png, image/jpeg, image/png, video/mp4, video/avi, video/avi, video/mkv, application/pdf, application/vnd.ms-excel, .docx"
      )
    }
  }

  return (
    <>
      {error && <h4>{error}</h4>}
      <input
        type="file"
        // accept="image/png, image/jpeg, image/png, video/mp4, video/avi, video/avi, video/mkv, application/pdf, application/vnd.ms-excel, .docx"
        onChange={uploadFile}
      />
      <Loader parcent={parcent} />
    </>
  )
}
