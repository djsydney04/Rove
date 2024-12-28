import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActivityCard from '../components/ActivityCard';
import { Activity } from '../types';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = height * 0.7;
const HORIZONTAL_PADDING = (width - CARD_WIDTH) / 2;

const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Hike Through the Marin Headlands',
    description: 'Anybody wants to come for a hike in the Marin headlands on Friday...',
    hostName: 'Adam',
    photos: ['https://example.com/marin.jpg'],
    verifiedStatus: true,
    image: 'https://example.com/marin.jpg',
    date: 'Friday, 10:00 AM',
    location: 'Marin Headlands',
    participants: 10,
  },
  {
    id: '2',
    title: 'Surfing at Ocean Beach',
    description: 'Morning surf session at Ocean Beach. All levels welcome!',
    hostName: 'Sarah',
    photos: ['https://example.com/surf.jpg'],
    verifiedStatus: true,
    image: 'https://example.com/surf.jpg',
    date: 'Saturday, 9:00 AM',
    location: 'Ocean Beach',
    participants: 15,
  },
  {
    id: '3',
    title: 'Climbing at Mission Cliffs',
    description: 'Indoor climbing session at Mission Cliffs. Beginners welcome!',
    hostName: 'Mike',
    photos: ['https://example.com/climbing.jpg'],
    verifiedStatus: false,
    image: 'https://example.com/climbing.jpg',
    date: 'Sunday, 10:00 AM',
    location: 'Mission Cliffs',
    participants: 8,
  },
];

export default function ActivityDiscovery({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const handleSwipeComplete = (direction: 'left' | 'right' | 'up') => {
    if (currentIndex < mockActivities.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }

    // Reset position for next card
    translateX.setValue(0);
    translateY.setValue(0);
    rotate.setValue(0);
  };

  const gestureHandler = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
        translateY.setValue(gestureState.dy);

        // Calculate rotation based on X translation
        rotate.setValue(gestureState.dx / width * 10);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > width * 0.3) {
          // Swipe left or right
          Animated.spring(translateX, {
            toValue: Math.sign(gestureState.dx) * width * 1.5,
            useNativeDriver: true,
          }).start(() => {
            handleSwipeComplete(gestureState.dx > 0 ? 'right' : 'left');
          });
        } else if (gestureState.dy < -height * 0.2) {
          // Swipe up
          Animated.spring(translateY, {
            toValue: -height,
            useNativeDriver: true,
          }).start(() => {
            handleSwipeComplete('up');
          });
        } else {
          // Reset position
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          Animated.spring(rotate, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const animatedStyle = {
    transform: [
      { translateX: translateX },
      { translateY: translateY },
      { rotate: `${rotate}deg` },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={28} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Preferences')}>
          <Ionicons name="settings-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        {mockActivities.map((activity, index) => (
          <Animated.View
            key={activity.id}
            style={[
              styles.card,
              {
                zIndex: mockActivities.length - index,
                transform: [
                  { scale: index === 0 ? 1 : 0.95 },
                  { translateY: index === 0 ? 0 : -10 * index },
                ],
              },
              index === 0 ? animatedStyle : {},
            ]}
            {...(index === 0 ? gestureHandler.panHandlers : {})}
          >
            <Image source={{ uri: activity.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{activity.title}</Text>
              <Text style={styles.description}>{activity.description}</Text>

              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <Ionicons name="calendar-outline" size={20} color="#666" />
                  <Text style={styles.detailText}>{activity.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="location-outline" size={20} color="#666" />
                  <Text style={styles.detailText}>{activity.location}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="people-outline" size={20} color="#666" />
                  <Text style={styles.detailText}>{activity.participants} participants</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        ))}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.skipButton]}>
          <Ionicons name="close" size={32} color="#FF3B30" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.likeButton]}>
          <Ionicons name="heart" size={32} color="#34C759" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 20,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
    lineHeight: 24,
    opacity: 0.8,
  },
  detailsContainer: {
    marginTop: 'auto',
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.7,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    gap: 20,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  skipButton: {
    backgroundColor: '#FFF0F0',
  },
  likeButton: {
    backgroundColor: '#F0FFF0',
  },
});
