import React, { useState, FormEvent, useContext } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';

interface IProps {
    activity: IActivity | undefined | null;
}

const ActivityForm: React.FC<IProps> = ({ activity: initialFormState }) => {
    const activityStore = useContext(ActivityStore)
    const { createActivity, editActivity, submitting, cancelFormOpen } = activityStore

    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    };

    const [activity, setActivity] = useState<IActivity>(initializeForm);

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    }
    const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name='title' placeholder="title" value={activity.title} />
                <Form.TextArea onChange={handleInputChange} name='description' rows={2} placeholder="description" value={activity.description} />
                <Form.Input onChange={handleInputChange} name='category' placeholder="category" value={activity.category} />
                <Form.Input onChange={handleInputChange} name='date' type='datetime-local' placeholder="date" value={activity.date} />
                <Form.Input onChange={handleInputChange} name='city' placeholder="city" value={activity.city} />
                <Form.Input onChange={handleInputChange} name='venue' placeholder="venue" value={activity.venue} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={cancelFormOpen} floated='right' positive type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)
