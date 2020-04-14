$(document).ready(function() {
  function showDrugComponents(drugName) {
    $(".ingridients__item").each(function() {
      const name = $(this).data("name");
      console.log(name,drugName);
      if (name.includes(drugName)) {
        $(this).removeClass("hide");
      } else {
        $(this).addClass("hide");
      }
    })
  }

  function handleMouseEvent(event) {
    $(".cards__item.active").removeClass("active");
    $(this).addClass("active");
    const drugName = $(this).data("drug");
    console.log($(this));
    console.log(drugName);
    showDrugComponents(drugName);
  }


  function switchCardToClickMode() {
    $(".cards__item").each(function() {
      $(this).unbind('mouseover', handleMouseEvent)
      $(this).unbind('click', handleMouseEvent)
      $(this).click(handleMouseEvent)
    })
  }

  function switchCardToHoverMode() {
    $(".cards__item").each(function() {
      $(this).unbind('mouseover', handleMouseEvent)
      $(this).unbind('click', handleMouseEvent)
      $(this).mouseover(handleMouseEvent)
    })
  }

  function handleResizeEvent() {
		if ($(window).width() <= 1200) {
			switchCardToClickMode()
		} else {
			switchCardToHoverMode()
		}
	}

	handleResizeEvent();

	$(window).resize(handleResizeEvent);
});