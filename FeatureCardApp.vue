<template>
  <div class="feature-cards-container font-covnerter" 
  :class="{'two-column': columnCount == 2, 'three-column': columnCount == 3}">
    <card v-for="card in cards" :card="card"></card>
  </div>
</template>

<script>
  import Card from './Card.vue'
  import service from './utils/services.js'
  import _ from 'lodash'
  export default {
    name: 'FeatureCard',
    components: {Card},
    created: function () {},
    mounted: function () {
      // attach scroll event handler determine visibility
      $(window).on('scroll.featureCard', _.debounce(this.loadIfInView, 250))
      // kick it off manualy
      this.loadIfInView()
    },
    beforeDestroy: function () {
      $(window).off('scroll.featureCard')
    },
    props: ['columnCount', 'cardGuids', 'articleCount'],
    data: function () {
      return {
        cards: [],
        loadDataTriggered: false
      }
    },
    computed: {
      guidSet: function () {
        var guidSet = {}
        this.cardGuids.forEach(function (guid) {
          guidSet[guid] = 1
        })
        return guidSet
      }
    },
    methods: {
      isInView: function () {
        console.log($(this.$el).offset().top)
        var padding = 200;
        var eTop = $(this.$el).offset().top // offset top is relative to the document
        var yPosRelativeToView = eTop - $(window).scrollTop() // always positive, # of pixel hidden above top
        var viewHeight = $(window).height() + padding
        if (yPosRelativeToView > 0 && yPosRelativeToView <=viewHeight) {
          
          return true
        } else {
          
          return false
        }
      },
      loadIfInView: function () {
        var thisApp = this
        // private function for filtering cards of this control
        // since the request gets all the cards (from 2 control, 
        // aka feature vue app) on one page 
        function filterMyOwnCards(cards) {
          var myCards = []
          cards.forEach(function (card) {
            var cardGuid = card.cId
            // thisApp.guidSet is a computed property
            if(thisApp.guidSet[cardGuid]) {
              myCards.push(card)
            }
          })
          return myCards
        }
        
        if(this.isInView() && !this.loadDataTriggered) {
          this.loadDataTriggered = true
          service.getCards(thisApp.articleCount)
            .then(function (cards) {
              thisApp.cards = filterMyOwnCards(cards)
            })
        }      
      }      
    }
  }

</script>

<style scoped lang="scss">
  @import '../../Presentation/Intranet/scss/vendors/_include-media.scss';

  .two-column {
    .card {
      display: inline-block;
      width: 50%;
      @include media('<tablet') {
        width: 100%;
      }
    }
  }
  .three-column {
    .card {
      display: inline-block;
      width: 33.33%;
      @include media('<tablet') {
        width: 100%;
      }
    }
  }


</style>