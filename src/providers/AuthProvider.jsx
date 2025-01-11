import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase.init';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState('light');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const createUser = async (email, password, displayName = '', photoURL = '') => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const createdUser = userCredential.user;

            // send verification email
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    toast.success('Verification email sent.')
                })

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
                const loggedInUser = userCredential.user;

                if (loggedInUser.emailVerified) {
                    setUser(loggedInUser);

                    // for get user id in db
                    try {
                        fetch("https://kawan.onrender.com/api/v1/user", {
                            method: "GET",
                        })
                            .then(response => response.json())
                            .then(data => {
                                setUserId(data.find(userData => userData.email === email)._id);
                            })
                            .catch(error => {
                                console.error("Error: ", error);
                            });
                    } catch (error) {
                        console.error("Error: ", error);
                    }

                    toast.success('Login successful! Welcome back to Kawan.');
                } else {
                    signOutUser();
                    throw new Error('Please verify your email before logging in.');
                }
                setLoading(false);
                return loggedInUser;
            })
            .catch((error) => {
                setLoading(false);
                if (error.message === 'Please verify your email before logging in.') {
                    toast.error(error.message);
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                        })
                }
                else {
                    toast.error('Email and Password does not match.');
                }
                throw error;
            });
    };


    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then((result) => {
                setUser(result.user);
                console.log("SETUSER", result.user);

                // Show toast alert for successful Google login
                toast.success('Google login successful! Welcome to Kawan.');

                setLoading(false);

                // send user data to db
                try {
                    fetch("https://kawan.onrender.com/api/v1/user/create-user", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: result.user.displayName,
                            email: result.user.email,
                            password: "GOOGLE-LOGIN",
                        }),
                    });
                } catch (error) {
                    console.error("Error submitting data:", error);
                }


                // for get user id in db
                try {
                    fetch("https://kawan.onrender.com/api/v1/user", {
                        method: "GET",
                    })
                        .then(response => response.json())
                        .then(data => {
                            // console.log("EIJEEEEE",data);
                            setUserId(data.find(userData => userData.email === result.user.email)._id);
                        })
                        .catch(error => {
                            console.error("Error: ", error);
                        });
                } catch (error) {
                    console.error("Error: ", error);
                }

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
            setUserId(null);
            setLoading(false);
        });
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
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
        isSidebarOpen,
        setIsSidebarOpen,
        userId,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
