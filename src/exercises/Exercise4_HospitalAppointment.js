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

const DEPARTMENTS = [
  { name: 'Cardiology', doctors: ['Dr. Smith (Cardiologist)', 'Dr. Allen (Cardiologist)'] },
  { name: 'Pediatrics', doctors: ['Dr. Brenda (Pediatrician)', 'Dr. Grace (Pediatrician)'] },
  { name: 'General Medicine', doctors: ['Dr. David (General Physician)', 'Dr. Patel (General Physician)'] },
  { name: 'Dental Care', doctors: ['Dr. Sarah (Dentist)', 'Dr. Lee (Dentist)'] },
];

export default function Exercise4_HospitalAppointment({ onBack }) {
  // Form fields
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');

  // States
  const [errors, setErrors] = useState({});
  const [submittedBooking, setSubmittedBooking] = useState(null);

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  // Challenge check: date cannot be in the past
  const isDateInPast = (dateStr) => {
    // Expected format: YYYY-MM-DD
    const parts = dateStr.split('-');
    if (parts.length !== 3) return false;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const inputDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return inputDate < today;
  };

  const validate = () => {
    let errs = {};

    // Patient Name: Required
    if (!patientName.trim()) {
      errs.patientName = 'Patient name is required.';
    }

    // Phone Number: Required
    if (!phone.trim()) {
      errs.phone = 'Phone number is required.';
    }

    // Email: Optional but must be valid if provided
    if (email.trim() && !validateEmail(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    // Department: Required
    if (!selectedDept) {
      errs.department = 'Department selection is required.';
    }

    // Doctor: Required
    if (!selectedDoctor) {
      errs.doctor = 'Doctor selection is required.';
    }

    // Appointment Date: Required + Challenge: cannot be in the past
    if (!appointmentDate.trim()) {
      errs.appointmentDate = 'Appointment date is required (YYYY-MM-DD).';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate.trim())) {
      errs.appointmentDate = 'Date must be formatted as YYYY-MM-DD.';
    } else if (isDateInPast(appointmentDate.trim())) {
      // Challenge requirement
      errs.appointmentDate = 'Invalid date: Appointment date cannot be in the past.';
    }

    // Appointment Time: Required
    if (!appointmentTime.trim()) {
      errs.appointmentTime = 'Appointment time is required (e.g. 10:30 AM).';
    }

    // Reason for Visit: Required; minimum 10 characters
    if (!reason.trim()) {
      errs.reason = 'Reason for visit is required.';
    } else if (reason.trim().length < 10) {
      errs.reason = 'Reason for visit must contain at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBook = () => {
    if (validate()) {
      setSubmittedBooking({
        patientName,
        phone,
        email: email || 'N/A',
        department: selectedDept,
        doctor: selectedDoctor,
        appointmentDate,
        appointmentTime,
        reason,
      });
      Alert.alert(
        'Appointment Confirmed',
        `Appointment scheduled for ${patientName} on ${appointmentDate} at ${appointmentTime} with ${selectedDoctor}.`
      );
    } else {
      setSubmittedBooking(null);
    }
  };

  const handleReset = () => {
    setPatientName('');
    setPhone('');
    setEmail('');
    setSelectedDept('');
    setSelectedDoctor('');
    setAppointmentDate('');
    setAppointmentTime('');
    setReason('');
    setErrors({});
    setSubmittedBooking(null);
  };

  // Doctors for the active department
  const activeDeptObj = DEPARTMENTS.find((d) => d.name === selectedDept);
  const availableDoctors = activeDeptObj ? activeDeptObj.doctors : [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {onBack && (
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>← Back to Exercises</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.header}>Exercise #4: Hospital Appointment</Text>
      <Text style={styles.subHeader}>Book a medical consultation with a specialist</Text>

      {/* Confirmation Card */}
      {submittedBooking && (
        <View style={styles.confirmCard}>
          <Text style={styles.confirmTitle}>✓ Appointment Booked Successfully!</Text>
          <Text style={styles.confirmLine}>Patient: {submittedBooking.patientName}</Text>
          <Text style={styles.confirmLine}>Doctor: {submittedBooking.doctor}</Text>
          <Text style={styles.confirmLine}>
            Date &amp; Time: {submittedBooking.appointmentDate} at {submittedBooking.appointmentTime}
          </Text>
          <Text style={styles.confirmLine}>Dept: {submittedBooking.department}</Text>
        </View>
      )}

      {/* Patient Name */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Patient Name *</Text>
        <TextInput
          style={[styles.input, errors.patientName && styles.inputError]}
          placeholder="e.g. John Doe"
          value={patientName}
          onChangeText={setPatientName}
        />
        {errors.patientName && <Text style={styles.errorText}>{errors.patientName}</Text>}
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

      {/* Email (Optional) */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Email (Optional, but validated if entered)</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="patient@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      {/* Department Selection */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Department *</Text>
        <View style={styles.chipRow}>
          {DEPARTMENTS.map((dept) => (
            <TouchableOpacity
              key={dept.name}
              style={[
                styles.chip,
                selectedDept === dept.name && styles.chipSelected,
              ]}
              onPress={() => {
                setSelectedDept(dept.name);
                setSelectedDoctor(''); // reset doctor when department changes
              }}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedDept === dept.name && styles.chipTextSelected,
                ]}
              >
                {dept.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.department && <Text style={styles.errorText}>{errors.department}</Text>}
      </View>

      {/* Doctor Selection */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Doctor *</Text>
        {!selectedDept ? (
          <Text style={styles.hintText}>Please select a department first.</Text>
        ) : (
          <View style={styles.doctorList}>
            {availableDoctors.map((doc) => (
              <TouchableOpacity
                key={doc}
                style={[
                  styles.doctorItem,
                  selectedDoctor === doc && styles.doctorItemSelected,
                ]}
                onPress={() => setSelectedDoctor(doc)}
              >
                <Text
                  style={[
                    styles.doctorItemText,
                    selectedDoctor === doc && styles.doctorItemTextSelected,
                  ]}
                >
                  {selectedDoctor === doc ? '● ' : '○ '}
                  {doc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {errors.doctor && <Text style={styles.errorText}>{errors.doctor}</Text>}
      </View>

      {/* Appointment Date */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Appointment Date * (Cannot be in the past)</Text>
        <TextInput
          style={[styles.input, errors.appointmentDate && styles.inputError]}
          placeholder="YYYY-MM-DD (e.g. 2026-12-01)"
          value={appointmentDate}
          onChangeText={setAppointmentDate}
        />
        {errors.appointmentDate && (
          <Text style={styles.errorText}>{errors.appointmentDate}</Text>
        )}
      </View>

      {/* Appointment Time */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Appointment Time *</Text>
        <TextInput
          style={[styles.input, errors.appointmentTime && styles.inputError]}
          placeholder="e.g. 10:00 AM or 14:30"
          value={appointmentTime}
          onChangeText={setAppointmentTime}
        />
        {errors.appointmentTime && (
          <Text style={styles.errorText}>{errors.appointmentTime}</Text>
        )}
      </View>

      {/* Reason for Visit */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>
          Reason for Visit (Min 10 characters) * [{reason.trim().length} chars]
        </Text>
        <TextInput
          style={[styles.textArea, errors.reason && styles.inputError]}
          placeholder="Describe your medical concern or symptoms (at least 10 characters)..."
          multiline
          numberOfLines={3}
          value={reason}
          onChangeText={setReason}
        />
        {errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleBook}>
        <Text style={styles.submitBtnText}>Request Appointment</Text>
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
    minHeight: 70,
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
  hintText: {
    fontSize: 13,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  chipSelected: {
    backgroundColor: '#0284C7',
    borderColor: '#0284C7',
  },
  chipText: {
    fontSize: 13,
    color: '#334155',
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  doctorList: {
    gap: 8,
  },
  doctorItem: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  doctorItemSelected: {
    borderColor: '#0284C7',
    backgroundColor: '#F0F9FF',
  },
  doctorItemText: {
    fontSize: 14,
    color: '#334155',
  },
  doctorItemTextSelected: {
    color: '#0369A1',
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: '#0284C7',
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
  confirmCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },
  confirmTitle: {
    color: '#1E40AF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  confirmLine: {
    color: '#1E3A8A',
    fontSize: 13,
    marginTop: 2,
  },
});
