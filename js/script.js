class AddAnimation {
  constructor(char, animationClass) {
    this.char = document.querySelector(char);
    this.animationClass = animationClass;
    this.clouds = document.querySelector('.clouds');

    this.addClass = this.addClass.bind(this);
  }

  addClass() {
    this.char.classList.add(this.animationClass);
    setTimeout(() => {
      this.char.classList.remove(this.animationClass);
    }, 600);
  }

  addEvent() {
    document.addEventListener('keydown', this.addClass);
  }

  verifyCollision(obj) {
    this.object = document.querySelector(obj);

    const loop = setInterval(() => {
      const objPosition = this.object.offsetLeft;
      const charPosition = +window.getComputedStyle(this.char).bottom.replace('px', '');
      const cloudPosition = this.clouds.offsetLeft;

      if (objPosition <= 120 && objPosition > 0 && charPosition <= 80) {
        console.log(charPosition);
        this.object.style.animation = `none`;
        this.object.style.left = `${objPosition}px`;
        this.clouds.style.left = `${cloudPosition}px`;
        this.char.style.animation = `gameOver 1.25s ease-in forwards`;

        this.char.src = './img/game-over.png';
        this.char.style.width = `75px`;
        this.char.style.marginLeft = `50px`;

        document.removeEventListener('keydown', this.addClass);

        clearInterval(loop);
      }
    }, 10);
  }

  init() {
    this.addEvent();
    return this;
  }
}

const addAnimation = new AddAnimation('.mario', 'jump');
addAnimation.verifyCollision('.pipe');
addAnimation.init();
