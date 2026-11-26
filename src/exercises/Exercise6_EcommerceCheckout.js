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

const PAYMENT_METHODS = ['Mobile Money (MOMO)', 'Credit / Debit Card', 'Cash on Delivery'];
const DELIVERY_OPTIONS = ['Standard Delivery (3-5 days)', 'Express Delivery (Next Day)', 'In-Store Pickup'];

export default function Exercise6_EcommerceCheckout({ onBack }) {
  // Form state
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');

  // UI state
  const [errors, setErrors] = useState({});
  const [orderSummary, setOrderSummary] = useState(null);

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validate = () => {
    let errs = {};

    // Customer Name: Required
    if (!customerName.trim()) {
      errs.customerName = 'Customer name is required.';
    }

    // Phone: Required
    if (!phone.trim()) {
      errs.phone = 'Phone number is required.';
    }

    // Email: Valid email
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!validateEmail(email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    // Delivery Address: Required
    if (!deliveryAddress.trim()) {
      errs.deliveryAddress = 'Delivery address is required.';
    }

    // City: Required
    if (!city.trim()) {
      errs.city = 'City is required.';
    }

    // Product Quantity: Integer greater than 0
    // CHALLENGE: Display "Quantity must be greater than 0" when provided quantity is less or equal to 0.
    if (!quantity.trim()) {
      errs.quantity = 'Product quantity is required.';
    } else {
      const qNum = parseInt(quantity, 10);
      if (isNaN(qNum) || !/^\d+$/.test(quantity.trim()) || qNum <= 0) {
        errs.quantity = 'Quantity must be greater than 0';
      }
    }

    // Payment Method: Required
    if (!paymentMethod) {
      errs.paymentMethod = 'Please select a payment method.';
    }

    // Delivery Option: Required
    if (!deliveryOption) {
      errs.deliveryOption = 'Please select a delivery option.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCheckout = () => {
    if (validate()) {
      const summary = {
        customerName,
        phone,
        email,
        deliveryAddress,
        city,
        quantity: parseInt(quantity, 10),
        paymentMethod,
        deliveryOption,
        unitPrice: 45,
        totalPrice: parseInt(quantity, 10) * 45,
      };
      setOrderSummary(summary);
      Alert.alert('Order Confirmed', `Thank you ${customerName}! Your order has been placed.`);
    } else {
      setOrderSummary(null);
    }
  };

  const handleReset = () => {
    setCustomerName('');
    setPhone('');
    setEmail('');
    setDeliveryAddress('');
    setCity('');
    setQuantity('1');
    setPaymentMethod('');
    setDeliveryOption('');
    setErrors({});
    setOrderSummary(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {onBack && (
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>← Back to Exercises</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.header}>Exercise #6: E-Commerce Checkout</Text>
      <Text style={styles.subHeader}>Review items and complete your order</Text>

      {/* Order Summary After Validation */}
      {orderSummary && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryHeader}>🎉 Order Summary &amp; Confirmation</Text>
          <Text style={styles.summaryRow}>Customer: {orderSummary.customerName}</Text>
          <Text style={styles.summaryRow}>Contact: {orderSummary.phone} ({orderSummary.email})</Text>
          <Text style={styles.summaryRow}>Address: {orderSummary.deliveryAddress}, {orderSummary.city}</Text>
          <Text style={styles.summaryRow}>Quantity: {orderSummary.quantity} item(s)</Text>
          <Text style={styles.summaryRow}>Payment Method: {orderSummary.paymentMethod}</Text>
          <Text style={styles.summaryRow}>Delivery: {orderSummary.deliveryOption}</Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Price (at $45/item):</Text>
            <Text style={styles.totalAmount}>${orderSummary.totalPrice}</Text>
          </View>
        </View>
      )}

      {/* Customer Name */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Customer Name *</Text>
        <TextInput
          style={[styles.input, errors.customerName && styles.inputError]}
          placeholder="e.g. Samuel Green"
          value={customerName}
          onChangeText={setCustomerName}
        />
        {errors.customerName && <Text style={styles.errorText}>{errors.customerName}</Text>}
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

      {/* Email */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="e.g. samuel@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      {/* Delivery Address */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Delivery Address *</Text>
        <TextInput
          style={[styles.input, errors.deliveryAddress && styles.inputError]}
          placeholder="Street address, building / apartment"
          value={deliveryAddress}
          onChangeText={setDeliveryAddress}
        />
        {errors.deliveryAddress && (
          <Text style={styles.errorText}>{errors.deliveryAddress}</Text>
        )}
      </View>

      {/* City */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>City *</Text>
        <TextInput
          style={[styles.input, errors.city && styles.inputError]}
          placeholder="e.g. Kigali / New York"
          value={city}
          onChangeText={setCity}
        />
        {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
      </View>

      {/* Product Quantity */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Product Quantity (&gt; 0) *</Text>
        <TextInput
          style={[styles.input, errors.quantity && styles.inputError]}
          placeholder="Enter quantity (e.g. 1)"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />
        {errors.quantity && <Text style={styles.errorText}>{errors.quantity}</Text>}
      </View>

      {/* Payment Method Selection */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Payment Method *</Text>
        <View style={styles.optionsList}>
          {PAYMENT_METHODS.map((pm) => (
            <TouchableOpacity
              key={pm}
              style={[
                styles.selectBox,
                paymentMethod === pm && styles.selectBoxActive,
              ]}
              onPress={() => setPaymentMethod(pm)}
            >
              <Text
                style={[
                  styles.selectBoxText,
                  paymentMethod === pm && styles.selectBoxTextActive,
                ]}
              >
                {paymentMethod === pm ? '● ' : '○ '}
                {pm}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.paymentMethod && <Text style={styles.errorText}>{errors.paymentMethod}</Text>}
      </View>

      {/* Delivery Option Selection */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Delivery Option *</Text>
        <View style={styles.optionsList}>
          {DELIVERY_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.selectBox,
                deliveryOption === opt && styles.selectBoxActive,
              ]}
              onPress={() => setDeliveryOption(opt)}
            >
              <Text
                style={[
                  styles.selectBoxText,
                  deliveryOption === opt && styles.selectBoxTextActive,
                ]}
              >
                {deliveryOption === opt ? '● ' : '○ '}
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.deliveryOption && <Text style={styles.errorText}>{errors.deliveryOption}</Text>}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleCheckout}>
        <Text style={styles.submitBtnText}>Confirm and Place Order</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
        <Text style={styles.resetBtnText}>Clear Checkout</Text>
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
  optionsList: {
    gap: 8,
  },
  selectBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    padding: 12,
    borderRadius: 8,
  },
  selectBoxActive: {
    borderColor: '#EA580C',
    backgroundColor: '#FFF7ED',
  },
  selectBoxText: {
    fontSize: 14,
    color: '#334155',
  },
  selectBoxTextActive: {
    color: '#C2410C',
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: '#EA580C',
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
  summaryCard: {
    backgroundColor: '#FFFBEB',
    borderColor: '#F59E0B',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    gap: 4,
  },
  summaryHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B45309',
    marginBottom: 6,
  },
  summaryRow: {
    fontSize: 13,
    color: '#78350F',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#FDE68A',
    paddingTop: 8,
    marginTop: 6,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400E',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B45309',
  },
});
