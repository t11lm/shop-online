export function initSwiper() {
    const swiperContainer = document.querySelector('.swiper');
  
    if (!swiperContainer) return;
  
    const swiper = new Swiper(swiperContainer, {
      slidesPerView: 4,
      spaceBetween: 20,
      navigation: {
        nextEl: '.day-products__navigation-btn--next',
        prevEl: '.day-products__navigation-btn--prev',
      },
    });
}