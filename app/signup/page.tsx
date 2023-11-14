'use client'

import { useEffect, useState } from "react"

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pwdPassStatus, setPwdPassStatus] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const [pwdPassCondition1, setPwdPassCondition1] = useState(false);
    const [pwdPassCondition2, setPwdPassCondition2] = useState(false);
    const [pwdPassCondition3, setPwdPassCondition3] = useState(false);
    const [pwdPassCondition4, setPwdPassCondition4] = useState(false);
    const signUp = () => {
        console.info(">>> email", email);
    };
    const pwdChageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        checkPwd(e.target.value);
    };
    const checkPwd = (pwd: string) => {
        setPwdPassCondition1(pwd.length >= 8);
        setPwdPassCondition2(/\d/.test(pwd));
        setPwdPassCondition3(/[^A-Za-z0-9]/.test(pwd));
        setPwdPassCondition4(pwd !== '' && (!pwd.startsWith(' ') || !pwd.endsWith(' ')));
    };
    useEffect(() => {
        setPwdPassStatus(pwdPassCondition1 && pwdPassCondition2 && pwdPassCondition3 && pwdPassCondition4);
    }, [pwdPassCondition1, pwdPassCondition2, pwdPassCondition3, pwdPassCondition4]);
    return (
        <div className="flex flex-col items-center bg-slate-50 p-10">
            <div className="max-w-lg">
                <h1 className="text-3xl font-semibold text-gray-800 mb-7">Get Started With Cloudflare</h1>
                <div className="flex flex-col ">
                    <label htmlFor="email" className="mb-2 text-gray-500">Email</label>
                    <input className="focus:ring-2 focus:ring-blue-600 focus:outline-none appearance-none w-full leading-6 text-slate-900 placeholder-slate-400 rounded py-2 pl-4 ring-1 ring-slate-400 mb-4 h-10"
                        type="email" aria-label="input your email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="flex flex-col">
                    <div className="mb-2">
                        <label htmlFor="password" className="text-gray-500">Password</label>
                        <button className="float-right text-sm text-blue-600" onClick={()=>{setShowPwd(!showPwd)}}>{showPwd? "Hide":"Show"}</button>
                    </div>
                    <input className="focus:ring-2 focus:ring-blue-600 focus:outline-none appearance-none w-full leading-6 text-slate-900 placeholder-slate-400 rounded py-2 pl-4 ring-1 ring-slate-400 mb-4 h-10" type={showPwd?"text":"password"} aria-label="input your passward" id="password" value={password} onChange={pwdChageHandler}/>
                </div>
                <div className="text-sm leading-loose">
                    {
                        pwdPassStatus?
                        <p className="text-green-800">Passward requirements met!</p>
                        :
                        <p className="text-gray-500">Create a password that contains at least:</p>
                    }
                    <ul className="text-gray-500 font-semibold">
                        <li className={pwdPassCondition1? 'text-green-800 bg-green-100': ''}>
                            <p className="ml-9">8 characters</p>
                        </li>
                        <li className={pwdPassCondition2? 'text-green-800 bg-green-100': ''}>
                            <p className="ml-9">1 number</p>
                        </li>
                        <li className={pwdPassCondition3? 'text-green-800 bg-green-100': ''}>
                            <p className="ml-9">1 special character <span className="font-normal">e.g., $, !, %, &</span></p>
                        </li>
                        <li className={pwdPassCondition4? 'text-green-800 bg-green-100': ''}>
                            <p className="ml-9">Not leading or tailing whitespace</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="text-sm text-gray-500 mt-4">
                        {"By clicking Sign Up, I agree to Cloudflare's "}
                        <span className="text-blue-600 underline underline-offset-4">terms</span>{", "}
                        <span className="text-blue-600 underline underline-offset-4">privacy policy</span>{", and "}
                        <span className="text-blue-600 underline underline-offset-4">cookie policy</span>.
                    </p>
                </div>
                <div>
                    <button className="rounded bg-blue-600 text-sm font-light text-gray-100 py-4 px-16 my-4" onClick={signUp}>
                        Sign Up
                    </button>
                </div>
                <div>
                    <p className="text-gray-800">{"Already have an account? "}
                        <a href="" className="text-blue-600 underline underline-offset-4">Log in</a>
                    </p>
                </div>
            </div>
        </div>
    )
}