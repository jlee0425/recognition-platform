export interface User {
  id: number;
  username: {
    firstName: string;
    lastName: string;
  }
  profilePicture: string;
  department: string;
  location: string;
  description: string;
}