/**
 * In-Memory Host Authentication & User Store
 */

class AuthStore {
  constructor() {
    this.users = new Map();
    // Default admin/host account for instant testing
    this.users.set('host@quiz.com', {
      id: 'usr-default-host',
      email: 'host@quiz.com',
      password: 'password123',
      name: 'Master Quizmaster'
    });
  }

  register(email, password, name) {
    const cleanEmail = email.trim().toLowerCase();
    if (this.users.has(cleanEmail)) {
      throw new Error('User already exists');
    }
    const user = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      password,
      name: name || cleanEmail.split('@')[0]
    };
    this.users.set(cleanEmail, user);
    return { id: user.id, email: user.email, name: user.name };
  }

  login(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    const user = this.users.get(cleanEmail);
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    return { id: user.id, email: user.email, name: user.name };
  }
}

export const authStore = new AuthStore();
