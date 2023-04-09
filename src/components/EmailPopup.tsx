"use-client";
import { useState } from "react";

function EmailPopup({ emailPopupOpen, setEmailPopupOpen, setEmailGiven }: any) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function saveEmail() {
    setLoading(true);
    try {
      const response = await fetch("/api/userEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();
      if (response.status !== 200 || data.error) {
        throw (
          data.error.message ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setEmailGiven(true);
      setEmailPopupOpen(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Consider implementing your own error handling logic here
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <div>
      {/* Modal */}
      {emailPopupOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-secondary rounded-lg border-4 border-white">
              <div className="p-6">
                <h2 className="text-xl font-medium mb-4 text-tertiary">
                  Sorry
                </h2>
                <p className="text-gray-600 mb-4">
                  You have used Your free trial. Please enter your{" "}
                  <span className="text-accent">e-mail</span> to continue.
                </p>
                <input
                  placeholder="e-mail"
                  id="email-input"
                  type="email"
                  className="text-gray-600 px-2 py-1 w-full rounded-xl border-2"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <button
                  onClick={saveEmail}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>{" "}
                {loading && <p>Sending...</p>}
                {
                  //FIXME: change this to x button
                }
                <button
                  onClick={(e) => setEmailPopupOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailPopup;
