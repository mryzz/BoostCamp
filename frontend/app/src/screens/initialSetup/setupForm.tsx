import { useState, useEffect, SetStateAction } from 'react';
import useDimensions from '../../hooks/useDimensions';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { Switch } from 'react-native-paper';
import CustomTextInput from '../../components/text-input';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { showMessage } from 'react-native-flash-message';
// import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

// API URL for login requests
const URL = 'http://192.168.1.160:8000/accounts/profiles/basic/';

interface StructuredFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  location: string;
  profilePicture: File | null;
  introduction: string;
  title: string;
  specialties: string;
  experience: string;
  achievements: string;
  certificationName: string;
  certification: File | null;
  yearsOfExperience: string;
  testimonials: string;
  education: {
    institution: string;
    fieldOfStudy: string;
    certification: File | null;
  };
  linkedinLink: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FormSubmissionSuccessResponse {
  message: string; // Adjust based on your API's response structure
}

interface ApiErrorResponse {
  error: string;
}

export default function CoachForm() {
  // And other form field state
  const [loading, setLoading] = useState(false);
  const [isCoachMode, setIsCoachMode] = useState(false);
  const { setIsInitialSetupComplete } = useAuthStore();
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Student specific fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [introduction, setIntroduction] = useState('');

  // Coach-specific fields:
  const [title, setTitle] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [experience, setExperience] = useState('');
  const [achievements, setAchievements] = useState('');
  const [certificationName, setCertificationName] = useState('');
  const [certification, setCertification] = useState(null); // For document picker
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [testimonials, setTestimonials] = useState('');
  const [education, setEducation] = useState({
    institution: '',
    fieldOfStudy: '',
    certification: null, // For document picker
  });
  const [linkedinLink, setLinkedinLink] = useState('');

  // Hooks for navigation and screen dimensions
  const { screenWidth, screenHeight } = useDimensions();
  
  const handleSetupSuccess = () => {
    setIsInitialSetupComplete(true);
  };


  // const pickFile = async (setter: { (value: SetStateAction<null>): void; (value: SetStateAction<null>): void; (file: any): void; (arg0: any): void; }) => {
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //       // Ensures only one file can be selected
  //     });
  //     const pickedFile = res[0];
  //     if (pickedFile && pickedFile.uri) {
  //       setter(pickedFile.uri); // Set the state with the file's URI
  //     }
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log('User cancelled the picker');
  //       // Optionally reset the file selection state to null if needed
  //       // setter(null);
  //     } else {
  //       console.error('DocumentPicker Error: ', err);
  //       throw err;
  //     }
  //   }
  // };

  function validateInputs(data: StructuredFormData, isCoachMode: boolean): FormErrors {
    let errors: FormErrors = {};

    // Validate student-specific fields
    if (!data.firstName.trim()) errors.firstName = 'First name is required';
    if (!data.lastName.trim()) errors.lastName = 'Last name is required';
    if (!data.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
    // else if (!/^\d{11}$/.test(data.phoneNumber)) errors.phoneNumber = 'Invalid phone number, must be 11 digits';
    if (!data.gender.trim()) errors.gender = 'Gender is required';
    if (!data.location.trim()) errors.location = 'Location is required';

    // Validate coach-specific fields if in coach mode
    if (isCoachMode) {
      if (!data.title.trim()) errors.title = 'Title is required for coaches';
      if (!data.specialties.trim()) errors.specialties = 'Specialties are required for coaches';
      if (!data.experience.trim()) errors.experience = 'Experience is required for coaches';
      if (!data.yearsOfExperience.trim()) errors.yearsOfExperience = 'Years of experience is required for coaches';
      else if (isNaN(Number(data.yearsOfExperience)) || Number(data.yearsOfExperience) <= 0) errors.yearsOfExperience = 'Invalid years of experience, must be a positive number';

      if (!data.education.institution.trim()) errors['education.institution'] = 'Institution is required for coaches';
      if (!data.education.fieldOfStudy.trim()) errors['education.fieldOfStudy'] = 'Field of study is required for coaches';
      if (data.linkedinLink.trim() && !/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(data.linkedinLink))
        errors.linkedinLink = 'Invalid LinkedIn link';
    }

    return errors;
  }

  async function handleForm() {
    const structuredFormData = {
      firstName,
      lastName,
      phoneNumber,
      gender,
      location,
      profilePicture,
      introduction,
      title,
      specialties,
      experience,
      achievements,
      certificationName,
      certification,
      yearsOfExperience,
      testimonials,
      education,
      linkedinLink,
    };

const errors = validateInputs(structuredFormData, isCoachMode);
if (Object.keys(errors).length > 0) {
  // Handle validation errors
  console.error('Validation errors:', errors);
  setFormErrors(errors);
  setLoading(false);
  return; // Stop execution if there are errors
}

setLoading(true);

// Create a promise that rejects after 7 seconds
const timeoutPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('Request timed out')), 15000);
});

