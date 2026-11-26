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

const POSITIONS = ['Frontend Developer', 'Backend Developer', 'Mobile Developer', 'UI/UX Designer', 'Product Manager'];
const EDUCATION_LEVELS = ['High School', "Bachelor's Degree", "Master's Degree", 'PhD'];

export default function Exercise5_JobApplication({ onBack }) {
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [cvFileName, setCvFileName] = useState('');

  // UI state
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validate = () => {
    let errs = {};

    // Full Name: Required
    if (!fullName.trim()) {
      errs.fullName = 'Full name is required.';
    }

    // Email: Required & valid
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!validateEmail(email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    // Phone: Required
    if (!phone.trim()) {
      errs.phone = 'Phone number is required.';
    }

    // Position: Required
    if (!position) {
      errs.position = 'Target position is required.';
    }

    // Education: Level Required
    if (!education) {
      errs.education = 'Education level is required.';
    }

    // Years of Experience: Number >= 0
    if (!experience.trim()) {
      errs.experience = 'Years of experience is required.';
    } else {
      const expNum = Number(experience);
      if (isNaN(expNum) || expNum < 0) {
        errs.experience = 'Years of experience must be a number ≥ 0.';
      }
    }

    // Cover Letter: Required; min 50 characters
    if (!coverLetter.trim()) {
      errs.coverLetter = 'Cover letter is required.';
    } else if (coverLetter.trim().length < 50) {
      errs.coverLetter = `Cover letter must be at least 50 characters (current: ${coverLetter.trim().length}).`;
    }

    // CV: Required
    if (!cvFileName) {
      errs.cv = 'Please attach your CV/Resume file.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Challenge: Display "Application submitted successfully" only when every validation rule passes.
      const msg = 'Application submitted successfully';
      setSuccessMessage(msg);
      Alert.alert('Success', msg);
    } else {
      setSuccessMessage('');
    }
  };

  // Beginner-friendly mock CV upload
  const handleSelectCV = () => {
    // Simulating attaching a file
    const sampleName = `${fullName ? fullName.toLowerCase().replace(/\s+/g, '_') : 'applicant'}_cv.pdf`;
    setCvFileName(sampleName);
    if (errors.cv) {
      setErrors((prev) => ({ ...prev, cv: undefined }));
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setPosition('');
    setEducation('');
    setExperience('');
    setCoverLetter('');
    setCvFileName('');
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {onBack && (
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>← Back to Exercises</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.header}>Exercise #5: Job Application</Text>
      <Text style={styles.subHeader}>Apply for an open position at our company</Text>

      {/* Challenge Success Banner */}
      {successMessage ? (
        <View style={styles.successBanner}>
          <Text style={styles.successTitle}>✓ {successMessage}</Text>
          <Text style={styles.successSub}>
            Candidate: {fullName} | Position: {position}
          </Text>
        </View>
      ) : null}

      {/* Full Name */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={[styles.input, errors.fullName && styles.inputError]}
          placeholder="e.g. Jane Doe"
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
          placeholder="e.g. jane.doe@example.com"
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
          placeholder="e.g. +1 555-0199"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      {/* Position Selection */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Position *</Text>
        <View style={styles.pickerList}>
          {POSITIONS.map((pos) => (
            <TouchableOpacity
              key={pos}
              style={[
                styles.selectOption,
                position === pos && styles.selectOptionActive,
              ]}
              onPress={() => setPosition(pos)}
            >
              <Text
                style={[
                  styles.selectOptionText,
                  position === pos && styles.selectOptionTextActive,
                ]}
              >
                {position === pos ? '● ' : '○ '}
                {pos}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.position && <Text style={styles.errorText}>{errors.position}</Text>}
      </View>

      {/* Education Level */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Education Level *</Text>
        <View style={styles.chipRow}>
          {EDUCATION_LEVELS.map((edu) => (
            <TouchableOpacity
              key={edu}
              style={[
                styles.chip,
                education === edu && styles.chipActive,
              ]}
              onPress={() => setEducation(edu)}
            >
              <Text
                style={[
                  styles.chipText,
                  education === edu && styles.chipTextActive,
                ]}
              >
                {edu}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.education && <Text style={styles.errorText}>{errors.education}</Text>}
      </View>

      {/* Years of Experience */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Years of Experience (≥ 0) *</Text>
        <TextInput
          style={[styles.input, errors.experience && styles.inputError]}
          placeholder="e.g. 3"
          keyboardType="numeric"
          value={experience}
          onChangeText={setExperience}
        />
        {errors.experience && <Text style={styles.errorText}>{errors.experience}</Text>}
      </View>

      {/* Cover Letter */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>
          Cover Letter (Min 50 characters) * [{coverLetter.trim().length}/50]
        </Text>
        <TextInput
          style={[styles.textArea, errors.coverLetter && styles.inputError]}
          placeholder="Explain why you are the best fit for this role (minimum 50 characters)..."
          multiline
          numberOfLines={4}
          value={coverLetter}
          onChangeText={setCoverLetter}
        />
        {errors.coverLetter && <Text style={styles.errorText}>{errors.coverLetter}</Text>}
      </View>

      {/* CV Attachment */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>CV / Resume *</Text>
        <TouchableOpacity style={styles.uploadBtn} onPress={handleSelectCV}>
          <Text style={styles.uploadBtnText}>
            {cvFileName ? `📎 Attached: ${cvFileName}` : '📎 Select & Attach CV (PDF/DOC)'}
          </Text>
        </TouchableOpacity>
        {errors.cv && <Text style={styles.errorText}>{errors.cv}</Text>}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnText}>Submit Job Application</Text>
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
  textArea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    minHeight: 85,
    textAlignVertical: 'top',
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
  pickerList: {
    gap: 6,
  },
  selectOption: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    padding: 10,
    borderRadius: 8,
  },
  selectOptionActive: {
    borderColor: '#7C3AED',
    backgroundColor: '#F5F3FF',
  },
  selectOptionText: {
    fontSize: 14,
    color: '#334155',
  },
  selectOptionTextActive: {
    color: '#6D28D9',
    fontWeight: '600',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
  },
  chipActive: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },
  chipText: {
    fontSize: 13,
    color: '#475569',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  uploadBtn: {
    backgroundColor: '#EDE9FE',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#7C3AED',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  uploadBtnText: {
    color: '#6D28D9',
    fontSize: 14,
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: '#7C3AED',
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
  successBanner: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },
  successTitle: {
    color: '#065F46',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successSub: {
    color: '#047857',
    fontSize: 13,
    marginTop: 4,
  },
});
