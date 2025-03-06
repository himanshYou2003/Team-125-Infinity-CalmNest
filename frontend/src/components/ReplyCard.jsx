//src/components/ReplyCard.jsx
export default function ReplyCard({ reply }) {
    return (
      <div className="card bg-gray-50">
        <p className="text-gray-600 mb-4">{reply.content}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{new Date(reply.createdAt).toLocaleDateString()}</span>
          <span>Anonymous ID: {reply.anonymousId}</span>
        </div>
      </div>
    )
  }