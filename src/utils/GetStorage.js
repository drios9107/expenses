export default function GetStorage() {
  const getFromStorage = (key, storage = 'localStorage') => window?.[storage]?.getItem(key)
  const setInStorage = (key, value, storage = 'localStorage') => window?.[storage]?.setItem(key, value)
  const removeFromStorage = (key, storage = 'localStorage') => window?.[storage]?.removeItem(key)

  return {
    getFromStorage,
    setInStorage,
    removeFromStorage,
  };
}
