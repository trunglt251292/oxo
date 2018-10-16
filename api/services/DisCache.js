import Cache from 'async-disk-cache';
let cache = new Cache('my-cache');

cache.clear()
  .then(() => {
    console.log('clear all cached done.');
    // test();
  });

export function set(key, value) {
  return cache.set(key, value);
}

export async function get(key) {
  let cached = await cache.get(key);
  if(cached.isCached) {
    return JSON.parse(cached.value);
  }
  return null;
}

async function test() {
  await set('test', JSON.stringify({a: 1, b: 2}));
  let cached = await get('test');
  console.log('value:', cached);
}


