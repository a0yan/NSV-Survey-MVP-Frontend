import Footer from '@/components/ui/Footer';
import Loader from '@/components/ui/Loader';
import { useAuth } from '@/context/AuthContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { twMerge } from 'tailwind-merge';


const roles = [
  { label: 'Admin', icon: 'account-tie-outline' },
  { label: 'RO', icon: 'account-circle-outline' },
  { label: 'PIU', icon: 'account-supervisor-outline' },
];

const LoginScreen = () => {
  const [role, setRole] = useState('Admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

 const handleLogin = async () => {
  setLoading(true);
  if (username && password) {
    try {
      const response = await login(username, password);
      if (response.success) {
        router.replace('/(dashboard)/SelectProject');
      } else {
        Alert.alert('Login Failed', response.msg || 'Please check your credentials and try again.');
      }
    } catch (error) {
          console.error(error);
      Alert.alert('Login Failed', 'An error occurred. Please try again.');
    }
  } else {

    Alert.alert('Login Failed', 'Please enter username and password');
  }
  setLoading(false);
};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAvoidingView
      className="flex-1 bg-[#f4f8ff]"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Loader loading={loading}>
      <View className="flex-1 items-center justify-center bg-[#f4f8ff] p-4">
        <View className="items-center mb-8">
          <View className="bg-indigo-100 rounded-2xl w-16 h-16 items-center justify-center mb-3">
            <MaterialCommunityIcons name="road-variant" size={40} color="#2563eb" />
          </View>
          <Text className="text-2xl font-bold text-[#22223b] mb-0.5">Highway Inspection</Text>
          <Text className="text-base text-gray-500 mb-2">NSV Data Inspection System</Text>
        </View>
        <View className="bg-white rounded-2xl p-6 w-[340px] shadow-md items-stretch">
          <Text className="text-xl font-bold text-[#22223b] mb-1 text-center">Welcome Back</Text>
          <Text className="text-base text-gray-500 mb-4 text-center">Sign in to continue your inspection work</Text>
          <Text className="text-sm text-[#22223b] mb-1 mt-2 font-medium">Select Role</Text>
          <View className="flex-row justify-between mb-3 gap-2">
            {roles.map((r) => (
              <Pressable
                key={r.label}
                className={twMerge(
                  'flex-1 flex-row items-center justify-center bg-gray-100 rounded-lg p-2.5 mx-0.5 border',
                  role === r.label ? 'bg-indigo-100 border-indigo-600' : 'border-gray-100'
                )}
                onPress={() => setRole(r.label)}
              >
                <MaterialCommunityIcons
                  name={r.icon as any}
                  size={20}
                  color={role === r.label ? '#2563eb' : '#6b7280'}
                  style={{ marginBottom: 2 }}
                />
                <Text className={twMerge('text-[10px] text-gray-500 ml-1 font-medium', role === r.label && 'text-indigo-600 font-bold')}>{r.label}</Text>
              </Pressable>
            ))}
          </View>
          <Text className="text-sm text-[#22223b] mb-1 mt-2 font-medium">Username</Text>
          <View className="flex-row items-center bg-gray-100 rounded-lg border border-gray-200 mb-3 px-2 h-12">
            <Ionicons name="person-outline" size={20} color="#6b7280" style={{ marginRight: 8 }} />
            <TextInput
              className="flex-1 text-base text-[#22223b]"
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor="#9ca3af"
            />
          </View>
          <Text className="text-sm text-[#22223b] mb-1 mt-2 font-medium">Password</Text>
          <View className="flex-row items-center bg-gray-100 rounded-lg border border-gray-200 mb-3 px-2 h-12">
            <Ionicons name="lock-closed-outline" size={20} color="#6b7280" style={{ marginRight: 8 }} />
            <TextInput
              className="flex-1 text-base text-[#22223b]"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              placeholderTextColor="#9ca3af"
            />
            <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="bg-indigo-600 rounded-lg py-3 items-center mt-2"
            onPress={handleLogin}
            disabled={loading}
          >
            <Text className="text-white text-base font-bold tracking-wide">{loading ? 'Logging in...' : 'Login'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer/>
      </Loader>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};



export default LoginScreen;
