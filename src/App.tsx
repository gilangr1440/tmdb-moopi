import { Component } from "react";
import Cards from "./components/Cards";
import Layout from "./components/Layout";
import Modal from "./components/Modal";

import data from "./dummy/movie.json";
import Swipper from "./components/Swipper";

interface AppState {
  visibility: boolean;
  id_movie: string;
}

class App extends Component<AppState> {
  state = {
    visibility: false,
    id_movie: "",
  };

  handlePopup(id?: string) {
    const { visibility } = this.state;
    this.setState({ id_movie: id });
    this.setState({ visibility: !visibility });
  }

  render() {
    const { visibility, id_movie } = this.state;
    return (
      <div>
        <Layout>
          <div className="h-72">
            <Swipper />
          </div>
          <div className="my-14">
            <h1 className="text-3xl font-bold text-center mb-6">Now Playing Movies</h1>
            <div className="w-3/4 mx-auto flex gap-8 gap-y-12 justify-between flex-wrap">
              {data &&
                data.map((item: any, index: number) => {
                  return <Cards key={index} image={item.Poster} title={item.Title} release={item.Released} detail={() => this.handlePopup(item.imdbID)} />;
                })}
            </div>
            {visibility ? (
              data &&
              data.map((item: any, index: number) => {
                if (item.imdbID == id_movie) {
                  return <Modal image={item.Poster} title={item.Title} release={item.Released} desc={item.Plot} showModal={() => this.handlePopup()} />;
                }
              })
            ) : (
              <></>
            )}
          </div>
        </Layout>
      </div>
    );
  }
}

export default App;
