import React, { useState } from "react"
import axios from "axios"
import Loader from "../component/loader"
export default function Home() {
  const [parcent, setParcent] = useState(0)
  const uploadFile = async ({ target: { files } }) => {
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
  }

  return (
    <>
      <input
        type="file"
        accept="image/png, image/jpeg, image/png, video/mp4, video/avi, video/avi, video/mkv, application/pdf, application/vnd.ms-excel, .docx"
        onChange={uploadFile}
      />
      <Loader parcent={parcent} />
    </>
  )
}
