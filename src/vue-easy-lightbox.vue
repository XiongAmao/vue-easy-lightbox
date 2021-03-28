<template>
  <transition :name="`${prefixCls}-fade`">
    <div
      v-if="visible"
      :class="[`${prefixCls}-img-modal`, `${prefixCls}-modal`]"
      @click.self="closeDialog"
    >
      <transition
        :name="`${prefixCls}-fade`"
        mode="out-in"
      >
        <slot
          v-if="status.loading"
          name="loading"
          key="loading"
        >
          <img-loading key="img-loading" />
        </slot>

        <slot
          v-else-if="status.loadError"
          name="onerror"
          key="onerror"
        >
          <img-on-error key="img-on-error" />
        </slot>

        <div
          v-else-if="!status.loading && !status.loadError"
          :class="`${prefixCls}-img-wrapper`"
          :style="imgWrapperStyle"
          key="img-wrapper"
        >
          <img
            ref="imgRef"
            draggable="false"
            :class="`${prefixCls}-img`"
            :src="currentImgSrc"
            @mousedown="onMouseDown($event)"
            @mouseup="onMouseUp($event)"
            @mousemove="onMouseMove($event)"
            @touchstart="onTouchStart($event)"
            @touchmove="onTouchMove($event)"
            @touchend="onTouchEnd($event)"
            @load="onImgLoad"
          />
        </div>
      </transition>

      <!-- use for load -->
      <img
        style="display:none;"
        :src="currentImgSrc"
        @error="onTestImgError"
        @load="onTestImgLoad"
      />

      <!-- btns -->
      <div :class="`${prefixCls}-btns-wrapper`">
        <slot
          name="prev-btn"
          :prev="onPrevClick"
        >
          <div
            v-if="imgList.length !== 1"
            class="btn__prev"
            :class="{ disable: imgIndex === 0 || imgIndex > imgList.length }"
            @click="onPrevClick"
          >
            <svg-icon type="prev" />
          </div>
        </slot>

        <slot
          name="next-btn"
          :next="onNextClick"
        >
          <div
            v-if="imgList.length !== 1"
            class="btn__next"
            :class="{ disable: imgIndex >= imgList.length - 1 }"
            @click="onNextClick"
          >
            <svg-icon type="next" />
          </div>
        </slot>

        <slot
          name="close-btn"
          :close="closeDialog"
        >
          <div
            class="btn__close"
            @click="closeDialog"
          >
            <svg-icon type="close" />
          </div>
        </slot>

        <slot
          v-if="imgTitle && !titleDisabled && !status.loading && !status.loadError"
          name="title"
        >
          <img-title>{{ imgTitle }}</img-title>
        </slot>

        <slot
          name="toolbar"
          :toolbarMethods="{
            zoomOut,
            rotate: rotateLeft,
            rotateLeft,
            rotateRight,
            resize
          }"
        >
          <toolbar
            :prefixCls="prefixCls"
            :zoomIn="zoomIn"
            :zoomOut="zoomOut"
            :rotateLeft="rotateLeft"
            :rotateRight="rotateRight"
            :resize="resize"
          />
        </slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./vue-easy-lightbox.ts"></script>
