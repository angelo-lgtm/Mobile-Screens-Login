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

const GENDERS = ['Male', 'Female', 'Other'];
const PROGRAMS = ['Computer Science', 'Business Administration', 'Engineering', 'Nursing'];

export default function Exercise2_StudentAdmission({ onBack }) {
  // Form fields
  const [studentName, setStudentName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  const [program, setProgram] = useState('');
  const [academicScore, setAcademicScore] = useState('');

  // Form states
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validateForm = () => {
    let errs = {};

    // Student Name: required, not empty
    if (!studentName.trim()) {
      errs.studentName = 'Student name is required.';
    }

    // Date of Birth: required
    if (!dob.trim()) {
      errs.dob = 'Date of birth is required (e.g. YYYY-MM-DD).';
    }

    // Gender: required
    if (!gender) {
      errs.gender = 'Please select a gender.';
    }

    // Nationality: required
    if (!nationality.trim()) {
      errs.nationality = 'Nationality is required.';
    }

    // Email: valid email
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!validateEmail(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    // Phone: required
    if (!phone.trim()) {
      errs.phone = 'Phone number is required.';
    }

    // Previous School: required
    if (!previousSchool.trim()) {
      errs.previousSchool = 'Previous school name is required.';
    }

    // Program: required
    if (!program) {
      errs.program = 'Please select a study program.';
    }

    // Academic Score: number between 0 and 100
    // Challenge Rule: Academic score must be at least 50 to proceed!
    if (!academicScore.trim()) {
      errs.academicScore = 'Academic score is required.';
    } else {
      const scoreNum = Number(academicScore);
      if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
        errs.academicScore = 'Score must be a number between 0 and 100.';
      } else if (scoreNum < 50) {
        // CHALLENGE REQUIREMENT:
        errs.academicScore = 'Application rejected: Academic score must be at least 50 to proceed.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const summary = {
        studentName,
        dob,
        gender,
        nationality,
        email,
        phone,
        previousSchool,
        program,
        academicScore,
      };
      setSubmittedData(summary);
      Alert.alert(
        'Admission Application Received',
        `Congratulations ${studentName}! Your application for ${program} has been accepted.`
      );
    } else {
      setSubmittedData(null);
    }
  };

  const handleReset = () => {
    setStudentName('');
    setDob('');
    setGender('');
    setNationality('');
    setEmail('');
    setPhone('');
    setPreviousSchool('');
    setProgram('');
    setAcademicScore('');
    setErrors({});
    setSubmittedData(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {onBack && (
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>← Back to Exercises</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.header}>Exercise #2: Student Admission</Text>
      <Text style={styles.subHeader}>Fill out the student application form</Text>

      {/* Confirmation message */}
      {submittedData && (
        <View style={styles.confirmBox}>
          <Text style={styles.confirmTitle}>✓ Application Submitted Successfully!</Text>
          <Text style={styles.confirmLine}>Student: {submittedData.studentName}</Text>
          <Text style={styles.confirmLine}>Program: {submittedData.program}</Text>
          <Text style={styles.confirmLine}>Score: {submittedData.academicScore}% (Passed &gt;= 50)</Text>
          <Text style={styles.confirmLine}>Contact: {submittedData.email} | {submittedData.phone}</Text>
        </View>
      )}

      {/* Student Name */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Student Name *</Text>
        <TextInput
          style={[styles.input, errors.studentName && styles.inputError]}
          placeholder="e.g. Alex Johnson"
          value={studentName}
          onChangeText={setStudentName}
        />
        {errors.studentName && <Text style={styles.errorText}>{errors.studentName}</Text>}
      </View>

      {/* Date of Birth */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Date of Birth *</Text>
        <TextInput
          style={[styles.input, errors.dob && styles.inputError]}
          placeholder="YYYY-MM-DD (e.g. 2004-05-15)"
          value={dob}
          onChangeText={setDob}
        />
        {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
      </View>

      {/* Gender Selection Controls */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Gender *</Text>
        <View style={styles.optionsRow}>
          {GENDERS.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.optionBtn,
                gender === item && styles.optionBtnSelected,
              ]}
              onPress={() => setGender(item)}
            >
              <Text
                style={[
                  styles.optionBtnText,
                  gender === item && styles.optionBtnTextSelected,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
      </View>

      {/* Nationality */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Nationality *</Text>
        <TextInput
          style={[styles.input, errors.nationality && styles.inputError]}
          placeholder="e.g. Rwandan / American / Canadian"
          value={nationality}
          onChangeText={setNationality}
        />
        {errors.nationality && <Text style={styles.errorText}>{errors.nationality}</Text>}
      </View>

      {/* Email */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="student@school.edu"
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
          placeholder="e.g. +250 788 123 456"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      {/* Previous School */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Previous School *</Text>
        <TextInput
          style={[styles.input, errors.previousSchool && styles.inputError]}
          placeholder="e.g. Green Hills Academy"
          value={previousSchool}
          onChangeText={setPreviousSchool}
        />
        {errors.previousSchool && (
          <Text style={styles.errorText}>{errors.previousSchool}</Text>
        )}
      </View>

      {/* Program Selection Controls */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Program Selection *</Text>
        <View style={styles.programList}>
          {PROGRAMS.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.programOption,
                program === item && styles.programOptionSelected,
              ]}
              onPress={() => setProgram(item)}
            >
              <Text
                style={[
                  styles.programOptionText,
                  program === item && styles.programOptionTextSelected,
                ]}
              >
                {program === item ? '● ' : '○ '}
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.program && <Text style={styles.errorText}>{errors.program}</Text>}
      </View>

      {/* Academic Score */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Academic Score (0 - 100) *</Text>
        <TextInput
          style={[styles.input, errors.academicScore && styles.inputError]}
          placeholder="Must be at least 50"
          keyboardType="numeric"
          value={academicScore}
          onChangeText={setAcademicScore}
        />
        {errors.academicScore && (
          <Text style={styles.errorText}>{errors.academicScore}</Text>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnText}>Submit Application</Text>
      </TouchableOpacity>

      {/* Reset */}
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
  optionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  optionBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    alignItems: 'center',
  },
  optionBtnSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  optionBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  optionBtnTextSelected: {
    color: '#FFFFFF',
  },
  programList: {
    gap: 8,
  },
  programOption: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    padding: 12,
    borderRadius: 8,
  },
  programOptionSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  programOptionText: {
    fontSize: 14,
    color: '#334155',
  },
  programOptionTextSelected: {
    color: '#1D4ED8',
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: '#2563EB',
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
  confirmBox: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 18,
  },
  confirmTitle: {
    color: '#065F46',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  confirmLine: {
    color: '#047857',
    fontSize: 13,
    marginTop: 2,
  },
});
