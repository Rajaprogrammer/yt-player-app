import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';

const LOGO_SIZE = 140;

export default function SplashScreen({ navigation }) {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const ring1Scale = useRef(new Animated.Value(0.6)).current;
  const ring1Opacity = useRef(new Animated.Value(0.8)).current;
  const ring2Scale = useRef(new Animated.Value(0.6)).current;
  const ring2Opacity = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();

    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 800,
      delay: 400,
      useNativeDriver: true,
    }).start();

    const pulse = (rScale, rOpacity, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(rScale, {
              toValue: 1.8,
              duration: 1400,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(rOpacity, {
              toValue: 0,
              duration: 1400,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(rScale, { toValue: 0.6, duration: 0, useNativeDriver: true }),
          Animated.timing(rOpacity, { toValue: 0.8, duration: 0, useNativeDriver: true }),
        ])
      );

    pulse(ring1Scale, ring1Opacity, 0).start();
    pulse(ring2Scale, ring2Opacity, 700).start();

    const timer = setTimeout(() => navigation.replace('Home'), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={colors.splashBackground} style={styles.container}>
      <View style={styles.logoWrap}>
        <Animated.View
          style={[styles.ring, { transform: [{ scale: ring1Scale }], opacity: ring1Opacity }]}
        />
        <Animated.View
          style={[styles.ring, { transform: [{ scale: ring2Scale }], opacity: ring2Opacity }]}
        />
        <Animated.View style={{ transform: [{ scale }], opacity }}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </Animated.View>
      </View>
      <Animated.Text style={[styles.title, { opacity: textOpacity }]}>Stothras</Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: textOpacity }]}>
        Devotion at your fingertips
      </Animated.Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoWrap: { alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  ring: {
    position: 'absolute',
    width: LOGO_SIZE + 40,
    height: LOGO_SIZE + 40,
    borderRadius: (LOGO_SIZE + 40) / 2,
    borderWidth: 3,
    borderColor: '#FFD54F',
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
    borderWidth: 4,
    borderColor: '#FFD54F',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF3E0',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: { marginTop: 8, fontSize: 14, color: '#FFE0B2', fontStyle: 'italic' },
});
