<template>
  <div id="app">
    <div class="container">
      <h1> vue-easy-lightbox </h1>
      <div class="gallery">
        <div class="pic" @click="show(0)">
          <img src="http://ond8gcwbr.bkt.clouddn.com/18-2-23/91783066.jpg" alt="">
        </div>
        <div class="pic" @click="show(1)">
          <img src="http://ond8gcwbr.bkt.clouddn.com/18-2-23/30955526.jpg" alt="">
        </div>
        <div class="pic" @click="show(2)">
          <img src="http://ond8gcwbr.bkt.clouddn.com/18-2-23/97656858.jpg" alt="">
        </div>
        <div class="pic" @click="show(3)">
          <img src="http://ond8gcwbr.bkt.clouddn.com/18-2-23/83701379.jpg" alt="">
        </div>
      </div>

      <vue-easy-lightbox
        :visible="visible"
        :index="index"
        :imgs="imgs"
        @hide="handleHide"></vue-easy-lightbox>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [
        'http://ond8gcwbr.bkt.clouddn.com/18-2-23/91783066.jpg',
        'http://ond8gcwbr.bkt.clouddn.com/18-2-23/30955526.jpg',
        'http://ond8gcwbr.bkt.clouddn.com/18-2-23/97656858.jpg',
        'http://ond8gcwbr.bkt.clouddn.com/18-2-23/83701379.jpg',
        'http://via.placeholder.com/50x50'
      ],
      visible: false
    }
  },
  methods: {
    show(index) {
      this.index = index
      this.visible = true
    },
    handleHide() {
      this.visible = false
    }
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    color: #50d1c1;
  }
  .gallery{
    width: 80%;
    max-width: 980px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .pic{
    width: calc(50% - 30px);
    margin: 15px;
    cursor: pointer;
  }
  .pic:hover img{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0);
    transform: scale(1.01)
  }
  img{
    width: 100%;
    transition: .3s ease;
  }
  .btn{
    cursor: pointer;
    outline: none;
    text-decoration: none;
    text-align: center;
    font-size: 20px;
    line-height: 50px;
    height: 50px;
    padding: 0 8px;
    margin-left: 20px;
    background-color: #50d1c1;
    border-color: #50d1c1;
    border-radius: 4px;
    color: #FFF;
    transition: .3s;
  }
  .btn:active{
    color: #ccc;
    background-color: #6AB5AE;
    border-color: #6AB5AE;
    outline: none;
  }
</style>
