var modelSelected = false;

AFRAME.registerComponent('a-frame-to-html', {

  init: function () {
    let cuteModel = document.querySelector('#cuteModel');

    cuteModel.addEventListener('mousedown', (e) => {
      // this.el.setAttribute('modelSelected', 'a-frame-to-html', true);
      modelSelected = true;
      if (modelSelected) {
          document.querySelector('#message').innerHTML = "cute monster is selected";
      }
        else {
          document.querySelector('#message').innerHTML = "";
      }
      console.log(modelSelected);
      console.log("mousedown");
    })

    cuteModel.addEventListener('mouseup', (e) => {
      modelSelected = false;
      if (modelSelected) {
          document.querySelector('#message').innerHTML = "cute monster is selected";
      }
        else {
          document.querySelector('#message').innerHTML = "";
      }
      console.log(modelSelected);
      console.log("mouseup");
    })
  }
});