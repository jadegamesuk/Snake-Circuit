AFRAME.registerComponent("fruit-action", {
  init: function () {
    let el = this.el;

    el.addEventListener("hitstart", function snakeCollisionHandler(event) {
      //removing event listener
      el.removeEventListener("hitstart", snakeCollisionHandler);

      // Returning Fruit to Pool
      let FruitpoolName = event.target.id;
      let poolName = "pool__" + FruitpoolName.substring(6);
      console.log("============================");
      console.log("Pool Name: ", poolName);
      console.log("Fruit Is: ", FruitpoolName);
      document
        .querySelector("#" + FruitpoolName)
        .components[poolName].returnEntity(el);

      //adding event listener
      el.addEventListener("hitstart", snakeCollisionHandler);
    });
  },
});
