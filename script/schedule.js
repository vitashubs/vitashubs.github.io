var leftArrow = document.getElementsByClassName("arrow-left")[0];
var rightArrow = document.getElementsByClassName("arrow-right")[0];
var schedule = document.getElementsByClassName("schedule")[0];
var scheduleItem = schedule.children[1];

leftArrow.addEventListener("click", function() {
    schedule.scrollBy((-1 * scheduleItem.offsetWidth) + 20, 0);
});

rightArrow.addEventListener("click", function() {
    schedule.scrollBy(scheduleItem.offsetWidth - 20, 0);
});

// click and drag

// const pointerScroll = (elem) => {
//     const dragStart = (ev) => elem.setPointerCapture(ev.pointerId);
//     const dragEnd = (ev) => elem.releasePointerCapture(ev.pointerId);
//     const drag = (ev) => elem.hasPointerCapture(ev.pointerId) && (elem.scrollLeft -= ev.movementX);

//     elem.addEventListen("pointerdown", dragStart);
//     elem.addEventListen("pointerup", dragEnd);
//     elem.addEventListen("pointermove", drag);
// }

// document.querySelectorAll(".schedule").forEach(pointerScroll);