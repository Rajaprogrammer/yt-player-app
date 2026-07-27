import { Linking, Platform, Alert } from 'react-native';

export function extractVideoId(input) {
  if (!input) return null;
  const trimmed = input.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  const patterns = [
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const p of patterns) {
    const match = trimmed.match(p);
    if (match) return match[1];
  }
  return null;
}

export async function openYouTube(videoId) {
  if (!videoId) {
    Alert.alert('Oops', 'This video link seems invalid.');
    return;
  }

  const appUrl = Platform.select({
    ios: `youtube://${videoId}`,
    android: `vnd.youtube://${videoId}`,
    default: `https://www.youtube.com/watch?v=${videoId}`,
  });
  const webUrl = `https://www.youtube.com/watch?v=${videoId}`;

  try {
    const supported = await Linking.canOpenURL(appUrl);
    if (supported) {
      await Linking.openURL(appUrl);
      return;
    }
  } catch (e) {
    // fall through to web
  }

  try {
    await Linking.openURL(webUrl);
  } catch (e) {
    Alert.alert('Error', 'Could not open YouTube.');
  }
}
