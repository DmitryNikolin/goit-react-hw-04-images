export async function fetchImages(name, page) {
  const response = await fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=30807376-0b6c24285cff505c2f1e15934&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.ok) {
    return response.json();
  }
}