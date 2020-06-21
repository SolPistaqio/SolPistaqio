import React from 'react';
//import Mailchimp from 'react-mailchimp-form';
import Mailchimp from './Mailchimp'

class Dogs extends React.Component {
    
    render() {
        const pet = this.props.pet;
      return (
          <Mailchimp
          end = {this.props.end}
          pet = {pet}
          action='https://rocks.us15.list-manage.com/subscribe/post?u=645c4a5124c0e6aae7ac2b2f6&amp;id=f78bc0d515'
          fields={[
            {
              name: 'EMAIL',
              placeholder: 'Email',
              type: 'email',
              required: true
            },
            {
                name: 'FNAME',
                placeholder: 'Name',
                type: 'text',
                required: true
              },
            /*{
                name: 'PET',
                placeholder: 'Pet',
                type: 'text',
                required: true
            }*/
              ]}
              messages = {
                {
                  button: 'Let '+pet+'s know!',
                  success: 'Check your email (possibly spam) for important message from '+pet+'s'
                }}
          />
      );
    }
  }


export default Dogs;