import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Testimonial } from '../../types';
import { 
  MessageSquareQuote, 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  X, 
  MapPin
} from 'lucide-react';
import { SingleImageUpload } from '../../components/admin/ImageUpload';

const EMPTY_TESTIMONIAL: Omit<Testimonial, 'id'> = {
  quote: '"Pravin Realty delivered an outstanding property advisory experience. Their negotiation skills and legal verification gave us complete peace of mind."',
  author: '',
  role: 'Homebuyer & IT Professional',
  location: 'Baner, Pune',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  rating: 5
};

export function AdminTestimonials() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Testimonial, 'id'>>(EMPTY_TESTIMONIAL);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ ...EMPTY_TESTIMONIAL });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Testimonial) => {
    setEditingId(item.id);
    setFormData({
      quote: item.quote,
      author: item.author,
      role: item.role,
      location: item.location,
      avatar: item.avatar,
      rating: item.rating
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author || !formData.quote) return;

    if (editingId) {
      updateTestimonial(editingId, formData);
    } else {
      addTestimonial(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 text-left">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#121316]">
            Client Testimonials
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mt-0.5">
            Manage the client reviews, ratings, and testimonials shown across the website.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#121316] text-white hover:bg-neutral-800 text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < item.rating ? 'fill-amber-400 text-amber-500' : 'text-neutral-200'
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed italic">
                {item.quote}
              </p>

              <div className="flex items-center gap-3.5 pt-3 border-t border-neutral-100">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover border border-neutral-200 shadow-2xs shrink-0"
                />
                <div>
                  <h4 className="font-medium text-neutral-900 text-sm sm:text-base">
                    {item.author}
                  </h4>
                  <p className="text-xs text-neutral-500">{item.role}</p>
                  <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-1.5">
              <button
                onClick={() => handleOpenEdit(item)}
                className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                title="Edit review"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete review from "${item.author}"?`)) {
                    deleteTestimonial(item.id);
                  }
                }}
                className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                title="Delete review"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-neutral-200 my-auto max-h-[90vh] flex flex-col text-left overflow-hidden">
            
            <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FDE8D7] text-[#121316] flex items-center justify-center">
                  <MessageSquareQuote className="w-4 h-4" />
                </div>
                <h2 className="text-base sm:text-lg font-medium text-neutral-900">
                  {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
              
              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-700">Client Name *</label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="e.g. Siddhart Jain"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-700">Client Role / Profession</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Startup Founder & Tech Director"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-700">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Balewadi, Pune"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-700">Star Rating (1 - 5)</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                </select>
              </div>

              <SingleImageUpload
                label="Client Avatar / Photo"
                value={formData.avatar}
                onChange={(url) => setFormData({ ...formData, avatar: url })}
                aspectRatio="square"
                helperText="Drop client avatar or photo here"
              />

              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-700">Review / Quote *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="Paste the testimonial quote from the client..."
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                />
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-medium bg-[#121316] text-white hover:bg-neutral-800 cursor-pointer shadow-sm"
                >
                  {editingId ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
