import {Segment, Form, Button} from 'semantic-ui-react'
import { ChangeEvent, useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams} from 'react-router-dom'
import { Activity } from '../../../app/models/activity';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import {v4 as uuid} from 'uuid';

export default observer( function ActivityForm(){

    const {activityStore} = useStore();
    const { createActivity, updateActivity, loading,
        loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] =  useState<Activity>({
        id:'',
        title:'',
        category:'',
        description:'',
        date: '',
        city:'',
        venue:''
    });

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!));
    },[id, loadActivity]);

    function handleSubmit() {
        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }else{
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }

    function handleInputChane(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    if (loadingInitial) return <LoadingComponent content='Loading activities ...' />

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder="Title" value={activity.title} name='title' onChange={handleInputChane}/>
                <Form.TextArea placeholder="Description" value={activity.description} name='description' onChange={handleInputChane}/>
                <Form.Input placeholder="Category" value={activity.category} name='category' onChange={handleInputChane}/>
                <Form.Input placeholder="Date" value={activity.date} name='date' onChange={handleInputChane}/>
                <Form.Input placeholder="City" value={activity.city} name='city' onChange={handleInputChane}/>
                <Form.Input placeholder="Venue" value={activity.venue} name='venue' onChange={handleInputChane}/>
                <Button loading={loading} floated='right' positive type='submit' content='submit'/>
                <Button as={Link} to='/activities'  floated='right'  type='submit' content='cancel'/>
            </Form>
        </Segment>
    )
})