import React, { useState, useRef } from "react"
import { useIntersection } from "./intersectionObserver"
import "./imageRenderer.scss"

const ImageRenderer = ({ url, thumb, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef()
  useIntersection(imgRef, () => {
    setIsInView(true)
  })

  const handleOnLoad = () => {
    setIsLoaded(true)
  }
  return (
    <>
      <div
        className="image-container w-full h-80"
        ref={imgRef}
        style={{
          width: "100%",
        }}
      >
        {isInView && (
          <>
            <img
              className={`image thumb ${isLoaded && "isLoaded"}`}
              src={thumb}
            />
            <img
              className={`image  ${isLoaded && "isLoaded"}`}
              src={url}
              onLoad={handleOnLoad}
            />
          </>
        )}
      </div>
    </>
  )
}

export default ImageRenderer
