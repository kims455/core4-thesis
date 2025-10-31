window.addEventListener('load', () => {
  const bgVideo = document.getElementById('bg-video');
  bgVideo.playbackRate = 0.4;

  const titleBtn = document.getElementById('titleBtn');
  titleBtn.addEventListener('click', () => {
    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity = 0;
    setTimeout(() => {
      window.location.href = 'experience.html';
    }, 600);
  });
});