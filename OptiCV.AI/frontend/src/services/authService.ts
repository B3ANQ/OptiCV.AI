import axios from 'axios';

// TODO BACKEND: L'URL de l'API doit correspondre au serveur backend
// Le backend doit écouter sur le port 3000 et exposer les routes /api/auth/register et /api/auth/login
const API_URL = 'http://localhost:3000/api/auth/';

interface UserData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

// TODO BACKEND - Route POST /api/auth/register:
// 1. Vérifier que l'email n'existe pas déjà dans la BDD (table users)
// 2. Hasher le mot de passe avec bcrypt avant de le stocker
// 3. Créer un nouvel utilisateur dans la BDD avec les champs:
//    - email (unique, requis)
//    - password (hashé, requis)
//    - firstName (requis)
//    - lastName (requis)
//    - createdAt (timestamp automatique)
//    - updatedAt (timestamp automatique)
// 4. Générer un token JWT avec l'id de l'utilisateur et une durée d'expiration
// 5. Retourner un objet JSON: { token: string, user: { id, email, firstName, lastName } }
// 6. En cas d'erreur (email existant, validation échouée), retourner un code 400 avec un message d'erreur
export const register = async (userData: UserData) => {
  const response = await axios.post(`${API_URL}register`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// TODO BACKEND - Route POST /api/auth/login:
// 1. Chercher l'utilisateur dans la BDD par email
// 2. Si l'utilisateur n'existe pas, retourner une erreur 401 (Unauthorized)
// 3. Comparer le mot de passe fourni avec le hash stocké en BDD (bcrypt.compare)
// 4. Si le mot de passe ne correspond pas, retourner une erreur 401
// 5. Générer un token JWT avec l'id de l'utilisateur
// 6. Optionnel: Mettre à jour le champ lastLogin dans la BDD
// 7. Retourner un objet JSON: { token: string, user: { id, email, firstName, lastName } }
export const login = async (userData: UserData) => {
  const response = await axios.post(`${API_URL}login`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};