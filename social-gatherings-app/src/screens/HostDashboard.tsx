import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HostDashboard() {
  const navigation = useNavigation();

  const hostedActivities = [
    {
      id: '1',
      title: 'Linda Mar Surf',
      location: 'Pacifica, CA',
      date: 'Monday Morning (August 27th)',
      participants: {
        current: 3,
        max: 8,
      },
      requests: 2,
      notifications: 4,
    },
    {
      id: '2',
      title: 'Bouldering @ Stinson Beach',
      location: 'Stinson Beach, CA',
      date: 'Wednesday Afternoon (August 29th)',
      participants: {
        current: 4,
        max: 6,
      },
      requests: 1,
      notifications: 3,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#4A6572" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hosted Activities</Text>
        <View style={styles.headerRight} />
      </View>

      <TouchableOpacity 
        style={styles.createActivityButton}
        onPress={() => navigation.navigate('CreateActivity')}
      >
        <Text style={styles.createActivityText}>Create Activity</Text>
        <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {hostedActivities.map((activity) => (
        <TouchableOpacity 
          key={activity.id} 
          style={styles.activityCard}
          onPress={() => navigation.navigate('ActivityDetails', { activity })}
        >
          <Text style={styles.activityTitle}>{activity.title}</Text>
          <View style={styles.activityDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={16} color="#FFFFFF" />
              <Text style={styles.detailText}>{activity.location}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={16} color="#FFFFFF" />
              <Text style={styles.detailText}>{activity.date}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="people-outline" size={16} color="#FFFFFF" />
              <Text style={styles.detailText}>
                {activity.participants.current} / {activity.participants.max} participants
              </Text>
              <Text style={styles.requestsText}>
                {activity.requests} Requests
              </Text>
            </View>
            {activity.notifications > 0 && (
              <View style={styles.notificationRow}>
                <View style={styles.notificationDot} />
                <Text style={styles.notificationText}>
                  {activity.notifications} New Notifications
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.chevronButton}>
            <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A6572',
  },
  headerRight: {
    width: 40,
  },
  createActivityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#344955',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    gap: 8,
  },
  createActivityText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: '#344955',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  activityDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  requestsText: {
    color: '#90A4AE',
    fontSize: 14,
    marginLeft: 'auto',
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  notificationText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  chevronButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
});
