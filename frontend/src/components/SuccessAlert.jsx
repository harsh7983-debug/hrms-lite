export default function SuccessAlert({ message }) {
  if (!message) return null;

  return (
    <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
      {message}
    </div>
  );
}