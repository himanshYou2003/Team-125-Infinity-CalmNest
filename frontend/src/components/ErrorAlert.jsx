
//src/components/ErrorAlert.jsx
export default function ErrorAlert({ message }) {
  return (
    <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4">
      <span className="block sm:inline">{message}</span>
    </div>
  )
}