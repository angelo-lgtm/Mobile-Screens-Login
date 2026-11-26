import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

export default function Exercise1_Registration({ onBack }) {
  // Form fields state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Errors state
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simple email regex for beginner validation
  const validateEmail = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val);
  };

  // Validate form
  const validateForm = () => {
    let currentErrors = {};

    // Full Name: Required, minimum 3 characters
    if (!fullName.trim()) {
      currentErrors.fullName = 'Full name is required.';
    } else if (fullName.trim().length < 3) {
      currentErrors.fullName = 'Full name must be at least 3 characters.';
    }

    // Email: Required, valid format
    if (!email.trim()) {
      currentErrors.email = 'Email address is required.';
    } else if (!validateEmail(email.trim())) {
      currentErrors.email = 'Email address is invalid.';
    }

    // Password: Required, minimum 8 characters
    if (!password) {
      currentErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      currentErrors.password = 'Password must contain at least 8 characters.';
    }

    // Confirm Password: Must match password
    if (!confirmPassword) {
      currentErrors.confirmPassword = 'Confirm password is required.';
    } else if (confirmPassword !== password) {
      currentErrors.confirmPassword = 'Passwords do not match.';
    }

    // Phone Number: Required, valid phone number (at least 8 digits)
    if (!phone.trim()) {
      currentErrors.phone = 'Phone number is required.';
    } else if (phone.trim().length < 8 || isNaN(phone.replace(/[\s-+()]/g, ''))) {
      currentErrors.phone = 'Phone number must be a valid number.';
    }

    // Accept Terms: Must be checked
    if (!acceptTerms) {
      currentErrors.acceptTerms = 'You must accept the terms and conditions.';
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      setIsSubmitted(true);
      Alert.alert('Success', 'User registration successful!');
    } else {
      setIsSubmitted(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhone('');
    setAcceptTerms(false);
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {onBack && (
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>← Back to Exercises</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.header}>Exercise #1: User Registration</Text>
      <Text style={styles.subHeader}>Fill in all required fields to create an account</Text>

      {/* Success Banner */}
      {isSubmitted && (
        <View style={styles.successBox}>
          <Text style={styles.successTitle}>✓ Registration Successful!</Text>
          <Text style={styles.successDetail}>Welcome, {fullName}!</Text>
        </View>
      )}

      {/* Full Name */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={[styles.input, errors.fullName && styles.inputError]}
          placeholder="Enter full name"
          value={fullName}
          onChangeText={setFullName}
        />
        {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
      </View>

      {/* Email */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="e.g. user@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      {/* Password */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Password * (Min 8 characters)</Text>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>

      {/* Confirm Password */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Confirm Password *</Text>
        <TextInput
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          placeholder="Re-enter password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}
      </View>

      {/* Phone Number */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Phone Number *</Text>
        <TextInput
          style={[styles.input, errors.phone && styles.inputError]}
          placeholder="e.g. 0788123456"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      {/* Accept Terms Switch */}
      <View style={styles.switchGroup}>
        <Switch
          value={acceptTerms}
          onValueChange={setAcceptTerms}
          trackColor={{ false: '#ccc', true: '#4CAF50' }}
        />
        <Text style={styles.switchLabel}>I accept the terms and conditions *</Text>
      </View>
      {errors.acceptTerms && <Text style={styles.errorText}>{errors.acceptTerms}</Text>}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleRegister}>
        <Text style={styles.submitBtnText}>Register Account</Text>
      </TouchableOpacity>

      {/* Reset Button */}
      <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
        <Text style={styles.resetBtnText}>Clear Form</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F7FB',
  },
  backBtn: {
    marginBottom: 15,
  },
  backBtnText: {
    color: '#0066CC',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#2D3748',
  },
  inputError: {
    borderColor: '#E53E3E',
    backgroundColor: '#FFF5F5',
  },
  errorText: {
    color: '#E53E3E',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  switchGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  switchLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: '#2D3748',
    flex: 1,
  },
  submitBtn: {
    backgroundColor: '#3182CE',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetBtn: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  resetBtnText: {
    color: '#718096',
    fontSize: 14,
  },
  successBox: {
    backgroundColor: '#C6F6D5',
    borderColor: '#38A169',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 18,
  },
  successTitle: {
    color: '#22543D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successDetail: {
    color: '#276749',
    fontSize: 14,
    marginTop: 4,
  },
});
