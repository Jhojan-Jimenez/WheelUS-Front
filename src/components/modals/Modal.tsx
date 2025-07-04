import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  fullScreen?: boolean;
  height?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  height = '90vh',
  fullScreen = false,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {ReactDOM.createPortal(
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ${fullScreen ? 'p-0' : 'p-4'}`}
        >
          <div
            className={`bg-white ${fullScreen ? 'w-full h-full' : 'rounded-lg shadow-xl max-w-2xl w-full h-fit'} overflow-y-auto`}
            style={{ height }}
          >
            <div className="p-4 h-full">
              <button
                onClick={onClose}
                className="float-right text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {children}
            </div>
          </div>
        </div>,

        document.body
      )}
    </>
  );
};

export default Modal;
