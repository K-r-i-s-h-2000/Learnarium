// course.model.ts

// Define the interface for a Lesson
export interface Lesson {
    title: string;
    description: string;
    videoId: number;
  }
  
  // Define the interface for a Course
  export interface Course {
    title: string;
    description: string;
    categoryId: number;
    lessons: Lesson[]; // An array of Lesson objects
    level: number;
    fees: number;
    instructor:any;
  }
  export interface Video {
    title: string;
    link: string;
  }