// models.ts

export interface UserProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: 'Male' | 'Female' | 'Other';
  location: string;
  profilePicture?: string; // URL to the image; optional
  introduction?: string; // optional
}

export interface CoachProfile extends UserProfile {
  title: string; // e.g., History tutor
  specialties: string[]; // e.g., History subject
  experience: string; // Long text
  achievements: string; // Long text
  certificationName: string;
  certificationFile: string; // URL to the file (PDF)
  yearsOfExperience: number;

  testimonials: string[];
  education: EducationBackground[];
  linkedInLink?: string; // Optional
}

export interface EducationBackground {
  institution: string; // e.g., Nanyang JC
  fieldOfStudy: string; // e.g., A Level
  certification: string; // URL to the file (PDF/PNG/IMG)
}

// Example of how to use these interfaces
export const exampleUser: UserProfile = {
  firstName: "Jane",
  lastName: "Doe",
  phoneNumber: "+6512345678",
  gender: "Female",
  location: "Singapore",
  profilePicture: "https://example.com/path/to/profile.jpg",
  introduction: "Lorem ipsum dolor sit amet...",
};

export const exampleCoach: CoachProfile = {
  ...exampleUser,
  title: "History Tutor",
  specialties: ["World War II", "Ancient Civilizations"],
  experience: "Detailed description of past teaching experience...",
  achievements: "List of relevant achievements...",
  certificationName: "Teaching Certification",
  certificationFile: "https://example.com/path/to/certification.pdf",
  yearsOfExperience: 5,
  testimonials: ["Testimonial 1...", "Testimonial 2..."],
  education: [{
    institution: "Nanyang JC",
    fieldOfStudy: "A Level",
    certification: "https://example.com/path/to/a-level-cert.pdf",
  }],
  linkedInLink: "https://linkedin.com/in/example",
};
