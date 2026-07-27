import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useStothras } from '../context/StothrasContext';
import colors from '../theme/colors';

export default function ManageScreen({ navigation }) {
  const { items, remove, reset } = useStothras();

  const confirmDelete = (item) => {
    Alert.alert('Delete', `Remove "${item.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => remove(item.id) },
    ]);
  };

  const confirmReset = () => {
    Alert.alert('Reset', 'Restore default stothras list? This removes your customizations.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: reset },
    ]);
  };

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color={colors.headerText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Stothras</Text>
        <TouchableOpacity onPress={confirmReset}>
          <Ionicons name="refresh" size={24} color={colors.headerText} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSub}>ID: {item.videoId}</Text>
            </View>
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Edit', { item })}>
              <Ionicons name="create-outline" size={22} color={colors.accent} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={() => confirmDelete(item)}>
              <Ionicons name="trash-outline" size={22} color={colors.danger} />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('Edit')}>
        <Ionicons name="add" size={28} color="#fff" />
        <Text style={styles.addBtnText}>Add New Stothram</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.headerText },
  list: { paddingHorizontal: 20, paddingBottom: 100 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.cardText },
  cardSub: { fontSize: 12, color: '#999', marginTop: 2 },
  iconBtn: { padding: 6, marginLeft: 4 },
  addBtn: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: colors.accent,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 6 },
});
