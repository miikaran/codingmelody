import React from 'react';
import { Link } from 'react-router-dom'

export default function Footer() {

    return(
        <footer>
            <div className="flex justify-center py-8">
                <ul className="space-y-2">
                    <li className="text-center underline text-white text-xs font-bold space-x-3">
                        <Link to="/Login">
                            LOG IN
                        </Link>
                        <Link to="/Signup">
                            SIGNUP
                        </Link>
                        <a href="https://github.com/miikaran/codingmelody">SOURCE</a>
                        <a href="https://drive.google.com/file/d/1GA1O1sjhS6nhi8gIHElrsT7x4ejdmoUT/view?usp=sharing" target="_blank" >DEMO</a>
                    </li>
                    <div className="text-white text-center">
                        2022 @<Link to="/" className="underline">CodingMelody</Link>
                    </div>
                </ul>
            </div>
        </footer>
    )
}