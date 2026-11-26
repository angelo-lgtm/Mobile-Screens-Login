import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

const ATTENDANCE_TYPES = ['Physical', 'Virtual', 'Hybrid'];

export default function Exercise7_EventRegistration({ onBack }) {
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [attendanceType, setAttendanceType] = useState('Physical');
  const [days, setDays] = useState('1');
  const [dietary, setDietary] = useState('');

  // UI state
  const [errors, setErrors] = useState({});
  const [summaryData, setSummaryData] = useState(null);

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validate = () => {
    let errs = {};

    // Full Name: Required
    if (!fullName.trim()) {
      errs.fullName = 'Full name is required.';
    }

    // Email: Required and valid
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!validateEmail(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    // Phone: Required
    if (!phone.trim()) {
      errs.phone = 'Phone number is required.';
    }

    // Organization: Required
    if (!organization.trim()) {
      errs.organization = 'Organization is required.';
    }

    // Job Title: Required
    if (!jobTitle.trim()) {
      errs.jobTitle = 'Job title is required.';
    }

    // Attendance Type: Required
    if (!attendanceType) {
      errs.attendanceType = 'Attendance type is required.';
    }

    // Number of Days: Number between 1 and 3
    if (!days.trim()) {
      errs.days = 'Number of days is required.';
    } else {
      const daysNum = parseInt(days, 10);
      if (isNaN(daysNum) || daysNum < 1 || daysNum > 3) {
        errs.days = 'Number of days must be between 1 and 3.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegister = () => {
    if (validate()) {
      // Challenge requirement:
      // Display a summary such as:
      // Registration Successful
      // Name: John Doe
      // Organization: ABC Ltd
      // Attendance: Physical
      // Days: 2
      const summary = {
        name: fullName,
        organization: organization,
        attendance: attendanceType,
        days: parseInt(days, 10),
        email,
        phone,
        jobTitle,
        dietary: dietary || 'None',
      };
      setSummaryData(summary);
      Alert.alert('Registration Successful', `Registered: ${fullName} (${attendanceType})`);
    } else {
      setSummaryData(null);
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setOrganization('');
    setJobTitle('');
    setAttendanceType('Physical');
    setDays('1');
    setDietary('');
    setErrors({});
    setSummaryData(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {onBack && (
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>← Back to Exercises</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.header}>Exercise #7: Event Registration</Text>
      <Text style={styles.subHeader}>Tech Conference 2026 Participant Sign-Up</Text>

      {/* Challenge Summary Box */}
      {summaryData && (
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Registration Successful</Text>
          <Text style={styles.summaryLine}>Name: {summaryData.name}</Text>
          <Text style={styles.summaryLine}>Organization: {summaryData.organization}</Text>
          <Text style={styles.summaryLine}>Attendance: {summaryData.attendance}</Text>
          <Text style={styles.summaryLine}>Days: {summaryData.days}</Text>
        </View>
      )}

      {/* Full Name */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={[styles.input, errors.fullName && styles.inputError]}
          placeholder="e.g. John Doe"
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
          placeholder="e.g. john.doe@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      {/* Phone */}
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

      {/* Organization */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Organization *</Text>
        <TextInput
          style={[styles.input, errors.organization && styles.inputError]}
          placeholder="e.g. ABC Ltd"
          value={organization}
          onChangeText={setOrganization}
        />
        {errors.organization && <Text style={styles.errorText}>{errors.organization}</Text>}
      </View>

      {/* Job Title */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Job Title *</Text>
        <TextInput
          style={[styles.input, errors.jobTitle && styles.inputError]}
          placeholder="e.g. Software Engineer"
          value={jobTitle}
          onChangeText={setJobTitle}
        />
        {errors.jobTitle && <Text style={styles.errorText}>{errors.jobTitle}</Text>}
      </View>

      {/* Attendance Type (Selection Control) */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Attendance Type *</Text>
        <View style={styles.typeRow}>
          {ATTENDANCE_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeBtn,
                attendanceType === type && styles.typeBtnActive,
              ]}
              onPress={() => setAttendanceType(type)}
            >
              <Text
                style={[
                  styles.typeBtnText,
                  attendanceType === type && styles.typeBtnTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.attendanceType && (
          <Text style={styles.errorText}>{errors.attendanceType}</Text>
        )}
      </View>

      {/* Number of Days (1-3) */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Number of Days (1 - 3) *</Text>
        <TextInput
          style={[styles.input, errors.days && styles.inputError]}
          placeholder="e.g. 2"
          keyboardType="numeric"
          maxLength={1}
          value={days}
          onChangeText={setDays}
        />
        {errors.days && <Text style={styles.errorText}>{errors.days}</Text>}
      </View>

      {/* Dietary Requirement */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Dietary Requirement (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Vegetarian, Halal, Gluten-Free, None"
          value={dietary}
          onChangeText={setDietary}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleRegister}>
        <Text style={styles.submitBtnText}>Complete Registration</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
        <Text style={styles.resetBtnText}>Clear Form</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8FAFC',
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
    color: '#0F172A',
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1E293B',
  },
  inputError: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  typeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    alignItems: 'center',
  },
  typeBtnActive: {
    backgroundColor: '#4338CA',
    borderColor: '#4338CA',
  },
  typeBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  typeBtnTextActive: {
    color: '#FFFFFF',
  },
  submitBtn: {
    backgroundColor: '#4338CA',
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
    color: '#64748B',
    fontSize: 14,
  },
  summaryBox: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  summaryTitle: {
    color: '#312E81',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summaryLine: {
    color: '#3730A3',
    fontSize: 14,
    marginTop: 3,
    fontWeight: '500',
  },
});
