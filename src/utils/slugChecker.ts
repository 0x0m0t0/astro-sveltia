// function getCurrentPageSlug() {
//   if (window.location.pathname === "/") {
//     return "home";
//   } else {
//     const pathArray = window.location.pathname
//       .split("/")
//       .filter((part) => part.trim() !== ""); // Split the URL path
//     const slug = pathArray[pathArray.length - 1]; // Get the last part as the slug
//     return slug;
//   }
// }

// const currentSlug = getCurrentPageSlug();

// const checkboxes = document.querySelectorAll('.check input[type="checkbox"]');

// checkboxes.forEach((cb) => {
//   if (cb.id === currentSlug) {
//     cb.checked = true; // Check the checkbox with the matching ID
//   }
// });

// checkboxes.forEach((checkbox) => {
//   checkbox.addEventListener("click", function (event) {
//     checkboxes.forEach((cb) => {
//       const parent = cb.parentElement;
//       if (cb !== event.target) {
//         cb.checked = false;
//         parent.classList.remove("selected");
//       }
//     });

//     const parent = event.target.parentElement;
//     if (event.target.checked) {
//       parent.classList.add("selected"); // Add class to the clicked checkbox
//     } else {
//       parent.classList.remove("selected"); // Remove class if unchecked
//     }
//   });
// });

export const getNav = () => {
  function getCurrentPageSlug(): string {
    if (window.location.pathname === "/") {
      return "home";
    } else {
      const pathArray: string[] = window.location.pathname
        .split("/")
        .filter((part) => part.trim() !== ""); // Split the URL path
      const slug: string = pathArray[pathArray.length - 1]; // Get the last part as the slug
      return slug;
    }
  }

  const currentSlug: string = getCurrentPageSlug();

  const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    '.check input[type="checkbox"]'
  );

  checkboxes.forEach((cb: HTMLInputElement) => {
    if (cb.id === currentSlug) {
      cb.checked = true; // Check the checkbox with the matching ID
    }
  });

  checkboxes.forEach((checkbox: HTMLInputElement) => {
    checkbox.addEventListener("click", function (event: Event) {
      checkboxes.forEach((cb: HTMLInputElement) => {
        const parent: HTMLElement = cb.parentElement as HTMLElement;
        if (cb !== event.target) {
          cb.checked = false;
          parent.classList.remove("selected");
        }
      });

      const parent: HTMLElement = (event.target as HTMLInputElement)
        .parentElement as HTMLElement;
      if ((event.target as HTMLInputElement).checked) {
        parent.classList.add("selected"); // Add class to the clicked checkbox
      } else {
        parent.classList.remove("selected"); // Remove class if unchecked
      }
    });
  });
};
