import { useState, useEffect, SetStateAction } from 'react';
import useDimensions from '../../hooks/useDimensions';
import { View, Text, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  location: string;
  profilePicture: File | null;
  introduction: string;
  // Coach-specific fields
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

export default function CoachForm() {
  // And other form field state
  const [loading, setLoading] = useState(false);
  const [isCoachMode, setIsCoachMode] = useState(false);
  const { setIsInitialSetupComplete } = useAuthStore();

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


  const pickFile = async (setter: { (value: SetStateAction<null>): void; (value: SetStateAction<null>): void; (file: any): void; (arg0: any): void; }) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        // Ensures only one file can be selected
      });
      const pickedFile = res[0];
      if (pickedFile && pickedFile.uri) {
        setter(pickedFile.uri); // Set the state with the file's URI
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
        // Optionally reset the file selection state to null if needed
        // setter(null);
      } else {
        console.error('DocumentPicker Error: ', err);
        throw err;
      }
    }
  };

  function validateInputs(formData: FormData): FormErrors {
    let errors: FormErrors = {};

    // Validate student-specific fields
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phoneNumber)) errors.phoneNumber = 'Invalid phone number, must be 10 digits';
    if (!formData.gender.trim()) errors.gender = 'Gender is required';
    if (!formData.location.trim()) errors.location = 'Location is required';

    // Validate coach-specific fields if in coach mode
    if (isCoachMode) { // Assume isCoachMode is a boolean indicating if the user is a coach
      if (!formData.title.trim()) errors.title = 'Title is required for coaches';
      if (!formData.specialties.trim()) errors.specialties = 'Specialties are required for coaches';
      if (!formData.experience.trim()) errors.experience = 'Experience is required for coaches';
      // Additional validations for coach fields...
      if (!formData.yearsOfExperience.trim()) errors.yearsOfExperience = 'Years of experience is required for coaches';
      else if (isNaN(Number(formData.yearsOfExperience)) || Number(formData.yearsOfExperience) <= 0) errors.yearsOfExperience = 'Invalid years of experience, must be a positive number';

      if (!formData.education.institution.trim()) errors['education.institution'] = 'Institution is required for coaches';
      if (!formData.education.fieldOfStudy.trim()) errors['education.fieldOfStudy'] = 'Field of study is required for coaches';
      // LinkedIn link validation
      if (formData.linkedinLink.trim() && !/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(formData.linkedinLink))
        errors.linkedinLink = 'Invalid LinkedIn link';
    }

    return errors;
  }

  async function handleForm() {
    const formData: FormData = {
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

    const errors = validateInputs(formData);

    // Check if there are any errors
    if (Object.keys(errors).length === 0) {
      // No errors, proceed with form submission
      console.log(formData);
      handleSetupSuccess()
      // TODO: Post data to backend
    } else {
      // Handle errors, e.g., by showing them to the user
      console.error('Validation errors:', errors);
      // TODO: Display errors in the UI
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
    }}
    contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
  >
    <Text>SStudent Form</Text>

    <TouchableOpacity onPress={() => setIsCoachMode(!isCoachMode)}>
      <Text>{isCoachMode ? "Switch to Student Mode" : "Switch to Coach Mode"}</Text>
    </TouchableOpacity>

    <TextInput
      value={firstName}
      onChangeText={setFirstName}
      placeholder="First Name"
      // Add styling as needed
    />
    <TextInput
      value={lastName}
      onChangeText={setLastName}
      placeholder="Last Name"
      // Add styling as needed
    />
    <TextInput
      value={phoneNumber}
      onChangeText={setPhoneNumber}
      placeholder="Phone Number"
      // Add styling as needed
    />
    <TextInput
      value={gender}
      onChangeText={setGender}
      placeholder="Gender"
      // Add styling as needed
    />
    <TextInput
      value={location}
      onChangeText={setLocation}
      placeholder="Location"
      // Add styling as needed
    />
    <Button
      title="Pick Profile Picture"
      onPress={() => pickFile(setProfilePicture)}
    />
    <TextInput
      value={introduction}
      onChangeText={setIntroduction}
      placeholder="Write your introduction here..."
      // Add styling as needed
    />

  {/* Conditional Rendering for Coach-specific Fields */}   
  {isCoachMode && (
    <>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title (e.g., History Tutor)"
        // Add additional styling as needed
      />
      <TextInput
        value={specialties}
        onChangeText={setSpecialties}
        placeholder="Specialties (e.g., European History)"
        // Add additional styling as needed
      />
      <TextInput
        value={experience}
        onChangeText={setExperience}
        placeholder="Experience"
        multiline
        // Add additional styling as needed
      />
      <TextInput
        value={achievements}
        onChangeText={setAchievements}
        placeholder="Achievements"
        multiline
        // Add additional styling as needed
      />
      <TextInput
        value={certificationName}
        onChangeText={setCertificationName}
        placeholder="Certification Name"
        // Add additional styling as needed
      />
      <Button
        title="Pick Certification Document"
        onPress={() => pickFile(setCertification)}
      />
      <TextInput
        value={yearsOfExperience}
        onChangeText={setYearsOfExperience}
        placeholder="Years of Experience"
        keyboardType="numeric"
        // Add additional styling as needed
      />
      <TextInput
        value={testimonials}
        onChangeText={setTestimonials}
        placeholder="Testimonials"
        multiline
        // Add additional styling as needed
      />
      {/* Education Fields */}
      <TextInput
        value={education.institution}
        onChangeText={(text) => setEducation({ ...education, institution: text })}
        placeholder="Institution (e.g., Nanyang JC)"
        // Add additional styling as needed
      />
      <TextInput
        value={education.fieldOfStudy}
        onChangeText={(text) => setEducation({ ...education, fieldOfStudy: text })}
        placeholder="Field of Study (e.g., A Level)"
        // Add additional styling as needed
      />
      <Button
        title="Pick Education Certification"
        onPress={() => pickFile((file) => setEducation({ ...education, certification: file }))}
      />
      <TextInput
        value={linkedinLink}
        onChangeText={setLinkedinLink}
        placeholder="LinkedIn Link"
        // Add additional styling as needed
      />
    </>
  )}

    <Button title="Submit" onPress={() => handleForm() } />
  </ScrollView>
  )
  }
