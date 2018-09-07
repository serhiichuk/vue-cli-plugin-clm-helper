import store from '@/app-helper/store'

export default (id) => {
  let result;
  store.getters.structure.forEach(sl => {
    if (id === sl.id) result = sl
  });

  if (!result) throw new Error(`Slide with id: "${id}" not founded in structure!`);

  return result
}
