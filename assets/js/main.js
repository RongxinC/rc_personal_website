/* Academic Pages — JS helpers */

document.addEventListener("DOMContentLoaded", function () {

  // Publication filter buttons
  const filterBtns = document.querySelectorAll(".pub-filter-btn");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      const items = document.querySelectorAll(".pub-item");
      items.forEach(function (item) {
        if (filter === "all" || item.dataset.status === filter) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });

      // Show/hide year group headers when all items in them are hidden
      const groups = document.querySelectorAll(".pub-year-group");
      groups.forEach(function (group) {
        const visible = group.querySelectorAll('.pub-item[style="display: flex;"], .pub-item:not([style])');
        const allHidden = Array.from(group.querySelectorAll(".pub-item")).every(
          function (i) { return i.style.display === "none"; }
        );
        group.style.display = allHidden ? "none" : "block";
      });
    });
  });
});
