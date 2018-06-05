/**
 * Navigation when slide opened in desktop browser
 * and slide folders located beyond root directory
 * and the slide folder name is the same as the slide file name
 *
 * @param slide
 */
export default (slide) => {
  const href = window.location.href.split('/').slice(0, -3);
  href.push(slide);
  href.push(slide + '.html');

  window.location.assign(href.join('/'))
}
