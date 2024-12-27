
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase.init';
import axios from 'axios';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState('light');


    const createUser = async (email, password, displayName = '', photoURL = '') => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const createdUser = userCredential.user;
    
            // Update the profile with display name and photo URL
            if (displayName || photoURL) {
                await updateProfile(createdUser, { displayName, photoURL });
            }
    
            // Manually set the user to ensure immediate state update
            setUser({
                ...createdUser,
                displayName,
                photoURL,
            });
    
            // Show toast alert for successful registration
            toast.success('Registration successful! Welcome to Kawan.');
    
            setLoading(false);
            return createdUser;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };
    
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user); // Ensure user state is updated immediately
    
                // Show toast alert for successful login
                toast.success('Login successful! Welcome back to Kawan.');
    
                setLoading(false);
                return userCredential.user;
            })
            .catch((error) => {
                setLoading(false);
                throw error;
            });
    };
    
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then((result) => {
                setUser(result.user); // Update user state for Google login
    
                // Show toast alert for successful Google login
                toast.success('Google login successful! Welcome to Kawan.');
    
                setLoading(false);
                return result.user;
            })
            .catch((error) => {
                setLoading(false);
                throw error;
            });
    };
    

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth).then(() => {
            setUser(null);
            setLoading(false);
        });
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log('Current User:', currentUser);
            setUser(currentUser);

            if (currentUser?.email) {
                const user = { email: currentUser.email };

                axios.post('https://a10-server-seven.vercel.app/jwt', user, { withCredentials: true })
                    .then(res => {
                   //     console.log("Login", res.data);
                        setLoading(false);
                    })
            }
            else {
                axios.post('https://a10-server-seven.vercel.app/logout', {}, {
                    withCredentials: true
                })
                    .then(res => {
                   //     console.log('Logout', res.data);
                        setLoading(false);
                    })
            }
        });

        return () => {
            unSubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        theme,
        setTheme,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
