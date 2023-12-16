const mario = document.querySelector('.mario')
const hull = document.querySelector('.hull')

const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')

audioStart = new Audio('./imag/audio_theme.mp3')
audioGameOver = new Audio('./imag/audio_gameover.mp3')


const startGame = () => {
  hull.classList.add('hull-animation')
  start.style.display = 'none'

  // audio
  audioStart.play()
}

const restartGame = () => {
  gameOver.style.display = 'none'
  hull.style.left = ''
  hull.style.right = '0'
  mario.src = './imag/mario.gif'
  mario.style.width = '150px'
  mario.style.bottom = '0'

  start.style.display = 'none'

  audioGameOver.pause()
  audioGameOver.currentTime = 0;

  audioStart.play()
  audioStart.currentTime = 0;

}

const jump = () => {
  mario.classList.add('jump')

  setTimeout(() => {
    mario.classList.remove('jump')
  }, 800)
}

const loop = () => {
  setInterval(() => {
    const hullPosition = hull.offsetLeft
    const marioPosition = window
      .getComputedStyle(mario)
      .bottom.replace('px', ' ')

    if (hullPosition <= 120 && hullPosition > 0 && marioPosition < 80) {
      hull.classList.remove('.hull-animation')
      hull.style.left = `${hullPosition}px`
      
      mario.classList.remove('.jump')
      mario.style.bottom = `${marioPosition}px`

      mario.src = './imag/game-over.png'
      mario.style.width = '80px'
      mario.style.marginLeft = '50px'
      
      
      function stopAudioStart() {
        audioStart.pause()
      }
      stopAudioStart()
      
      audioGameOver.play()
      
      function stopAudio() {
        audioGameOver.pause()
      }
      setTimeout(stopAudio, 7000)
      
      gameOver.style.display = 'flex'
      
      clearInterval(loop)
    }
  }, 10)
}


loop()

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === ' ') {
    jump()
  }
})

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump() 
  }
})

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === 'Enter') {
    startGame()
  }
})