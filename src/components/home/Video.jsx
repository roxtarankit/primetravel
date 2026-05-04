const Video = () => {
  return (
    <video
      src="/videos/video.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    />
  )
}

export default Video