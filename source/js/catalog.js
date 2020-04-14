$(document).ready(function() {
  function showDrugComponents(drugName) {
    $(".catalog__item").each(function() {
      const name = $(this).data("name");
      console.log(name, drugName);
      if (name !== drugName) {
        $(this).addClass("hide");
      } else {
        $(this).removeClass("hide");
      }
    })
  }

  $(".range__item").each(function() {
    $(this).click(function(event) {
      $(".range__item").removeClass("active");
      $(this).addClass("active");
      const drugName = $(this).data("drug");
      showDrugComponents(drugName);
    })
  })
});