"use client";

import { useEffect } from "react";

export function useCardScroll() {
  useEffect(() => {
    // Get the scroll container
    const scrollContainer = document.querySelector(".cards-scroll-container");
    const leftButton = document.querySelector(".scroll-button-left");
    const rightButton = document.querySelector(".scroll-button-right");
    const dots = document.querySelectorAll(
      ".flex.justify-center.mt-4.gap-2 button",
    );

    if (!scrollContainer || !leftButton || !rightButton) return;

    // Calculate the width of a card + gap
    const cardWidth = 180 + 16; // width + gap

    // Scroll left
    leftButton.addEventListener("click", () => {
      scrollContainer.scrollBy({ left: -cardWidth * 3, behavior: "smooth" });
      updateActiveDot();
    });

    // Scroll right
    rightButton.addEventListener("click", () => {
      scrollContainer.scrollBy({ left: cardWidth * 3, behavior: "smooth" });
      updateActiveDot();
    });

    // Update active dot based on scroll position
    const updateActiveDot = () => {
      if (!scrollContainer || !dots.length) return;

      const scrollPosition = scrollContainer.scrollLeft;
      const containerWidth = scrollContainer.clientWidth;
      const scrollWidth = scrollContainer.scrollWidth;

      // Calculate which page we're on
      const totalPages = Math.ceil(scrollWidth / containerWidth);
      const currentPage = Math.round(
        scrollPosition / (scrollWidth / totalPages),
      );

      // Update dots
      dots.forEach((dot, index) => {
        if (index === currentPage) {
          dot.classList.remove("bg-gray-300");
          dot.classList.add("bg-black");
        } else {
          dot.classList.remove("bg-black");
          dot.classList.add("bg-gray-300");
        }
      });
    };

    // Add scroll event listener to update dots
    scrollContainer.addEventListener("scroll", updateActiveDot);

    // Add click handlers to dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        const containerWidth = scrollContainer.clientWidth;
        const scrollTo =
          (scrollContainer.scrollWidth - containerWidth) *
          (index / (dots.length - 1));
        scrollContainer.scrollTo({ left: scrollTo, behavior: "smooth" });
      });
    });

    // Initial update
    updateActiveDot();

    // Cleanup
    return () => {
      if (leftButton) leftButton.removeEventListener("click", () => {});
      if (rightButton) rightButton.removeEventListener("click", () => {});
      if (scrollContainer)
        scrollContainer.removeEventListener("scroll", updateActiveDot);
      dots.forEach((dot) => dot.removeEventListener("click", () => {}));
    };
  }, []);

  return null;
}
