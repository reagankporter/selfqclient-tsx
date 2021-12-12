import React from 'react';
import Feelings from '../Feeling/Feeling';
import Journals from '../Journal/Journal'
import Quote from '../Quote/Quote'
import { Route, Link, Routes } from 'react-router-dom';


type TokenTypes = {
    token: string | undefined | null,
}

class Sidebar extends React.Component<TokenTypes, {}> {

    constructor(props: TokenTypes) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
        <div>
            <div>
                <ul>
                <li><Link to='/quote'>Quote Generator</Link></li>
                    <li><Link to='/feelings'>Feeling Log</Link></li>
                    <li><Link to='/journals'>Day Log</Link></li>
                </ul>
            </div>
            <div>
                <Routes>
                    <Route path='/quote' element={<Quote />} />
                    <Route path='/feelings' element={<Feelings token={this.props.token} />} />
                    <Route path='/journals' element={<Journals token={this.props.token} />} />
                </Routes>
        </div>
        </div>
        )
    }

}

export default Sidebar;