import { useState } from "react";
import { verifyImage } from "../utils/api";

export default function Verify() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!file) return alert("Select an image first");

    setLoading(true);
    try {
      const res = await verifyImage(file);
      setResult(res);
    } catch (err) {
      alert("Verification failed");
    }
    setLoading(false);
  }

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Verifying..." : "Verify Image"}
      </button>

      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
