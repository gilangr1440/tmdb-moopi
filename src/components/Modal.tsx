import { Component } from "react";

interface ModalProps {
  showModal: () => void;
  image: string;
  title: string;
  release: string;
  desc: string;
}

export class Modal extends Component<ModalProps> {
  render() {
    const { showModal, image, title, release, desc } = this.props;

    return (
      <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-1/2 bg-white p-6 rounded-lg">
          <div className="flex gap-8">
            <img className="w-1/2" src={image} alt="image" />
            <div>
              <ul>
                <li className="mb-2">Title: {title}</li>
                <li className="mb-2">Release Date: {release}</li>
                <li className="mb-2">Description: {desc}</li>
              </ul>
            </div>
          </div>
          <button className="mt-4 h-10 float-end bg-blue-500 hover:bg-blue-600 text-white text-center font-bold p-2 rounded" onClick={showModal}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;
