import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useStothras } from '../context/StothrasContext';
import { extractVideoId } from '../utils/youtube';
import colors from '../theme/colors';

export default function EditScreen({ navigation, route }) {
  const editingItem = route.params?.item;
  const { addNew, edit } = useStothras();
  const [title, setTitle] = useState(editingItem?.title || '');
  const [url, setUrl] = useState(
    editingItem ? `https://www.youtube.com/watch?v=${editingItem.videoId}` : ''
  );

  const onSave = async () => {
    if (!title.trim()) {
      Alert.alert('Missing title', 'Please enter a title for this stothram.');
      return;
    }
    const videoId = extractVideoId(url);
    if (!videoId) {
      Alert.alert('Invalid link', 'Please paste a valid YouTube link.');
      return;
    }
    if (editingItem) {
      await edit(editingItem.id, { title: title.trim(), videoId });
    } else {
      await addNew({ title: title.trim(), videoId });
    }
    navigation.goBack();
  };

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color={colors.headerText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{editingItem ? 'Edit Stothram' : 'Add Stothram'}</Text>
          <View style={{ width: 28 }} />
        </View>

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Vishnu Sahasranamam"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>YouTube Link</Text>
        <TextInput
          style={styles.input}
          placeholder="Paste any YouTube link here"
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.hint}>Works with normal, share, or embed links.</Text>

        <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  scroll: { paddingHorizontal: 20, paddingBottom: 60 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.headerText },
  label: { fontSize: 14, fontWeight: '600', color: colors.cardText, marginBottom: 6, marginTop: 16 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  hint: { fontSize: 12, color: '#999', marginTop: 6 },
  saveBtn: { backgroundColor: colors.accent, borderRadius: 30, paddingVertical: 16, alignItems: 'center', marginTop: 36 },
  saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
