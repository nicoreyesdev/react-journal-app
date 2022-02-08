import React from 'react'
import moment from 'moment';
import { useDispatch} from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id, date, title, body, url}) => {
    
    const noteDate = moment(date);

    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch(activeNote(id, {
            date, title, body, url
        }))
    }
    
    return (
        <div className='journal__entry pointer animate__animated animate__fadeInLeft' onClick={handleEntryClick}>
            {
                url &&
                <div 
                className='journal__entry-picture'
                style={{
                backgroundSize:'cover',
                backgroundImage: `url(${url})`
                }}
                ></div>
            }
            <div className='journal__entry-body'>
            
                <p className='journal__entry-title'>
                {title}
                </p>               
                <p className='journal__entry-content'>
                {body}
                </p>

            </div>
            <div className='journal__entry-date-box'>
                <h5>{noteDate.format('Do')},</h5>
                <h4>{noteDate.format('MMM')}</h4>
                <span>{noteDate.format('dddd')}</span>
                
            </div>
        </div>
    )
}
