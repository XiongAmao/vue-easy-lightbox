<template>
  <div class="homepage-demo">
    <div
      v-if="dynamicComponent"
      class="gallery"
    >
      <div
        v-for="(img, idx) in imgs"
        :key="idx"
        class="pic"
        @click="() => show(idx)"
      >
        <img :src="img.src ? img.src : img" />
      </div>
    </div>

    <component
      v-if="dynamicComponent"
      :is="dynamicComponent"
      :visible="visible"
      :index="index"
      :imgs="imgs"
      @hide="visible = false"
      @on-prev-click="handlePrevClick"
      @on-next-click="handleNextClick"
    ></component>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        dynamicComponent: null,
        imgs: [
          {
            title: "img's url: https://i.loli.net/2018/11/10/5be6852cdb002.jpeg",
            src: ' https://i.loli.net/2018/11/10/5be6852cdb002.jpeg'
          },
          {
            title: "There is img's description",
            src: 'https://i.loli.net/2018/11/10/5be6852ce6965.jpeg'
          },
          'https://i.loli.net/2018/11/10/5be6852dec46e.jpeg'
        ],
        visible: false,
        index: 0 // default
      }
    },
    mounted() {
      import('vue-easy-lightbox').then((module) => {
        this.dynamicComponent = module.default
      })
    },
    methods: {
      show(index) {
        this.index = index
        this.visible = true
      },
      handlePrevClick(oldIndex, newIndex) {
        console.log('when next btn click ----')
        console.log('oldIndex of imgs:', oldIndex)
        console.log('newIndex of imgs:', newIndex)
      },
      handleNextClick(oldIndex, newIndex) {
        console.log('when next btn click ----')
        console.log('oldIndex of imgs:', oldIndex)
        console.log('newIndex of imgs:', newIndex)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .homepage-demo {
    ::v-deep {
      img.vel-img {
        max-width: 80vw;

        @media screen and (max-width: 750px) {
          max-width: 85vw;
        }
      }
    }

    .gallery {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }

    .pic {
      cursor: pointer;
      margin: 4px;

      img {
        height: 100px;
        width: 100px;
        object-fit: cover;

        @media screen and (min-width: 800px) {
          height: 200px;
          width: 200px;
        }
      }
    }
  }
</style>