//TODO: Debug the sending of request to server, keep getting 400
//TODO: Createif logic to ssend coach or student data depending on user's choice
try {
  const formData = new FormData();
  formData.append('first_name', firstName);
  formData.append('last_name', lastName);
  formData.append('phone_number', phoneNumber);
  formData.append('gender', gender.toLowerCase());
  formData.append('location', location);
  // formData.append('introduction', introduction);
  // formData.append('title', title);
  // formData.append('specialties', specialties);
  // formData.append('experience', experience);
  // formData.append('achievements', achievements);
  // formData.append('certificationName', certificationName);
  // formData.append('yearsOfExperience', yearsOfExperience);
  // formData.append('testimonials', testimonials);
  // formData.append('linkedinLink', linkedinLink);

  // // Handle complex object (convert to JSON string)
  // formData.append('education', JSON.stringify(education));

  // // Handle file fields conditionally
  // if (profilePicture) {
  //   // Assuming profilePicture is a File object; adjust as necessary
  //   formData.append('profilePicture', profilePicture);
  // }
  // if (certification) {
  //   // Assuming certification is a File object; adjust as necessary
  //   formData.append('certification', certification);
  // }

  console.log(formData);
  // Race the axios request against the timeout
  const result = await Promise.race([
    axios.post(URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // TODO: Get the token from login and insert here at the authorization
        'Authorization': 'Token af3eb88c5d3f470c74de2a9ee0b5bcfcc4e6894f'
      },
    }),
    timeoutPromise
  ]);

  const response = result as AxiosResponse<FormSubmissionSuccessResponse>;

  if (response.status === 200 || response.status === 201) {
    showMessage({
      message: "Account created successfully!",
      type: "success",
    });
    handleSetupSuccess();
    setLoading(false);
  }
} catch (error) {
  console.log(error)
  setLoading(false); // Ensure loading state is reset

  // Asserting error type as AxiosError
  if (axios.isAxiosError(error)) {
    let errorMessage = "Failed to sign up!";
    if (error.response) {
      const errorData = error.response.data as ApiErrorResponse;
      errorMessage = errorData.error ? errorData.error : errorMessage;
    } else if (error.request) {
      errorMessage = "Network error or server did not respond.";
    }
    showMessage({
      message: errorMessage,
      type: "danger",
      icon: "danger",
    });
  } else if (error instanceof Error && error.message === 'Request timed out') {
    // Handle timeout specific error
    showMessage({
      message: "Signup request timed out, please try again.",
      type: "danger",
    });
  } else {
    // Handle other errors that might not be Axios errors
    showMessage({
      message: "An unexpected error occurred.",
      type: "danger",
    });
  }
}
  }
    
    return (
  <ScrollView
    style={{
      width: screenWidth,
      height: screenHeight,
      backgroundColor: "#fff",
      paddingHorizontal: 16,
      paddingVertical: 32,
      flex: 1,
    }}
    contentContainerStyle={{ justifyContent: "space-between", flexGrow: 1, }}
  >

    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text>{isCoachMode ? 'Switch to Student Mode' : 'Switch to Coach Mode'}</Text>
      <Switch
        value={isCoachMode}
        onValueChange={() => setIsCoachMode(!isCoachMode)}
        color="tomato" // Optional: customize the switch color
      />
    </View>
    <View style={styles.row}>
      <CustomTextInput
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
        required={true}
        placeholder="First Name"
        containerStyle={styles.halfWidth}
      />
      <CustomTextInput
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
        required={true}
        placeholder="Last Name"
        containerStyle={styles.halfWidth}
      />
    </View>
    <CustomTextInput
      label="Phone Number"
      value={phoneNumber}
      onChangeText={setPhoneNumber}
      required={true}
      placeholder="Phone Number"
    />
    <CustomTextInput
      label="Gender"
      value={gender}
      onChangeText={setGender}
      required={true} // Set as needed
      placeholder="Gender"
    />
    <CustomTextInput
      label="Location"
      value={location}
      onChangeText={setLocation}
      required={true}
      placeholder="Location"
    />
    <Button
      title="Pick Profile Picture"
      // onPress={() => pickFile(setProfilePicture)}
    />
    <CustomTextInput
      label="introduction"
      value={introduction}
      onChangeText={setIntroduction}
      required={false} // Set as needed
      placeholder="Write your introduction here..."
    />

  {/* Conditional Rendering for Coach-specific Fields */}   
    {isCoachMode && (
    <View>
      <Text style={styles.sectionTitle}>Coach-Specific Information</Text>
      <CustomTextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        required={true}
        placeholder="e.g., History Tutor"
      />
      <CustomTextInput
        label="Specialties"
        value={specialties}
        onChangeText={setSpecialties}
        required={true}
        placeholder="e.g., European History"
      />
      <CustomTextInput
        label="Experience"
        value={experience}
        onChangeText={setExperience}
        required={true}
        placeholder="Your experience"
        multiline
      />
      <CustomTextInput
        label="Achievements"
        value={achievements}
        onChangeText={setAchievements}
        required={false}
        placeholder="Your achievements"
        multiline
      />
      <CustomTextInput
        label="Certification Name"
        value={certificationName}
        onChangeText={setCertificationName}
        required={true}
        placeholder="Certification name"
      />
      <CustomTextInput
        label="Years of Experience"
        value={yearsOfExperience}
        onChangeText={setYearsOfExperience}
        required={true}
        placeholder="Years of experience"
        keyboardType="numeric"
      />
      <CustomTextInput
        label="Testimonials"
        value={testimonials}
        onChangeText={setTestimonials}
        required={false}
        placeholder="Testimonials"
        multiline
      />
      <CustomTextInput
        label="Institution"
        value={education.institution}
        onChangeText={(text: any) => setEducation({ ...education, institution: text })}
        required={true}
        placeholder="e.g., Nanyang JC"
      />
      <CustomTextInput
        label="Field of Study"
        value={education.fieldOfStudy}
        onChangeText={(text: any) => setEducation({ ...education, fieldOfStudy: text })}
        required={true}
        placeholder="e.g., A Level"
      />
      <CustomTextInput
        label="LinkedIn Link"
        value={linkedinLink}
        onChangeText={setLinkedinLink}
        required={false}
        placeholder="Your LinkedIn profile link"
      />
    </View>
  )}

    <Button title="Submit" onPress={() => handleForm() } />
  </ScrollView>
  )
  }

  const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%', // Adjusts for spacing, you can tweak this as needed
  },
  sectionTitle: {
    fontSize: 24, // Adjust fontSize to match <h1> styling as needed
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
    marginTop: 20, // Add some top margin
  }
});
