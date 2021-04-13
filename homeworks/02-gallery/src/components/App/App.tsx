import React from 'react';
import style from './App.module.css';
import { Gallery } from '../Gallery/Gallery';
import { Image } from '../../model/Image';
import { findImages } from '../../model/api';


interface IState {
  images: Image[];
  loading: boolean;
}

class App extends React.Component<{}, IState> {
  state = {
    loading: true,
    images: []
  }

  async componentDidMount() {
    await this.search('');
  }

  render() {
    const { images } = this.state;
    return (
      <div className={style.app}>
        <form className={style.app__searchForm} onSubmit={this.onSubmit}>
          <input type="text" name="query" className={style.app__queryField}/>
          <button type="submit" className={style.app__searchButton}>Search</button>
        </form>
        <Gallery images={images}/>
      </div>
    );
  }

  onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target);
      const query = formData.get('query');
      if (typeof query === 'string') {
        await this.search(query)
      } else {
        throw new Error('query input not found')
      }
    }
  }

  private async search(query: string) {
    this.setState({
      loading: true
    });
    const images = await findImages(query)
    this.setState({
      loading: false,
      images
    })
  }
}

export default App;
