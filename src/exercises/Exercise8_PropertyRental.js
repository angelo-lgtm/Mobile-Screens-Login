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

const PROPERTY_TYPES = ['Apartment', 'House', 'Studio', 'Condo'];
const EMPLOYMENT_STATUSES = ['Employed (Full-time)', 'Employed (Part-time)', 'Self-Employed', 'Student', 'Other'];

export default function Exercise8_PropertyRental({ onBack }) {
  // Form state
  const [applicantName, setApplicantName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [bedrooms, setBedrooms] = useState('1');
  const [monthlyRent, setMonthlyRent] = useState('600');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  // UI state
  const [errors, setErrors] = useState({});
  const [confirmationData, setConfirmationData] = useState(null);

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validate = () => {
    let errs = {};

    // Applicant Name: Required
    if (!applicantName.trim()) {
      errs.applicantName = 'Applicant name is required.';
    }

    // Phone: Required
    if (!phone.trim()) {
      errs.phone = 'Phone number is required.';
    }

    // Email: Valid email
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!validateEmail(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    // Property Type: Required
    if (!propertyType) {
      errs.propertyType = 'Property type is required.';
    }

    // Number of Bedrooms: Integer greater than 0
    if (!bedrooms.trim()) {
      errs.bedrooms = 'Number of bedrooms is required.';
    } else {
      const bNum = parseInt(bedrooms, 10);
      if (isNaN(bNum) || bNum <= 0) {
        errs.bedrooms = 'Bedrooms must be an integer greater than 0.';
      }
    }

    // Monthly Rent & Monthly Income (Challenge check)
    // Business rule: Monthly Income must be at least 3 times the monthly rent
    const rentNum = parseFloat(monthlyRent) || 0;
    const incomeNum = parseFloat(monthlyIncome);

    if (!monthlyIncome.trim()) {
      errs.monthlyIncome = 'Monthly income is required.';
    } else if (isNaN(incomeNum) || incomeNum <= 0) {
      errs.monthlyIncome = 'Monthly income must be a number greater than 0.';
    } else if (rentNum > 0 && incomeNum < rentNum * 3) {
      // CHALLENGE REQUIREMENT
      errs.monthlyIncome = `Income requirement not met: Monthly income ($${incomeNum}) must be at least 3x monthly rent ($${rentNum * 3}).`;
    }

    // Preferred Location: Required
    if (!preferredLocation.trim()) {
      errs.preferredLocation = 'Preferred location is required.';
    }

    // Move-in Date: Required
    if (!moveInDate.trim()) {
      errs.moveInDate = 'Move-in date is required (YYYY-MM-DD).';
    }

    // Employment Status: Required
    if (!employmentStatus) {
      errs.employmentStatus = 'Please select your employment status.';
    }

    // Additional Info: Optional; max 250 characters
    if (additionalInfo.length > 250) {
      errs.additionalInfo = 'Additional information must not exceed 250 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleApply = () => {
    if (validate()) {
      const summary = {
        applicantName,
        phone,
        email,
        propertyType,
        bedrooms: parseInt(bedrooms, 10),
        monthlyRent: parseFloat(monthlyRent),
        monthlyIncome: parseFloat(monthlyIncome),
        preferredLocation,
        moveInDate,
        employmentStatus,
        additionalInfo: additionalInfo.trim() || 'None',
      };
      setConfirmationData(summary);
      Alert.alert(
        'Application Received',
        `Thank you ${applicantName}! Your rental application for ${propertyType} in ${preferredLocation} has been submitted.`
      );
    } else {
      setConfirmationData(null);
    }
  };

  const handleReset = () => {
    setApplicantName('');
    setPhone('');
    setEmail('');
    setPropertyType('Apartment');
    setBedrooms('1');
    setMonthlyRent('600');
    setMonthlyIncome('');
    setPreferredLocation('');
    setMoveInDate('');
    setEmploymentStatus('');
    setAdditionalInfo('');
    setErrors({});
    setConfirmationData(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {onBack && (
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>← Back to Exercises</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.header}>Exercise #8: Property Rental Application</Text>
      <Text style={styles.subHeader}>Apply to rent a property / house</Text>

      {/* Confirmation Box */}
      {confirmationData && (
        <View style={styles.confirmCard}>
          <Text style={styles.confirmTitle}>✓ Application Submitted Successfully!</Text>
          <Text style={styles.confirmLine}>Applicant: {confirmationData.applicantName}</Text>
          <Text style={styles.confirmLine}>
            Property: {confirmationData.bedrooms} Bed {confirmationData.propertyType} in {confirmationData.preferredLocation}
          </Text>
          <Text style={styles.confirmLine}>
            Rent: ${confirmationData.monthlyRent}/mo | Income: ${confirmationData.monthlyIncome}/mo (≥ 3x passed)
          </Text>
          <Text style={styles.confirmLine}>Move-in Date: {confirmationData.moveInDate}</Text>
          <Text style={styles.confirmLine}>Employment: {confirmationData.employmentStatus}</Text>
        </View>
      )}

      {/* Applicant Name */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Applicant Name *</Text>
        <TextInput
          style={[styles.input, errors.applicantName && styles.inputError]}
          placeholder="e.g. Rachel Adams"
          value={applicantName}
          onChangeText={setApplicantName}
        />
        {errors.applicantName && (
          <Text style={styles.errorText}>{errors.applicantName}</Text>
        )}
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

      {/* Email */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="e.g. rachel@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      {/* Property Type Selection */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Property Type *</Text>
        <View style={styles.rowList}>
          {PROPERTY_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.chip,
                propertyType === type && styles.chipActive,
              ]}
              onPress={() => setPropertyType(type)}
            >
              <Text
                style={[
                  styles.chipText,
                  propertyType === type && styles.chipTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.propertyType && <Text style={styles.errorText}>{errors.propertyType}</Text>}
      </View>

      {/* Number of Bedrooms */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Number of Bedrooms (&gt; 0) *</Text>
        <TextInput
          style={[styles.input, errors.bedrooms && styles.inputError]}
          placeholder="e.g. 2"
          keyboardType="numeric"
          value={bedrooms}
          onChangeText={setBedrooms}
        />
        {errors.bedrooms && <Text style={styles.errorText}>{errors.bedrooms}</Text>}
      </View>

      {/* Property Monthly Rent */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Property Monthly Rent ($) *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 600"
          keyboardType="numeric"
          value={monthlyRent}
          onChangeText={setMonthlyRent}
        />
        <Text style={styles.hintText}>
          Rule: Your monthly income must be at least 3x this amount ($
          {(parseFloat(monthlyRent) || 0) * 3}).
        </Text>
      </View>

      {/* Monthly Income */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Applicant Monthly Income ($ &gt; 0) *</Text>
        <TextInput
          style={[styles.input, errors.monthlyIncome && styles.inputError]}
          placeholder="e.g. 2500"
          keyboardType="numeric"
          value={monthlyIncome}
          onChangeText={setMonthlyIncome}
        />
        {errors.monthlyIncome && (
          <Text style={styles.errorText}>{errors.monthlyIncome}</Text>
        )}
      </View>

      {/* Preferred Location */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Preferred Location / City / Neighborhood *</Text>
        <TextInput
          style={[styles.input, errors.preferredLocation && styles.inputError]}
          placeholder="e.g. Kiyovu, Kigali or Downtown"
          value={preferredLocation}
          onChangeText={setPreferredLocation}
        />
        {errors.preferredLocation && (
          <Text style={styles.errorText}>{errors.preferredLocation}</Text>
        )}
      </View>

      {/* Move-in Date */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Move-in Date (YYYY-MM-DD) *</Text>
        <TextInput
          style={[styles.input, errors.moveInDate && styles.inputError]}
          placeholder="YYYY-MM-DD (e.g. 2026-12-15)"
          value={moveInDate}
          onChangeText={setMoveInDate}
        />
        {errors.moveInDate && <Text style={styles.errorText}>{errors.moveInDate}</Text>}
      </View>

      {/* Employment Status */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Employment Status *</Text>
        <View style={styles.statusList}>
          {EMPLOYMENT_STATUSES.map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusItem,
                employmentStatus === status && styles.statusItemActive,
              ]}
              onPress={() => setEmploymentStatus(status)}
            >
              <Text
                style={[
                  styles.statusItemText,
                  employmentStatus === status && styles.statusItemTextActive,
                ]}
              >
                {employmentStatus === status ? '● ' : '○ '}
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.employmentStatus && (
          <Text style={styles.errorText}>{errors.employmentStatus}</Text>
        )}
      </View>

      {/* Additional Information */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>
          Additional Information (Optional, max 250 characters) [{additionalInfo.length}/250]
        </Text>
        <TextInput
          style={[styles.textArea, errors.additionalInfo && styles.inputError]}
          placeholder="Any special requests, pets, parking needs, etc..."
          multiline
          numberOfLines={3}
          maxLength={260}
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
        />
        {errors.additionalInfo && (
          <Text style={styles.errorText}>{errors.additionalInfo}</Text>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleApply}>
        <Text style={styles.submitBtnText}>Submit Rental Application</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
        <Text style={styles.resetBtnText}>Clear Application</Text>
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
  hintText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    fontStyle: 'italic',
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
  rowList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  chipActive: {
    backgroundColor: '#0D9488',
    borderColor: '#0D9488',
  },
  chipText: {
    fontSize: 13,
    color: '#334155',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  statusList: {
    gap: 6,
  },
  statusItem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    padding: 10,
    borderRadius: 8,
  },
  statusItemActive: {
    borderColor: '#0D9488',
    backgroundColor: '#F0FDFA',
  },
  statusItemText: {
    fontSize: 14,
    color: '#334155',
  },
  statusItemTextActive: {
    color: '#0F766E',
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: '#0D9488',
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
    backgroundColor: '#CCFBF1',
    borderColor: '#0D9488',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },
  confirmTitle: {
    color: '#115E59',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  confirmLine: {
    color: '#134E4A',
    fontSize: 13,
    marginTop: 2,
  },
});
