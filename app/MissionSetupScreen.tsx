import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const API_URL = 'http://localhost:3001/suggest-actions'; // Change to your proxy URL

export default function MissionSetupScreen() {
  const [goal, setGoal] = useState('');
  const [actions, setActions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal }),
      });
      const data = await response.json();
      // Parse checklist from model output (assume bullet points or checklist)
      const text = data[0]?.generated_text || data.generated_text || data || '';
      const checklist = text.split(/\n|\r/).filter(line => line.match(/\w/)).map(line => line.replace(/^[-*\[\] ]+/, ''));
      setActions(checklist);
    } catch (e) {
      setError('Failed to generate actions.');
    }
    setLoading(false);
  };

  const handleActionChange = (text: string, idx: number) => {
    setActions(actions.map((a, i) => (i === idx ? text : a)));
  };

  const handleAddAction = () => setActions([...actions, '']);
  const handleRemoveAction = (idx: number) => setActions(actions.filter((_, i) => i !== idx));

  const handleSave = () => {
    // TODO: Save mission and actions to WatermelonDB
    alert('Mission saved!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mission Setup</Text>
      <Text style={styles.label}>Define your goal:</Text>
      <View style={styles.inputBox}>
        <Text style={styles.inputTemplate}>I will </Text>
        <TextInput
          style={styles.input}
          placeholder="Publish a novel by 12/31/2024"
          placeholderTextColor="#d4af37"
          value={goal}
          onChangeText={setGoal}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGenerate} disabled={loading || !goal}>
        <Text style={styles.buttonText}>Generate Actions</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator color="#d4af37" style={{ margin: 16 }} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {actions.length > 0 && (
        <>
          <Text style={styles.label}>Subscribe to daily actions:</Text>
          <FlatList
            data={actions}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.actionRow}>
                <TextInput
                  style={styles.actionInput}
                  value={item}
                  onChangeText={text => handleActionChange(text, index)}
                  placeholder="Action"
                  placeholderTextColor="#d4af37"
                />
                <TouchableOpacity onPress={() => handleRemoveAction(index)}>
                  <Text style={styles.remove}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
            ListFooterComponent={
              <TouchableOpacity onPress={handleAddAction} style={styles.addAction}>
                <Text style={styles.addActionText}>+ Add Action</Text>
              </TouchableOpacity>
            }
          />
          <TouchableOpacity style={styles.beginButton} onPress={handleSave}>
            <Text style={styles.beginButtonText}>BEGIN</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#d4af37',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  label: {
    color: '#d4af37',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d4af37',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#222',
  },
  inputTemplate: {
    color: '#d4af37',
    fontSize: 16,
  },
  input: {
    flex: 1,
    color: '#d4af37',
    fontSize: 16,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#d4af37',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 8,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionInput: {
    flex: 1,
    color: '#d4af37',
    backgroundColor: '#222',
    borderColor: '#d4af37',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
  remove: {
    color: '#d4af37',
    fontSize: 20,
    marginLeft: 8,
  },
  addAction: {
    alignItems: 'center',
    marginVertical: 8,
  },
  addActionText: {
    color: '#d4af37',
    fontSize: 16,
  },
  beginButton: {
    backgroundColor: '#d4af37',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  beginButtonText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 22,
  },
}); 