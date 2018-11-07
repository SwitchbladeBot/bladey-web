<template>
    <div class="backgroundShop">
        <section class="hero is-primary">
        <div class="hero-body">
            <div class="container text-container">
            <h1 class="title">
                Background Shop
            </h1>
            Buy new backgrounds!
            </div>
        </div>
        </section>
        <section class="section">
            <div class="box text-centered" >
                <h1 class="coins">Your SwitchCoins: 0 </h1>
                <a class="tobuy holder" href="#" v-for="background in backgrounds" v-bind:key="background.id" @click="findSpecific(background._id)">
                    <img :src="background.fullSizeURL" class="bg" alt="background" />
                </a>
            </div>
            <b-modal :active.sync="isCardModalActive" :width="640" scroll="clip" v-if="background != null">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img :src="background.fullSizeURL" alt="Image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media-content">
                            <p class="title is-4">{{ background.displayName }}</p>
                            <p class="subtitle is-6">{{ background.description }}</p>
                            <p class="subtitle is-5">Price: {{ background.price }}</p>
                            <button class="button is-primary">
                                <b-icon icon="cart"></b-icon>
                                <span>Buy</span>
                            </button>
                        </div>
                    </div>
                </div>
            </b-modal>
        </section>
    </div>
</template>

<script>

export default {
  name: 'BackgroundShop',
  data: () => {
    return {
      backgrounds: null,
      // SPOT THE DIFFERENCE
      background: null,
      isCardModalActive: false
    }
  },
  methods: {
    findAll () {
      fetch('https://api.switchblade.xyz/backgrounds')
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
          this.backgrounds = res.backgrounds.map(r => {
            return r
          })
        })
    },
    findSpecific (id) {
      fetch(`https://api.switchblade.xyz/backgrounds/${id}`)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
          this.background = res.background
          this.isCardModalActive = true
        })
    }
  },
  mounted () {
    this.findAll()
  }
}
</script>

<style scoped>
.hero-body > .container > .title {
  font-weight: 900;
  font-style: italic;
  font-size: 50px;
}
.holder {
    display: inline-block;
    position: relative;
    height: 100px;
    width: 190px;
}

.bg {
   width: 180px;
   height: auto;
   margin: 0 3px;
   border-radius: 5px;
  -webkit-transition: opacity 0.3s ease-in-out;
  -moz-transition: opacity 0.3s ease-in-out;
  -ms-transition: opacity 0.3s ease-in-out;
  -o-transition: opacity 0.3s ease-in-out;
     transition: opacity 0.3s ease-in-out;
}
.bg:hover {
    zoom: 1;
    filter: alpha(opacity=50);
    opacity: 0.3;

}
.coins {
    font-weight: bold;
    font-size: 1.3em;
}
</style>
