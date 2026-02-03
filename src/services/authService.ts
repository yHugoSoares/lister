import { toast } from "sonner";

const USERS_KEY = "lister_mock_users";

export const authService = {
  signUp: (email: string, password: string, role: string) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    
    if (users.find((u: any) => u.email === email)) {
      throw new Error("User already exists");
    }

    const newUser = { email, password, role, id: Math.random().toString(36).substr(2, 9) };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
  },

  signIn: (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error("Invalid email or password");
    }

    return user;
  }
};