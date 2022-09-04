import Avatar from "react-avatar";
import { FaTrash } from "react-icons/fa";

function DirectionItem({ direction }) {
  return (
    <div className="h-full my-1 min-w-full">
      <div className="px-6 py-5">
        <div className="flex flex-wrap">
          <div className="flex-grow">
            <div className="w-full sm:flex justify-between items-center mb-3">
              <h2 className="text-2xl leading-snug truncate mb-1 sm:mb-0">
                {direction.name}
              </h2>
            </div>
            <div className="flex items-center whitespace-normal">
              <Avatar
                googleId="118096717852922241760"
                className="mr-1"
                size={36}
              />
              <div className="max-w-md">
                <p>{direction.vuz.name}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center text-red-500">
            <FaTrash />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectionItem;
