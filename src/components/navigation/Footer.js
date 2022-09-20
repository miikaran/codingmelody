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
                        <a href="https://github.com/miikaran/codingmelody">DEMO</a>
                    </li>
                    <div className="text-white text-center">
                        2022 @CodingMelody
                    </div>
                </ul>
            </div>
        </footer>
    )
}