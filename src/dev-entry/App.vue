<script lang="tsx">
import { defineComponent } from 'vue'
import VueEasyLightbox from '../index'

export default defineComponent({
  components: {
    VueEasyLightbox
  },
  data() {
    return {
      imgs: [
        {
          title: "img's url: https://i.loli.net/2018/11/10/5be6852cdb002.jpeg",
          src: ' https://i.loli.net/2018/11/10/5be6852cdb002.jpeg'
        },
        {
          title: "There is img's description",
          src: 'https://i.loli.net/2018/11/10/5be6852ce6965.jpeg'
        },
        'https://via.placeholder.com/300',
        'https://i.loli.net/2018/11/10/5be6852dec46e.jpeg',
        'https://i.loli.net/2018/11/10/5be6852e1366d.jpeg',
        'https://i.loli.net/2018/11/10/5be6852e33f19.jpeg',
        'https://i.loli.net/2018/11/10/5be6852dec46e.jpeg',
        'https://i.loli.net/2018/11/10/5be6852e1366d.jpeg',
        'https://i.loli.net/2018/11/10/5be6852e33f19.jpeg',
        'https://example.com/asdf.jpeg'
      ],
      visible: false,
      index: 0 // default
    }
  },
  methods: {
    show(index: number) {
      this.index = index
      this.visible = true
    },
    handleHide() {
      this.visible = false
    },
    handleIndexChange() {
      // old: number, newIndex: number
      // if (newIndex === 5) {
      //   setTimeout(() => {
      //     this.imgs.push('https://i.loli.net/2018/11/10/5be6852e33f19.jpeg')
      //   }, 1000)
      // }
    },
    log(...arg: unknown[]) {
      console.log('---------')
      console.log(arg)
    }
  },
  render() {
    const imgs = this.imgs.map((img, idx) => {
      const Img = (
        <img
          src={typeof img === 'string' ? img : img.src}
          alt=""
        />
      )
      return (
        <div
          key={idx}
          class="pic"
          onClick={() => this.show(idx)}
        >
          {idx === 5 ? <div> error img url</div> : ''}
          {Img}
        </div>
      )
    })
    // const slots = {
    //   'next-btn': (props: { next: () => void }) => {
    //     const click = () => {
    //       console.log(props)
    //       props.next()
    //     }
    //     return <div onClick={click}>TestNextBtn</div>
    //   }
    // }
    return (
      <div id="app">
        <div class="container">
          <h1>vue-easy-lightbox</h1>
          <div class="gallery">{imgs}</div>
          <VueEasyLightbox
            scrollDisabled
            visible={this.visible}
            index={this.index}
            imgs={this.imgs}
            onHide={this.handleHide}
            onOnIndexChange={this.log}
            onOnPrev={this.log}
            onOnError={this.log}
            maskClosable={false}
          ></VueEasyLightbox>
        </div>
      </div>
    )
  }
})
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
.gallery {
  width: 80%;
  max-width: 980px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.pic {
  width: calc(50% - 30px);
  margin: 15px;
  cursor: pointer;
}
.pic:hover img {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0);
  transform: scale(1.01);
}
img {
  width: 100%;
  transition: 0.3s ease;
}
.btn {
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
  color: #fff;
  transition: 0.3s;
}
.btn:active {
  color: #ccc;
  background-color: #6ab5ae;
  border-color: #6ab5ae;
  outline: none;
}
</style>
