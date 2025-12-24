document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const publicationEntries = document.querySelectorAll(".publication-entry");
  const bibliographyItems = document.querySelectorAll(".bibliography > li");
  const yearHeaders = document.querySelectorAll("h2.bibliography, h3.bibliography");
  const yearLists = document.querySelectorAll(".bibliography > ol");

  // Get the parent row element for each publication entry
  function getPublicationRow(element) {
    let current = element;
    while (current && !current.classList.contains("publication-row")) {
      current = current.parentElement;
    }
    return current;
  }

  function applyFilter(filterType) {
    let visibleCount = 0;

    // Filter publication entries
    publicationEntries.forEach((entry) => {
      const row = getPublicationRow(entry);
      if (!row) return;

      let shouldShow = false;

      if (filterType === "all") {
        shouldShow = true;
      } else if (filterType === "published") {
        shouldShow = entry.dataset.status === "published";
      } else if (filterType === "in-review") {
        shouldShow = entry.dataset.status === "in-review";
      } else if (filterType === "first-author") {
        shouldShow = entry.dataset.firstAuthor === "true";
      } else if (filterType === "journal") {
        shouldShow = entry.dataset.publicationType === "journal";
      } else if (filterType === "conference") {
        shouldShow = entry.dataset.publicationType === "conference";
      }

      if (shouldShow) {
        row.classList.remove("hidden");
        entry.classList.remove("hidden");
        visibleCount++;
      } else {
        row.classList.add("hidden");
        entry.classList.add("hidden");
      }
    });

    // Hide/show bibliography list items
    bibliographyItems.forEach((item) => {
      const entry = item.querySelector(".publication-entry");
      if (entry) {
        const row = getPublicationRow(entry);
        if (row && row.classList.contains("hidden")) {
          item.classList.add("hidden");
        } else {
          item.classList.remove("hidden");
        }
      }
    });

    // Hide year headers and lists if all items in that year are hidden
    yearHeaders.forEach((header) => {
      let iterator = header.nextElementSibling;
      let hasVisibleItems = false;

      while (iterator && iterator.tagName !== "H2" && iterator.tagName !== "H3") {
        if (iterator.tagName === "OL") {
          const visibleItems = iterator.querySelectorAll(":scope > li:not(.hidden)");
          if (visibleItems.length > 0) {
            hasVisibleItems = true;
            break;
          }
        }
        iterator = iterator.nextElementSibling;
      }

      if (hasVisibleItems) {
        header.classList.remove("hidden");
        // Show the OL that follows
        iterator = header.nextElementSibling;
        while (iterator && iterator.tagName !== "H2" && iterator.tagName !== "H3") {
          if (iterator.tagName === "OL") {
            iterator.classList.remove("hidden");
          }
          iterator = iterator.nextElementSibling;
        }
      } else {
        header.classList.add("hidden");
        // Hide the OL that follows
        iterator = header.nextElementSibling;
        while (iterator && iterator.tagName !== "H2" && iterator.tagName !== "H3") {
          if (iterator.tagName === "OL") {
            iterator.classList.add("hidden");
          }
          iterator = iterator.nextElementSibling;
        }
      }
    });
  }

  // Add click handlers to filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");
      // Apply the filter
      const filterType = this.dataset.filter;
      applyFilter(filterType);
    });
  });

  // Initialize with "all" filter
  applyFilter("all");
});

