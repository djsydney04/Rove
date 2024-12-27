import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import ActivityCard from '../components/ActivityCard';
import { Activity } from '../types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const SWIPE_UP_THRESHOLD = SCREEN_HEIGHT * 0.2;

interface ActivityDiscoveryProps {}

export default function ActivityDiscovery(props: ActivityDiscoveryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  const mockActivities: Activity[] = [
    {
      id: '1',
      title: 'Hike Through the Marin Headlands',
      description: 'Anybody wants to come for a hike in the Marin headlands on Friday...',
      hostName: 'Adam',
      photos: ['https://example.com/marin.jpg'],
      verifiedStatus: true,
    },
    {
      id: '2',
      title: 'Surfing at Ocean Beach',
      description: 'Morning surf session at Ocean Beach. All levels welcome!',
      hostName: 'Sarah',
      photos: ['https://example.com/surf.jpg'],
      verifiedStatus: true,
    },
    {
      id: '3',
      title: 'Climbing at Mission Cliffs',
      description: 'Indoor climbing session at Mission Cliffs. Beginners welcome!',
      hostName: 'Mike',
      photos: ['https://example.com/climbing.jpg'],
      verifiedStatus: false,
    },
  ];

  const handleSwipeComplete = (direction: 'left' | 'right' | 'up') => {
    Haptics.impactAsync(
      direction === 'up' 
        ? Haptics.ImpactFeedbackStyle.Light 
        : Haptics.ImpactFeedbackStyle.Medium
    );

    if (currentIndex < mockActivities.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }

    // Reset position for next card
    translateX.value = 0;
    translateY.value = 0;
    rotate.value = 0;
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
      
      // Calculate rotation based on X translation
      rotate.value = interpolate(
        translateX.value,
        [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        [-10, 0, 10]
      );
    },
    onEnd: (event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        // Swipe left or right
        translateX.value = withSpring(
          Math.sign(event.translationX) * SCREEN_WIDTH * 1.5,
          {},
          () => {
            runOnJS(handleSwipeComplete)(event.translationX > 0 ? 'right' : 'left');
          }
        );
      } else if (event.translationY < -SWIPE_UP_THRESHOLD) {
        // Swipe up
        translateY.value = withSpring(
          -SCREEN_HEIGHT,
          {},
          () => {
            runOnJS(handleSwipeComplete)('up');
          }
        );
      } else {
        // Reset position
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  const renderSwipeHints = () => (
    <View style={styles.hintContainer}>
      <View style={[styles.hint, styles.hintLeft]}>
        <Text style={styles.hintText}>Pass</Text>
      </View>
      <View style={[styles.hint, styles.hintRight]}>
        <Text style={styles.hintText}>Join</Text>
      </View>
      <View style={[styles.hint, styles.hintTop]}>
        <Text style={styles.hintText}>Details</Text>
      </View>
    </View>
  );

  if (currentIndex >= mockActivities.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.noMoreText}>No more activities</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderSwipeHints()}
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.cardContainer, animatedStyle]}>
          <ActivityCard activity={mockActivities[currentIndex]} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
    position: 'absolute',
  },
  hintContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hint: {
    position: 'absolute',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  hintLeft: {
    left: 40,
  },
  hintRight: {
    right: 40,
  },
  hintTop: {
    top: 100,
  },
  hintText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  noMoreText: {
    fontSize: 20,
    color: '#666',
  },
});
