import { useState, useEffect, SetStateAction } from 'react';
import useDimensions from '../../hooks/useDimensions';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { Switch } from 'react-native-paper';
import CustomTextInput from '../../components/text-input';
// import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

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
      setFormErrors(errors);
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
