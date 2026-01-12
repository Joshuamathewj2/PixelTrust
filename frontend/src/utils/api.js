const API_BASE = "https://pixeltrust-backend.onrender.com";

export async function verifyImage(imageFile, domain = "fake-news") {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("domain", domain);

  const response = await fetch(`${API_BASE}/verify`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Backend verification failed");
  }

  return response.json();
}
