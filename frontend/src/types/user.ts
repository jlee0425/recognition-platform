export interface User {
  id: number;
  profile: {
    firstname: string;
    lastname: string;
    department: string;
    location: string;
    description: string;
  }
}

export interface MeInfo extends User {
  manager: User;
}