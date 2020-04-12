import React, { Component } from 'react';
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext';
import config from '../config';
import './AddFolder.css'

class AddFolder extends Component {
  static defaultProps = {
      history: {
          push: () => {},
      }
  }
  static contextType=ApiContext;

  handleSubmit = (e) => {
      e.preventDefault();
      const folder = {
          title: e.target['folder-name'].value,
      }
      fetch(`${config.API_ENDPOINT}/folder`, {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
          },
          body:JSON.stringify(folder),
      })
      .then((res)=>{
          if(!res.ok) return res.json().then((e) => Promise.reject(e))
          return res.json();
      })
      .then((folder) => {
          this.context.addFolder(folder);
          this.props.history.push(`/folder/${folder.id}`)
      })
      
      .catch(
                  (error)=>{
              console.error({error})
          })
      
  };
  
  render() {
    
    return (
        <section className='AddFolder'>
            <h2>Add folder</h2>
      <NotefulForm onSubmit={this.handleSubmit}>
        
            <label htmlFor='folder-name'>Folder Name</label>
        <input
          required type="text"
          name="folder-name"
          id="folder-name"
          
        />

    <div className='button'>
        <button type='submit'>Add Folder</button>
    </div>
        
        </NotefulForm>
      </section>
    );
  }
}

export default AddFolder;
