import { store } from '../../store';
import { deselectDirection } from '../../store/reducers/userReducer';

function DirectionItem({ direction, index }) {
  function deselectDirectionHandler() {
    store.dispatch(deselectDirection({ directionId: direction.id }));
  }

  return (
    <div className="h-full my-1 min-w-full">
      <div className="px-6 py-5">
        <div className="flex flex-wrap">
          <div className="flex-grow">
            <div className="w-full sm:flex justify-between items-center mb-3">
              <h2 className="text-2xl leading-snug truncate mb-1 sm:mb-0">
                {index + 1}. {direction.name}
              </h2>
            </div>
            <div className="flex items-center whitespace-normal">
              <div className="max-w-md">
                <p>{direction.vuz.name}</p>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={deselectDirectionHandler}
              className="inline-flex items-center p-2  text-red-400 hover:text-red-700 text-sm font-medium rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectionItem;
