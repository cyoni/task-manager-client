export default function convertTagResponse(response) {
  return response.map((tag) => ({
    label: tag.Name,
    value: tag.id,
  }));
}
