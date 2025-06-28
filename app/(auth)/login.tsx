import { ThemedText } from '@/components/ThemedText';
import { Button, FormField } from '@/components/ui';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAuth } from '@/store/authStore';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { login, isLoggingIn, loginError } = useAuth();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await login({
        username: email,
        password: password,
      });
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <ThemedText style={[styles.title, { color: textColor }]}>
            Welcome Back
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: textColor }]}>
            Sign in to continue your learning journey
          </ThemedText>
        </View>

        <View style={styles.form}>
          <FormField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            required
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="envelope"
          />

          <FormField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            required
            secureTextEntry
            leftIcon="lock"
          />

          <Button
            title="Sign In (Dummy)"
            onPress={handleLogin}
            loading={isLoggingIn}
            variant="primary"
            size="large"
            fullWidth
          />

          <ThemedText style={styles.note}>
            Note: This is a dummy login. Any valid email/password will work.
          </ThemedText>

          {loginError && (
            <ThemedText style={styles.errorText}>
              {loginError.message || 'Login failed. Please try again.'}
            </ThemedText>
          )}
        </View>

        <View style={styles.footer}>
          <ThemedText style={[styles.footerText, { color: textColor }]}>
            Don't have an account?{' '}
            <ThemedText
              style={[styles.linkText, { color: textColor }]}
              onPress={() => Alert.alert('Coming Soon', 'Sign up feature will be available soon')}
            >
              Sign up
            </ThemedText>
          </ThemedText>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  form: {
    marginBottom: 32,
  },
  note: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
}); 