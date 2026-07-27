import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@stothras_items_v1';

export const DEFAULT_ITEMS = [
  { id: '1', title: 'Lalitha Sahasranamam', videoId: 'WjHZ0mLUMWk' },
  { id: '2', title: 'Aditya Hrudayam', videoId: 'wsaKgavtI0w' },
  { id: '3', title: 'Hanuman Chalisa', videoId: '6XcSQL9lbjo' },
  { id: '4', title: 'Kanakadhara Stothram', videoId: 'Pn2oDZh96lo' },
  { id: '5', title: 'Surya Ashtakam', videoId: '6Tes5NtN8pw' },
];

export async function getItems() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ITEMS));
    return DEFAULT_ITEMS;
  } catch (e) {
    return DEFAULT_ITEMS;
  }
}

export async function saveItems(items) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function addItem(item) {
  const items = await getItems();
  const newItem = { ...item, id: Date.now().toString() };
  const updated = [...items, newItem];
  await saveItems(updated);
  return updated;
}

export async function updateItem(id, updates) {
  const items = await getItems();
  const updated = items.map((i) => (i.id === id ? { ...i, ...updates } : i));
  await saveItems(updated);
  return updated;
}

export async function deleteItem(id) {
  const items = await getItems();
  const updated = items.filter((i) => i.id !== id);
  await saveItems(updated);
  return updated;
}

export async function resetToDefault() {
  await saveItems(DEFAULT_ITEMS);
  return DEFAULT_ITEMS;
}
