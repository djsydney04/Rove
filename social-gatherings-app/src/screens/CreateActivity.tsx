import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const CreateActivityForm = ({ navigation }) => {
  const [activity, setActivity] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxParticipants: '',
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitAnim = new Animated.Value(1);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setActivity(prev => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  const handleSubmit = () => {
    if (!activity.title || !activity.description || !activity.date || !activity.location) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Animate button press
    Animated.sequence([
      Animated.timing(submitAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(submitAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigation.navigate('My Activities');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create Activity</Text>
        </View>

        <View style={styles.form}>
          <TouchableOpacity 
            style={styles.imageUpload}
            onPress={pickImage}
          >
            {activity.image ? (
              <Image source={{ uri: activity.image }} style={styles.uploadedImage} />
            ) : (
              <>
                <Ionicons name="image-outline" size={32} color="#000000" />
                <Text style={styles.uploadText}>Upload Cover Image</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title*</Text>
            <TextInput
              style={styles.input}
              value={activity.title}
              onChangeText={(text) => setActivity(prev => ({ ...prev, title: text }))}
              placeholder="Give your activity a name"
              placeholderTextColor="#00000080"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description*</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={activity.description}
              onChangeText={(text) => setActivity(prev => ({ ...prev, description: text }))}
              placeholder="What's this activity about?"
              placeholderTextColor="#00000080"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Date*</Text>
              <TextInput
                style={styles.input}
                value={activity.date}
                onChangeText={(text) => setActivity(prev => ({ ...prev, date: text }))}
                placeholder="MM/DD/YYYY"
                placeholderTextColor="#00000080"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Time</Text>
              <TextInput
                style={styles.input}
                value={activity.time}
                onChangeText={(text) => setActivity(prev => ({ ...prev, time: text }))}
                placeholder="HH:MM AM/PM"
                placeholderTextColor="#00000080"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location*</Text>
            <TextInput
              style={styles.input}
              value={activity.location}
              onChangeText={(text) => setActivity(prev => ({ ...prev, location: text }))}
              placeholder="Where will this take place?"
              placeholderTextColor="#00000080"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Maximum Participants</Text>
            <TextInput
              style={styles.input}
              value={activity.maxParticipants}
              onChangeText={(text) => setActivity(prev => ({ ...prev, maxParticipants: text }))}
              placeholder="Leave empty for no limit"
              placeholderTextColor="#00000080"
              keyboardType="numeric"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <Animated.View style={{ transform: [{ scale: submitAnim }] }}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Creating...' : 'Create Activity'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const ActivityItem = ({ activity, onPress }) => (
  <TouchableOpacity style={styles.activityItem} onPress={onPress}>
    <Image source={{ uri: activity.image }} style={styles.activityImage} />
    <View style={styles.cardContent}>
      <Text style={styles.activityTitle}>{activity.title}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={16} color="#000000" />
          <Text style={styles.detailText}>{activity.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#000000" />
          <Text style={styles.detailText}>{activity.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="people-outline" size={16} color="#000000" />
          <Text style={styles.detailText}>{activity.participants} participants</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default function CreateActivity({ navigation, route }) {
  const [showForm, setShowForm] = useState(false);

  // Listen for navigation params updates
  React.useEffect(() => {
    if (route.params?.showForm === false) {
      setShowForm(false);
    }
  }, [route.params]);

  const hostedActivities = [
    {
      id: '1',
      title: 'Linda Mar Surf',
      location: 'Pacifica, CA',
      date: 'Monday Morning (August 27th)',
      participants: 4,
      image: 'https://example.com/surf.jpg',
    },
    {
      id: '2',
      title: 'Bouldering @ Stinson Beach',
      location: 'Stinson Beach',
      date: 'Saturday Morning (August 31st)',
      participants: 6,
      image: 'https://example.com/boulder.jpg',
    },
  ];

  if (showForm) {
    return <CreateActivityForm navigation={navigation} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Activity</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowForm(true)}
        >
          <View style={styles.createButtonContent}>
            <Ionicons name="add-circle-outline" size={32} color="#000000" />
            <Text style={styles.createButtonText}>Create New Activity</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Hosted Activities</Text>
          <View style={styles.activitiesList}>
            {hostedActivities.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                onPress={() => {}}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  createButton: {
    margin: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    overflow: 'hidden',
  },
  createButtonContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  activitiesList: {
    gap: 16,
  },
  activityItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activityImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  detailsContainer: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.7,
  },
  form: {
    padding: 20,
  },
  imageUpload: {
    width: '100%',
    height: 200,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  uploadText: {
    marginTop: 8,
    fontSize: 16,
    color: '#000000',
    opacity: 0.6,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#000000',
    opacity: 0.6,
  },
  submitButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contentContainer: {
    paddingVertical: 20,
  },
});
