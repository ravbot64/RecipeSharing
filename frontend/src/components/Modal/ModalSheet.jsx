import { Modal, Button } from "@mantine/core";

function ModalSheet({ recipeData, opened, onClose }) { 
  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Authentication">
        <div className="container mx-auto p-6 mt-10">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-w-1 aspect-h-1 p-4">
              <img
                src={recipeData.dish}
                alt={recipeData.title}
                className="w-1/2 h-auto mb-4 max-w-sm object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold text-teal-600 mb-2">
              {recipeData.title}
            </h1>
            <p className="text-gray-600 mb-4">By: {recipeData.username}</p>

            <h2 className="text-2xl font-semibold text-teal-600 mb-3">
              Ingredients
            </h2>
            <ul className="list-disc ml-6 mb-6">
              {recipeData.ingredients.split("\r\n").map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient}
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold text-teal-600 mb-3">Steps</h2>
            <ol className="list-decimal ml-6 mb-6">
              {recipeData.instruction.split("\r\n").map((step, index) => (
                <li key={index} className="text-gray-700">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalSheet;
