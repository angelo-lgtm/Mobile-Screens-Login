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

const CURRENCIES = ['USD', 'EUR', 'GBP', 'RWF'];

export default function Exercise3_BankingTransfer({ onBack }) {
  // Form fields
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [description, setDescription] = useState('');
  const [pin, setPin] = useState('');

  // UI state
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transferComplete, setTransferComplete] = useState(false);

  // Validation function
  const validate = () => {
    let errs = {};

    // Account Name: Required
    if (!accountName.trim()) {
      errs.accountName = 'Account name is required.';
    }

    // Account Number: Required; numbers only
    if (!accountNumber.trim()) {
      errs.accountNumber = 'Account number is required.';
    } else if (!/^\d+$/.test(accountNumber.trim())) {
      errs.accountNumber = 'Account number must contain numbers only.';
    }

    // Amount: Required; greater than 0
    if (!amount.trim()) {
      errs.amount = 'Amount is required.';
    } else {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        errs.amount = 'Amount must be greater than 0.';
      }
    }

    // Currency: Required
    if (!currency) {
      errs.currency = 'Currency is required.';
    }

    // Description: Optional; max 100 characters
    if (description.length > 100) {
      errs.description = 'Description cannot exceed 100 characters.';
    }

    // PIN: Required; exactly 4 digits
    if (!pin) {
      errs.pin = 'PIN is required.';
    } else if (!/^\d{4}$/.test(pin)) {
      errs.pin = 'PIN must be exactly 4 digits.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 1: Validate and open confirmation screen
  const handleProceedToConfirm = () => {
    if (validate()) {
      setShowConfirmation(true);
    }
  };

  // Step 2: Final Transfer Completion
  const handleCompleteTransfer = () => {
    setShowConfirmation(false);
    setTransferComplete(true);
    Alert.alert('Transfer Successful', `Successfully sent ${currency} ${amount} to ${accountName}`);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleNewTransfer = () => {
    setAccountName('');
    setAccountNumber('');
    setAmount('');
    setCurrency('USD');
    setDescription('');
    setPin('');
    setErrors({});
    setShowConfirmation(false);
    setTransferComplete(false);
  };

  // Confirmation Screen View
  if (showConfirmation) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Confirm Transfer</Text>
        <Text style={styles.subHeader}>Please review the transfer details before submitting.</Text>

        <View style={styles.reviewCard}>
          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>Recipient Name:</Text>
            <Text style={styles.reviewValue}>{accountName}</Text>
          </View>
          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>Account Number:</Text>
            <Text style={styles.reviewValue}>{accountNumber}</Text>
          </View>
          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>Amount:</Text>
            <Text style={[styles.reviewValue, styles.highlightAmount]}>
              {currency} {parseFloat(amount).toFixed(2)}
            </Text>
          </View>
          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>Description:</Text>
            <Text style={styles.reviewValue}>{description || 'None'}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleCompleteTransfer}>
          <Text style={styles.submitBtnText}>Confirm &amp; Send Transfer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelConfirmation}>
          <Text style={styles.cancelBtnText}>Edit Details / Back</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {onBack && (
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>← Back to Exercises</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.header}>Exercise #3: Banking Transfer</Text>
      <Text style={styles.subHeader}>Send money securely to any account</Text>

      {/* Success Notification */}
      {transferComplete && (
        <View style={styles.successBanner}>
          <Text style={styles.successTitle}>✓ Transfer Completed Successfully!</Text>
          <TouchableOpacity style={styles.smallActionBtn} onPress={handleNewTransfer}>
            <Text style={styles.smallActionBtnText}>Make Another Transfer</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Account Name */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Recipient Account Name *</Text>
        <TextInput
          style={[styles.input, errors.accountName && styles.inputError]}
          placeholder="e.g. Marie Claire"
          value={accountName}
          onChangeText={setAccountName}
        />
        {errors.accountName && <Text style={styles.errorText}>{errors.accountName}</Text>}
      </View>

      {/* Account Number */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Account Number (Numbers only) *</Text>
        <TextInput
          style={[styles.input, errors.accountNumber && styles.inputError]}
          placeholder="e.g. 1000458923"
          keyboardType="numeric"
          value={accountNumber}
          onChangeText={setAccountNumber}
        />
        {errors.accountNumber && <Text style={styles.errorText}>{errors.accountNumber}</Text>}
      </View>

      {/* Amount and Currency */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Amount (&gt; 0) *</Text>
        <TextInput
          style={[styles.input, errors.amount && styles.inputError]}
          placeholder="e.g. 250"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
      </View>

      {/* Currency Selection */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Currency *</Text>
        <View style={styles.currencyRow}>
          {CURRENCIES.map((curr) => (
            <TouchableOpacity
              key={curr}
              style={[
                styles.currencyChip,
                currency === curr && styles.currencyChipSelected,
              ]}
              onPress={() => setCurrency(curr)}
            >
              <Text
                style={[
                  styles.currencyChipText,
                  currency === curr && styles.currencyChipTextSelected,
                ]}
              >
                {curr}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.currency && <Text style={styles.errorText}>{errors.currency}</Text>}
      </View>

      {/* Transfer Description */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>
          Transfer Description (Optional, max 100 chars) [{description.length}/100]
        </Text>
        <TextInput
          style={[styles.input, errors.description && styles.inputError]}
          placeholder="e.g. Project consultation payment"
          maxLength={110}
          value={description}
          onChangeText={setDescription}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
      </View>

      {/* PIN */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Secret PIN (Exactly 4 digits) *</Text>
        <TextInput
          style={[styles.input, errors.pin && styles.inputError]}
          placeholder="••••"
          secureTextEntry
          maxLength={4}
          keyboardType="numeric"
          value={pin}
          onChangeText={setPin}
        />
        {errors.pin && <Text style={styles.errorText}>{errors.pin}</Text>}
      </View>

      {/* Review & Proceed */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleProceedToConfirm}>
        <Text style={styles.submitBtnText}>Review Transfer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetBtn} onPress={handleNewTransfer}>
        <Text style={styles.resetBtnText}>Clear Details</Text>
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
  currencyRow: {
    flexDirection: 'row',
    gap: 10,
  },
  currencyChip: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    alignItems: 'center',
  },
  currencyChipSelected: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  currencyChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  currencyChipTextSelected: {
    color: '#FFFFFF',
  },
  submitBtn: {
    backgroundColor: '#059669',
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
  cancelBtn: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#94A3B8',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  cancelBtnText: {
    color: '#475569',
    fontSize: 15,
    fontWeight: '600',
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
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    gap: 12,
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  reviewLabel: {
    color: '#64748B',
    fontSize: 14,
  },
  reviewValue: {
    color: '#1E293B',
    fontSize: 14,
    fontWeight: '600',
  },
  highlightAmount: {
    color: '#059669',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successBanner: {
    backgroundColor: '#D1FAE5',
    borderColor: '#059669',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },
  successTitle: {
    color: '#065F46',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  smallActionBtn: {
    backgroundColor: '#059669',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  smallActionBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
