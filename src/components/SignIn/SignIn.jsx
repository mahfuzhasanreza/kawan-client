import React from 'react';
import signinBg from '../../assets/signin-bg.png';
import logo from '../../assets/kawanLogoMsg.png';
import { Link } from 'react-router-dom';


const SignIn = () => {
    return (
        <div style={{ backgroundImage: `url(${signinBg})` }} className="bg-cover bg-center p-16">
            <div className='mx-auto w-[1276px] h-[867px] border border-gray-400 bg-[#fff2f210]'>

                <div className="hero h-full">
                    <div className="hero-content flex-col lg:flex-row lg:justify-between border border-red-400 w-full p-8">
                        {/* description */}
                        <div className="text-white border border-red-500 text-center lg:text-left space-y-5">
                            <img src={logo} className='mx-auto bg-transparent' alt="" />
                            <h3 className='text-6xl italiana-font'>Start Your Journey</h3>
                            <p className='text-center text-2xl'>Already have an account?  <span className='underline font-bold text-[#FD7600]'><Link to={'/signin'}>Log in</Link></span></p>
                            <p className='allison-font text-center text-4xl font-light text-gray-200'>Move towards <br />
                                Light....</p>
                        </div>
                        {/* form */}
                        <div className="border border-blue-400 card w-full max-w-sm shrink-0 ">
                            <form className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" className="input input-bordered" required />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>



    );
};

export default SignIn;