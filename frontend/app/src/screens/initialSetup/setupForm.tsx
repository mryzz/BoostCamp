import { useState, useEffect } from 'react';
import useDimensions from '../../hooks/useDimensions';
import { View, Text, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

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

  // Function to pick a file
  const pickFile = async (setter: (arg0: DocumentPickerResponse[]) => void) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(res);
      setter(res); // Set the state with the picked file
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  };

  // Function to handle the form creation
  async function handleForm() { 
    handleSetupSuccess()
    // TODO: validate user inputs

    // TODO: Post data to backend
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
