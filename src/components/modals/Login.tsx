import { useState } from "react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";

export default function Login({ onClose }: { onClose: () => void }) {
  const [typeInput, setInputType] = useState("password");
  return (
    <div
      className="absolute z-10 flex items-center justify-center h-full w-full inset-0 bg-gray-500 bg-opacity-80 transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-auto flex justify-center items-center">
        <form
          //   ref={formRef} // Attach the ref to the form
          //   onSubmit={onSubmit}
          className="flex flex-col bg-white w-auto rounded-lg"
          encType="multipart/form-data"
        >
          <button
            className="text-gray-400 hover:text-gray-800 flex py-3 px-1"
            onClick={onClose}
          >
            <ChevronLeft /> Volver
          </button>
          <section className="p-4 w-auto flex flex-col gap-4">
            <div className="w-auto">
              <label
                htmlFor="email"
                className="block text-gray-700 mb-2 capitalize"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="ejemplo@unisabana.edu.co"
                className="w-auto min-w-[250px] px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="w-auto">
              <label
                htmlFor="password"
                className="block text-gray-700 mb-2 capitalize"
              >
                Password
              </label>
              <div className="flex border rounded-lg">
                <input
                  type={typeInput}
                  name="password"
                  id="password"
                  placeholder="ej: P@assWord_123"
                  className="w-full px-3 py-2"
                />
                <button
                  type="button"
                  onClick={() =>
                    setInputType((prev) =>
                      prev === "password" ? "text" : "password"
                    )
                  }
                  className="text-gray-400 hover:text-gray-800 border-l px-3"
                >
                  {typeInput === "password" ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#028747] hover:bg-[#025C31] text-white py-2 rounded-md font-semibold mt-4"
            >
              Iniciar Sesión
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
