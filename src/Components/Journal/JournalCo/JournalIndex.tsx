import React from 'react';
import APIURL from '../../../helpers/enviroment'
import { Container, Row, Col } from 'reactstrap';
import { CardGroup, Card, Button } from 'reactstrap';

type TokenTypes = {
    token: string | null | undefined,
}

type JournalGet = {
    date: string,
    howDay: string,
    improveDay: string,
    rating: string,
    journal: JournalDetails[],
    id: string,
    update: boolean,
}

type JournalDetails = {
    date: string,
    howDay: string,
    improveDay: string,
    rating: string,
    id: string,
}

class JournalIndex extends React.Component<TokenTypes, JournalGet> {

    constructor(props: TokenTypes) {
        super(props)
        this.state = {

        date: '',
        howDay: '',
        improveDay: '',
        rating: '',
        journal: [],
        id: '',
        update: false,
        }
    }

    JournalCo = () => {
        fetch(`http://localhost:3001/journal/mine`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            this.setState({
                journal: data,
                id: data.id,
            })
        })
        .catch((err) => console.log(`[Error]: ${err}`))
    }
    componentDidMount() {
        this.JournalCo();
    }

    deleteJournal = (id: any) => {
        fetch(`http://localhost:3001/journal/delete/${id}`,{
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,
            })
        })
        
        .then(() => this.JournalCo())
        }

        updateJournal = (id: any) => {
            fetch(`http://localhost:3001/journal/update/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    journal: {
                        date: this.state.date,
                        howDay: this.state.howDay,
                        improveDay: this.state.improveDay,
                        rating: this.state.rating,
                    }
                }),

                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                })

            })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    date: data.date,
                    howDay: data.howDay,
                    improveDay: data.improveDay,
                    rating: data.rating,
                })
            })
            .catch((err) => console.log(`[Error]: ${err}`))
        } 

        mapJournal = (props: any) => {

            return(

                props.journal.map((journal: JournalDetails, index: number) => {

                    return( 
                        <div>
                            <CardGroup key={index}>
                                <Card className={'card'}>
                                <h4><b>{journal.date}</b></h4>
                                <p><b><i>Happy: </i></b>{journal.howDay}</p>
                                    <p><b><i>Okay: </i></b>{journal.improveDay}</p>
                                    <p><b><i>Sad: </i></b>{journal.rating}</p>
                                    <Button className="feelingbutton" onClick={() => this.setState({update: !this.state.update})}>Update</Button>
                                    <Button className="feelingbutton" onClick={() => this.deleteJournal(journal.id)}>Delete Feeling Log</Button>  
                                    {this.state.update ? (
                                        <div>
                                        <form onSubmit={() => this.updateJournal(journal.id)}>
                                            <h2>Update Day Log</h2>
                                            <label className='feelinglabel' htmlFor='how'>Date?</label>
                                            <br/>
                                            <input className='feelinginput' type='type' id='how' value={this.state.date} onChange={(e) => this.setState({date: e.target.value})} />  
                                            <br/>
                                            <label className='feelinglabel' htmlFor='happy'>Happy?</label>
                                            <br/>
                                            <input className='feelinginput' type='type' id='happy' value={this.state.howDay} onChange={(e) => this.setState({howDay: e.target.value})} />  
                                            <br/>
                                            <label className='feelinglabel' htmlFor='okay'>Okay?</label>
                                            <br/>
                                            <input className='feelinginput' type='type' id='okay' value={this.state.improveDay} onChange={(e) => this.setState({improveDay: e.target.value})} />  
                                            <br/>
                                            <label className='feelinglabel' htmlFor='okay'>Sad?</label>
                                            <br/>
                                            <input className='feelinginput' type='type' id='sad' value={this.state.rating} onChange={(e) => this.setState({rating: e.target.value})} />  
                                            <br/>
                                            <button className="feelingbutton" type='submit'>Submit</button>
                                        </form>
                                        </div>
                                    ): null }
                                </Card>
                            </CardGroup>
                        </div>
                    )
                })
            )
        }

        render() {
            return(
                <div>
                    <h3><u>My Day Log</u></h3>
                    <this.mapJournal date={this.state.date} howDay={this.state.howDay} improveDay={this.state.improveDay} rating={this.state.rating} journal={this.state.journal} />
                </div>
        )
    }  
}

export default JournalIndex;