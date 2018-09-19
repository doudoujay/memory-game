class Card {
  constructor(id, defaultImg) {
    this.hidden = true;
    this.id = id;
    this.invalid = false;
    this.defaultImg = defaultImg;
    this.img = `http://pngimg.com/uploads/pokemon/pokemon_PNG${id}.png`;
    this.image = this.defaultImg;
  }

  compare(card) {
    return card.id === this.id
  }

  changeState() {
    if (this.hidden) {
      this.hidden = !this.hidden;
      this.image = this.img;
    } else {
      this.hidden = !this.hidden;
      this.image = this.defaultImg;
    }
  }
}

export default Card;
