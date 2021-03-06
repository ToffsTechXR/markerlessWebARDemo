/* global AFRAME, THREE */

var customElement;

AFRAME.registerComponent("gesture-handler", {
    schema: {
      enabled: { default: true },
      rotationFactor: { default: 5 },
      minScale: { default: 0.3 },
      maxScale: { default: 8 },
    },
  
    init: function () {
      this.handleScale = this.handleScale.bind(this);
      this.handleRotation = this.handleRotation.bind(this);
      this.handlePosition = this.handlePosition.bind(this);
  
      this.isVisible = true;
      this.initialScale = this.el.object3D.scale.clone();
      this.scaleFactor = 1;
    },
  
    update: function () {
      if (this.data.enabled) {
        customElement = this.el.sceneEl;
        this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
        this.el.sceneEl.addEventListener("onefingermove", this.handlePosition);
        this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
      } else {
        this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
        this.el.sceneEl.removeEventListener("onefingermove", this.handlePosition);
        this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
      }
    },
  
    remove: function () {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("onefingermove", this.handlePosition);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    },
  
    handleRotation: function (event) {
      if (this.isVisible && !modelSelected) {
        this.el.object3D.rotation.y +=
          event.detail.positionChange.x * this.data.rotationFactor * 0.01;
        this.el.object3D.rotation.x +=
          event.detail.positionChange.y * this.data.rotationFactor * 0.01;
      }
    },

    handlePosition: function (event) {
      if (this.isVisible && modelSelected) {
        this.el.object3D.position.y -=
          event.detail.positionChange.y * this.data.rotationFactor * 0.1;
        this.el.object3D.position.x +=
          event.detail.positionChange.x * this.data.rotationFactor * 0.1;
      }
    },
  
    handleScale: function (event) {
      if (this.isVisible && !modelSelected) {
        this.scaleFactor *=
          1 + event.detail.spreadChange / event.detail.startSpread;
  
        this.scaleFactor = Math.min(
          Math.max(this.scaleFactor, this.data.minScale),
          this.data.maxScale
        );
  
        this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
        this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
        this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
      }
    },
  });