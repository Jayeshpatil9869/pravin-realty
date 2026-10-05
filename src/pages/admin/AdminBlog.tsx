import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BlogPost } from '../../types';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  X, 
  Clock, 
  Calendar,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SingleImageUpload } from '../../components/admin/ImageUpload';

const EMPTY_POST: Omit<BlogPost, 'id'> = {
  slug: '',
  title: '',
  excerpt: '',
  date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
  readTime: '4 min read',
  category: 'Market Trends',
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  author: {
    name: 'Pravin K.',
    role: 'Principal Advisor & Founder',
    avatar: '/leader-pravin.jpg'
  },
  content: [
    'Pune real estate continues to be one of India’s most resilient and investor-friendly property markets.',
    'With major infrastructure developments underway including Metro Line 3 and Ring Road corridor expansions, West Pune stands out as a prime destination for residential and commercial capital appreciation.'
  ]
};

export function AdminBlog() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<BlogPost, 'id'>>(EMPTY_POST);
  const [paragraphInput, setParagraphInput] = useState('');

  const categories = ['All', 'Market Trends', 'Buyer Guide', 'Commercial', 'Legal & RERA'];

  const filteredPosts = blogPosts.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingPostId(null);
    setFormData({ ...EMPTY_POST });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPostId(post.id);
    setFormData({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      category: post.category,
      image: post.image,
      author: { ...post.author },
      content: [...post.content]
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    if (editingPostId) {
      updateBlogPost(editingPostId, formData);
    } else {
      addBlogPost(formData);
    }
    setIsModalOpen(false);
  };

  const handleAddParagraph = () => {
    if (paragraphInput.trim()) {
      setFormData({
        ...formData,
        content: [...formData.content, paragraphInput.trim()]
      });
      setParagraphInput('');
    }
  };

  const handleRemoveParagraph = (index: number) => {
    setFormData({
      ...formData,
      content: formData.content.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#121316]">
            Market Insights & Blog
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mt-0.5">
            Publish expert guides, West Pune market trends, and MahaRERA advisory reports.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#121316] text-white hover:bg-neutral-800 text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs sm:text-sm px-4 py-2 rounded-full whitespace-nowrap transition-colors cursor-pointer font-medium ${
                selectedCategory === cat
                  ? 'bg-[#121316] text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl pl-10 pr-4 py-2 text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#C86D2F]"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div 
            key={post.id}
            className="bg-white rounded-3xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Cover Image */}
              <div className="relative aspect-16/10 overflow-hidden bg-neutral-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-3.5 left-3.5 bg-[#121316]/90 text-[#FDE8D7] text-xs uppercase font-mono px-3 py-1 rounded-full backdrop-blur-xs font-semibold">
                  {post.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span className="flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5" /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>

                <h3 className="font-medium text-neutral-900 text-base sm:text-lg line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="pt-2 flex items-center gap-2.5 text-xs sm:text-sm text-neutral-700">
                  <div className="w-6 h-6 rounded-full bg-[#FDE8D7] text-[#121316] flex items-center justify-center font-bold text-[10px]">
                    {post.author.name.charAt(0)}
                  </div>
                  <span>By <strong className="font-medium text-neutral-900">{post.author.name}</strong></span>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
              <Link
                to="/blog"
                target="_blank"
                className="text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 font-medium flex items-center gap-1.5"
              >
                <span>Live View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(post)}
                  className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  title="Edit post"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete "${post.title}"?`)) {
                      deleteBlogPost(post.id);
                    }
                  }}
                  className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-neutral-200 my-auto max-h-[90vh] flex flex-col text-left overflow-hidden">
            
            <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FDE8D7] text-[#121316] flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h2 className="text-base font-semibold text-neutral-900">
                  {editingPostId ? 'Edit Article' : 'Write Article'}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
              
              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-700">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Renting vs. Buying a Home in Pune"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-700">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                  >
                    <option value="Market Trends">Market Trends</option>
                    <option value="Buyer Guide">Buyer Guide</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Legal & RERA">Legal & RERA</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-700">Publication Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. April 06, 2025"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-700">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-700">Short Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="A short punchy summary for the preview card..."
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                />
              </div>

              <SingleImageUpload
                label="Article Cover Photo *"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                aspectRatio="video"
                helperText="Drop blog cover image here or browse (PNG, JPG, WebP)"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-700">Author Name</label>
                  <input
                    type="text"
                    value={formData.author.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      author: { ...formData.author, name: e.target.value }
                    })}
                    placeholder="Pravin K."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-700">Author Role</label>
                  <input
                    type="text"
                    value={formData.author.role}
                    onChange={(e) => setFormData({
                      ...formData,
                      author: { ...formData.author, role: e.target.value }
                    })}
                    placeholder="Principal Advisor & Founder"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                  />
                </div>
              </div>

              {/* Paragraphs */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <label className="block text-xs font-medium text-neutral-700">
                  Paragraphs ({formData.content.length})
                </label>

                <div className="flex gap-2">
                  <textarea
                    rows={2}
                    value={paragraphInput}
                    onChange={(e) => setParagraphInput(e.target.value)}
                    placeholder="Type a paragraph..."
                    className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C86D2F]"
                  />
                  <button
                    type="button"
                    onClick={handleAddParagraph}
                    className="bg-neutral-800 text-white px-3.5 py-2 rounded-xl text-xs hover:bg-neutral-900 cursor-pointer self-end"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 pt-1">
                  {formData.content.map((p, idx) => (
                    <div key={idx} className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-700 flex items-start justify-between gap-2.5">
                      <p className="flex-1 leading-relaxed">{p}</p>
                      <button
                        type="button"
                        onClick={() => handleRemoveParagraph(idx)}
                        className="text-neutral-400 hover:text-red-500 shrink-0 mt-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-2.5 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-medium bg-[#121316] text-white hover:bg-neutral-800 cursor-pointer shadow-xs"
                >
                  {editingPostId ? 'Update Article' : 'Publish Article'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
