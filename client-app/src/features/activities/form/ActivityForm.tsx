import {Segment, Form, Button} from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';
import { ChangeEvent, useState } from 'react';

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({activity:selectedActivity, closeForm, createOrEdit}: Props){

    const initialState =  selectedActivity ?? {
        id:'',
        title:'',
        category:'',
        description:'',
        date: '',
        city:'',
        venue:''
    }
    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        createOrEdit(activity);
        
    }

    function handleInputChane(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder="Title" value={activity.title} name='title' onChange={handleInputChane}/>
                <Form.TextArea placeholder="Description" value={activity.description} name='description' onChange={handleInputChane}/>
                <Form.Input placeholder="Category" value={activity.category} name='category' onChange={handleInputChane}/>
                <Form.Input placeholder="Date" value={activity.date} name='date' onChange={handleInputChane}/>
                <Form.Input placeholder="City" value={activity.city} name='city' onChange={handleInputChane}/>
                <Form.Input placeholder="Venue" value={activity.venue} name='venue' onChange={handleInputChane}/>
                <Button floated='right' positive type='submit' content='submit'/>
                <Button onClick={closeForm} floated='right'  type='submit' content='cancel'/>
            </Form>
        </Segment>
    )
}