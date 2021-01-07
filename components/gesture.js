AFRAME.registerComponent("gesture", {
    init: function() {
      var element = document.querySelector('body');
      this.marker = document.querySelector('a-marker')
      var model = document.querySelector('a-collada-model');
      var hammertime = new Hammer(element);
      var pinch = new Hammer.Pinch(); // Pinch is not by default in the recognisers
      hammertime.add(pinch); // add it to the Manager instance

      hammertime.on('pan', (ev) => {
        let rotation = model.getAttribute("rotation")
        switch(ev.direction) {
          case 2:
            rotation.y = rotation.y + 4
            break;
          case 4:
            rotation.y = rotation.y - 4
            break;
          case 8:
            rotation.x = rotation.x + 4
            break;
          case 16:
            rotation.x = rotation.x - 4
            break;
          default:
            break;
        }
        model.setAttribute("rotation", rotation)
      });

     hammertime.on("pinch", (ev) => {
        let scale = {x:ev.scale, y:ev.scale, z:ev.scale}
        model.setAttribute("scale", scale);
    });
  }
});