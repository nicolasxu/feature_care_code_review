<template>
  <div class="card padding-right">
    <div class="card-inner">
      <div class="card-title">{{card.cardTitle}}</div>
      <div class="card-img">
        <img :src="card.cardImage" :alt="card.cardTitle">
      </div>
      <ul class="card-links">
        <li v-for="article in card.articles" class="item">
          <a :href="article.link" target="_blank">{{article.title}}</a> 
        </li>
        <li class="viewAll"><a :href="card.viewAllLink" target="_blank">ViewAll</a></li>
      </ul>    
    </div>
  </div>
</template>

<script>
  import * as utils from './utils/services.js'

  export default {
    name: 'Card',
    created: function () {},
    props: ['card'],
    mounted: function () {
      // since data is from properties passed down, 
      // there is no update event, just mounted.
      utils.checkAdjustCardHeight(this.card.cId)
    },
    data: function () {
      return {
        
      }
    }
  }

</script>

<style scoped lang="scss">
  @import './variables.scss';
  @import '../../Presentation/Intranet/scss/vendors/_include-media.scss';
  .feature-cards-container {
    .card {
      vertical-align: top;
      @include media ('>=lg-desktop') {
        margin-bottom: 40px;
      }
      @include media ('<lg-desktop') {
        margin-bottom: 2.2em;
      }
    }
    .card-inner {
      
      background-color: $link-background-color;
      box-sizing: border-box;

      @include media ('>=lg-desktop') {
        .card-title {
          font-size: 22px;
          padding: 15px;
          padding-bottom: 12px;
          padding-left: 25px;
          
        }

        .card-links {
          font-size: 19px;
          padding: 0 27px;
          .item, .viewAll {
            padding: 18px 0;
          }
        }

      }
      @include media ('<lg-desktop', '>desktop') {
        .card-title {
          font-size: 1.6em;
          padding: 1.31em;
          padding-left: 1.64em;
        }
        .card-links {
          font-size: 16px; // 1.25em;
          padding: 0 1.78em;
          .item, .viewAll {
            padding: 1.18em 0;
          }
        }
      }
      @include media ('>=tablet', '<=desktop') {
        .card-title {
          font-size: 1.25em;
          padding: 0.7em;
        }
        .card-links {
          padding: 0 1.78em;
          font-size: 14px;
          .item, .viewAll {
            padding: 1.18em 0;
          }
        }
      }
      @include media ('<tablet') {
        // full mobile
        .card-title {
          font-size: 19px;
          padding: 0.4em 0.9em;
        }
        .card-links {
          font-size: 14px;
          padding: 0 1.7em;
          .item, .viewAll {
            padding: 0.7em 0;
          }
        }

      }


      .card-title {
        background-color: $card-title-bk;
        color: $card-title-color;   
      }
      .card-img {
        max-height: 317px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .card-links {
        background-color: $link-background-color;     
        .item, .viewAll{
          list-style: none;
          margin-bottom: 0;
        }
        .viewAll {
          font-weight: bold;
        }
        .item {
          border-bottom: 1px solid $seperator-color;
        }
      }
    }
  }

</style>