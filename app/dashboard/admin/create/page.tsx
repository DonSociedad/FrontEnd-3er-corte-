'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export default function AdminCreatePage() {
  const [type, setType] = useState<'content' | 'quiz' | 'exercise' | ''>('');
  const [formData, setFormData] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const renderFields = () => {
    switch (type) {
      case 'content':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                name="title"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Enter content title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                rows={3}
                placeholder="Brief description..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-pink-400"
                >
                  <option value="">Select type</option>
                  <option value="article">Article</option>
                  <option value="infographic">Infographic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Topic</label>
                <input
                  name="topic"
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="e.g. savings, investment..."
                />
              </div>
            </div>
          </>
        );

      case 'quiz':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">contenido asociado</label>
              <input
                name="content_id"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="ObjectId of related content"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Max Points</label>
              <input
                type="number"
                name="max_points"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <p className="text-gray-500 text-sm mt-2">
               Questions can be added later in the “Quizzes” section.
            </p>
          </>
        );

      case 'exercise':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Associated Content ID</label>
              <input
                name="content_id"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="ObjectId of related content"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                name="type"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-pink-400"
              >
                <option value="">Select type</option>
                <option value="simulation">Simulation</option>
                <option value="case_study">Case Study</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Instructions</label>
              <textarea
                name="instructions"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-pink-400"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Points</label>
              <input
                type="number"
                name="points"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </>
        );

      default:
        return <p className="text-gray-500">Select a type to begin creating.</p>;
    }
  };

  return (
<div className="p-8 bg-white rounded-2xl shadow-md max-w-4xl mx-auto mt-8">
  <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
    <PlusCircle className="text-pink-500" /> Create New Item
  </h1>

  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700">Select Type</label>
    <select
      onChange={(e) => setType(e.target.value as any)}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-pink-400"
    >
      <option value="">Choose an option</option>
      <option value="content">Content</option>
      <option value="quiz">Quiz</option>
      <option value="exercise">Exercise</option>
    </select>
  </div>

  <form className="space-y-4">{renderFields()}</form>

  {type && (
    <button
      className="mt-6 w-full bg-pink-500 hover:bg-pink-400 text-white font-semibold py-2 rounded-lg transition"
      onClick={() => alert(JSON.stringify(formData, null, 2))}
    >
      Save {type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  )}
</div>
  );
}
