export interface User {
  id: number;
  profilePicture: string;
  profile: {
    firstname: string;
    lastname: string;
    department: string;
    location: string;
    description: string;
  }
}