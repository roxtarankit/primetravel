const Video = () => {
  return (
    <video
      src="/videos/video.mp4"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="w-full h-full object-cover"
    />
  )
}

export default Video