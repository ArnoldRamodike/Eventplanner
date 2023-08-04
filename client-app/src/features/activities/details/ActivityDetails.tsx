import React from 'react';
import { Activity } from '../../../app/models/activity';
import { Card, Image, Button } from 'semantic-ui-react';

interface Props {
    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
}

export default function ActivityDetails ({activity, cancelSelectActivity,
    openForm}: Props) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
            <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
                <span>{activity.date}</span>
            </Card.Meta>
            <Card.Description>
               {activity.description}
            </Card.Description>
            </Card.Content>

            <Card.Content extra>
                <Button.Group width='2'>
                    <Button onClick={() => openForm(activity.id)}  basic color='blue' content='edit'/>
                    <Button onClick={cancelSelectActivity} basic color='grey' content='cancel'/>
                </Button.Group>
                    
                
            </Card.Content>
            
        </Card>

  )
}
